package dragode.auction.service.Impl;

import dragode.auction.model.*;
import dragode.auction.repository.*;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;

/**
 * 定时任务
 */
@Service
public class TaskService {

    private static final Logger logger = LoggerFactory.getLogger(TaskService.class);

    @Resource
    private SessionRepository sessionRepository;
    @Resource
    private ProxyBidRepository proxyBidRepository;
    @Resource
    private GoodsRepository goodsRepository;
    @Resource
    private BidRecordRepository bidRecordRepository;

    @Resource
    private WxReminderService wxReminderService;
    @Resource
    private AuctionService auctionService;

    /**
     * 触发专场拍卖开始相关事件：
     * 通知订阅拍卖开始的用户
     */
    //TODO 优化算法，例如用优先队列 + Sleep
    @Scheduled(fixedDelay = 1000)
    public void startSessionAuction() {
        List<Session> waitingForAuctionSessions = sessionRepository.findAllByStatus(Session.WAITING);
        for (Session session : waitingForAuctionSessions) {
            DateTime goodsAuctionStartTime = new DateTime(session.getStartTime());
            if (DateTime.now().isAfter(goodsAuctionStartTime)) {
                auctionService.startAuctionOfSession(session);
            }
        }
    }

    /**
     * 代理出价
     */
    //TODO 代理价触发事件间隔限制，
    //TODO 比如同时有两个用户设置代理价，那么一个用户代理出价后，需隔x秒再触发另一个用户的代理出价
    //TODO 优化性能，例如其他用户拍卖后通知
    @Scheduled(fixedDelay = 1000)
    public void proxyAuction() {
        List<ProxyBid> underProxyBids = proxyBidRepository.findByStatus(ProxyBid.UNDER_PROXY);
        for (ProxyBid underProxyBid : underProxyBids) {
            Goods goods = goodsRepository.findOne(underProxyBid.getGoodsId());
            if (!goods.getAuctionUserId().equals(underProxyBid.getUserId())) {
                if (goods.getCurrentPrice() < underProxyBid.getMaxPrice()) {
                    Integer preAuctionUserId = goods.getAuctionUserId();
                    goods.setAuctionUserId(underProxyBid.getUserId());
                    goods.setCurrentPrice(goods.getCurrentPrice() + goods.getBidIncrement());
                    goodsRepository.save(goods);
                    wxReminderService.remindUserOfProxyBid(preAuctionUserId, goods);
                } else {
                    underProxyBid.setStatus(ProxyBid.PRICE_OVER);
                    proxyBidRepository.save(underProxyBid);
                    wxReminderService.remindUserOfPriceOver(underProxyBid.getUserId(), goods);
                }
            }
        }
    }

    /**
     * 拍卖即将到时提醒 和 拍卖到时生成订单
     */
    @Scheduled(fixedDelay = 1000)
    public void remindOrFinishAuction() {
        List<Goods> goodsAtAuction = goodsRepository.findAllByStatus(Goods.AUCTION);
        for (Goods goods : goodsAtAuction) {
            DateTime endTime = new DateTime(goods.getEndTime());
            DateTime now = DateTime.now();

            if (now.isAfter(endTime)) {
                //拍卖到期，生成订单
                auctionService.finishAuctionOfGoods(goods);
            }else if (now.plusMinutes(10).isAfter(endTime)) {
                //拍卖即将到期提醒
                List<BidRecord> goodsBidRecords = bidRecordRepository.findAllByGoodsId(goods.getId());
                if (goodsBidRecords.size() > 1){
                    Set<Integer> auctionedGoodsUser = new HashSet<>();//拍卖过该商品的用户，除了当前竞拍用户
                    goodsBidRecords = goodsBidRecords.subList(0, goodsBidRecords.size()-2);
                    for (BidRecord goodsBidRecord : goodsBidRecords) {
                        auctionedGoodsUser.add(goodsBidRecord.getUserId());
                    }
                    for (Integer userId : auctionedGoodsUser) {
                        wxReminderService.remindUserOfAuctionToBeFinish(userId, goods);
                    }
                }
            }
        }
    }
}
