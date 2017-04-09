package dragode.auction.service.Impl;

import dragode.auction.model.*;
import dragode.auction.repository.*;
import org.apache.commons.collections4.CollectionUtils;
import org.joda.time.DateTime;
import org.joda.time.Period;
import org.joda.time.PeriodType;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 拍卖服务
 */
@Service
public class AuctionService {

    /**
     * 拍卖推迟最小间隔
     */
    public static final Period DELAY_CYCLE_GAP = new Period(5, PeriodType.minutes());
    /**
     * 最多延迟几次
     */
    public static final Integer MAX_DELAY_TIMES = 5;

    /**
     * 用户直接出价拍卖
     */
    public static final String BID_DIRECT = "bid_direct";
    /**
     * 代理出价拍卖
     */
    public static final String BID_BY_PROXY = "bid_by_proxy";
    /**
     * 一口价拍卖
     */
    public static final String BID_MAX_PRICE = "bid_max_price";

    @Resource
    private SessionRepository sessionRepository;
    @Resource
    private GoodsRepository goodsRepository;
    @Resource
    private AuctionReminderRepository auctionReminderRepository;
    @Resource
    private ProxyBidRepository proxyBidRepository;
    @Resource
    private OrderRepository orderRepository;
    @Resource
    private BidRecordRepository bidRecordRepository;

    @Resource
    private WxReminderService wxReminderService;

    /**
     * 触发专场拍卖开始相关事件：
     * @param session
     */
    public void startAuctionOfSession(Session session){
        session.setStatus(Session.AUCTION);
        sessionRepository.save(session);
        startGoodsAuction(session);
    }

    /**
     * 触发专场拍卖开始相关事件：
     * @param session
     */
    private void startGoodsAuction(Session session){
        List<Goods> goodsInSession = goodsRepository.findAllBySessionId(session.getId());
        for (Goods goods : goodsInSession) {
            goods.setStatus(Goods.AUCTION);
            asyncRemindUserOfAuctionStart(goods);
            goodsRepository.save(goods);
        }
    }

    /**
     * 异步提醒用户商品即将拍卖，并删除AuctionReminders
     * @param goods
     */
    //TODO 异步执行
    private void asyncRemindUserOfAuctionStart(Goods goods) {
        List<AuctionReminder> auctionReminders = auctionReminderRepository.findAllByGoodsId(goods.getId());
        for (AuctionReminder auctionReminder : auctionReminders) {
            wxReminderService.remindUserOfAuctionStart(auctionReminder.getUserId(), goods);
            auctionReminderRepository.delete(auctionReminder);
        }
    }


    /**
     * 用户竞拍商品
     *
     * @param goodsId
     * @param userId
     */
    public void bid(Integer goodsId, Integer userId, Long price) {
        Goods goods = goodsRepository.findOne(goodsId);
        Long currentPrice = goods.getCurrentPrice();
        if (currentPrice >= price) {
            //TODO 封装通用异常体系
            throw new RuntimeException("-1");
        }

        DateTime now = DateTime.now();

        //增加拍卖纪录
        BidRecord bidRecord = new BidRecord();
        bidRecord.setUserId(userId);
        bidRecord.setGoodsId(goodsId);
        bidRecord.setPrice(price);
        bidRecord.setBidTime(now.toDate());
        bidRecordRepository.save(bidRecord);

        //修改物品拍卖状态
        goods.setCurrentPrice(price);
        goods.setAuctionUserId(userId);
        goods.setLastAuctionDate(now.toDate());
        delayEndTimeIfNecessary(now, goods);
        goodsRepository.save(goods);

        //出价被超过提醒
        if (goods.getAuctionUserId() != userId) {
            wxReminderService.remindUserOfBidOver(userId, goods);
        }
    }

    /**
     * 用户拍卖时间在拍卖结束时间一定范围内，且拍卖延迟不超过一定次数，延迟拍卖结束时间
     * @param now
     * @param goods
     */
    private void delayEndTimeIfNecessary(DateTime now, Goods goods) {
        //用户在快结束时拍卖，则延长拍卖周期。但是不能超过一定次数
        DateTime auctionEndTime = new DateTime(goods.getEndTime());
        DateTime delayedEndTime = now.plus(DELAY_CYCLE_GAP);
        if (delayedEndTime.isAfter(auctionEndTime)
                && goods.getDelayTimes() <= MAX_DELAY_TIMES) {
            goods.setEndTime(delayedEndTime.toDate());
            goods.setDelayTimes(goods.getDelayTimes() + 1);
        }
    }

    public void finishAuctionOfGoods(Goods goods){
        goods.setStatus(Goods.DONE);

        //如果有代理价，修改状态
        List<ProxyBid> proxyBids = proxyBidRepository.findByStatusAndGoodsId(ProxyBid.UNDER_PROXY, goods.getId());
        if (CollectionUtils.isNotEmpty(proxyBids)) {
            for (ProxyBid proxyBid : proxyBids) {
                proxyBid.setStatus(ProxyBid.AUCTION_FINISH);
            }
            proxyBidRepository.save(proxyBids);
        }

        if(null == goods.getAuctionUserId()){
            goods.setStatus(Goods.ABORTIVE);
        }else {
            goods.setStatus(Goods.DONE);

            wxReminderService.remindUserOfAuctionSuccess(goods);

            //生成订单
            Order order = new Order();
            order.setDisplayId(Order.generateOrderDisplayId());
            order.setPrice(goods.getCurrentPrice());
            order.setStatus(Order.OrderStatus.WAIT_FOR_PAY.getCode());
            order.setUserId(goods.getAuctionUserId());
            order.setGoodsId(goods.getId());
            orderRepository.save(order);
        }

        goodsRepository.save(goods);
    }
}
