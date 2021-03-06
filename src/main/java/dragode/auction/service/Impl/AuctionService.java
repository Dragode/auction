package dragode.auction.service.Impl;

import dragode.auction.model.*;
import dragode.auction.repository.*;
import org.apache.commons.collections4.CollectionUtils;
import org.joda.time.DateTime;
import org.joda.time.Period;
import org.joda.time.PeriodType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 拍卖服务
 */
@Service
public class AuctionService {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuctionService.class);

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
    private UserRepository userRepository;

    @Resource
    private WxReminderService wxReminderService;

    /**
     * 触发专场拍卖开始相关事件：
     * @param session
     */
    public void startAuctionOfSession(Session session){
        LOGGER.info("专场{}准备开始拍卖！[id={}]",session.getTitle(),session.getId());
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
            LOGGER.info("商品{}准备开始拍卖！[id={}]",goods.getTitle(),goods.getId());
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
            LOGGER.info("通知用户商品{}准备开始拍卖！[userId={},goodsId={}]",goods.getTitle(),auctionReminder.getUserId(),goods.getId());
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
        Integer preAuctionUserId = goods.getAuctionUserId();

        //增加拍卖纪录
        User bidUser = userRepository.findOne(userId);
        BidRecord bidRecord = new BidRecord();
        bidRecord.setUserId(userId);
        bidRecord.setUserPhoneNumber(bidUser.getPhoneNumber());
        bidRecord.setGoodsId(goodsId);
        bidRecord.setPrice(price);
        bidRecord.setBidTime(now.toDate());
        bidRecordRepository.save(bidRecord);

        List<User> adminUsers = userRepository.findAllByRole(User.ADMINISTRATOR);
        if (CollectionUtils.isNotEmpty(adminUsers)) {
            for (User adminUser : adminUsers) {
                wxReminderService.remindAdminOfBid(adminUser.getId(), goods);
            }
        }

        Boolean ifBuyout = false;
        if (goods.getBuyoutPrice() !=0
                && price >= goods.getBuyoutPrice()) {
            ifBuyout = true;
        }

        //修改物品拍卖状态
        goods.setCurrentPrice(price);
        goods.setAuctionUserId(userId);
        goods.setLastAuctionDate(now.toDate());
        if (!ifBuyout) {
            delayEndTimeIfNecessary(now, goods);
        }
        goodsRepository.save(goods);

        //出价被超过提醒
        if (!goods.getAuctionUserId().equals(preAuctionUserId)) {
            wxReminderService.remindUserOfBidOver(preAuctionUserId, goods);
        }

        if (ifBuyout) {
            finishAuctionOfGoods(goods);
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
        //&& goods.getDelayTimes() <= MAX_DELAY_TIMES //5.1沟通后决定，不设置次数上限
        if (delayedEndTime.isAfter(auctionEndTime)) {
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
