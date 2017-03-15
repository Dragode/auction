package dragode.auction.service.Impl;

import dragode.auction.model.*;
import dragode.auction.repository.*;
import dragode.wechat.intf.TemplateMessage;
import dragode.wechat.intf.WxInterface;
import org.apache.commons.collections4.CollectionUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * 定时任务
 */
@Service
public class TaskService {

    private static final Logger logger = LoggerFactory.getLogger(TaskService.class);

    @Resource
    private AuctionReminderRepository auctionReminderRepository;
    @Resource
    private ProxyAuctionRepository proxyAuctionRepository;
    @Resource
    private GoodsRepository goodsRepository;
    @Resource
    private UserRepository userRepository;
    @Resource
    private OrderRepository orderRepository;

    /**
     * 触发拍卖开始相关事件：
     * 通知订阅拍卖开始的用户
     */
    //TODO 优化算法，例如用优先队列 + Sleep
    @Scheduled(fixedDelay = 1000)
    public void startAuction() {
        List<Goods> waitingForAuctionGoods = goodsRepository.findAllByStatus(Goods.WAITING);
        for (Goods goods : waitingForAuctionGoods) {
            Date startTime = goods.getStartTime();
            Date now = new Date();
            if (now.getTime() > startTime.getTime()) {
                goods.setStatus(Goods.AUCTION);
                asyncRemindUserOfAuctionStart(goods);
                goodsRepository.save(goods);
            }
        }
    }

    //TODO 异步执行
    private void asyncRemindUserOfAuctionStart(Goods goods) {
        List<AuctionReminder> auctionReminders = auctionReminderRepository.findAllByGoodsId(goods.getId());
        for (AuctionReminder auctionReminder : auctionReminders) {
            remindUserOfAuctionStart(auctionReminder, goods);
        }
    }

    //TODO 封装进WxInterface
    private void remindUserOfAuctionStart(AuctionReminder auctionReminder, Goods goods) {
        User user = userRepository.findOne(auctionReminder.getUserId());

        String templateId = "ADHrbX8R1mB736XPDyT9HNxD4-3EIhqE--2go8YrVlA";
        String topcolor = "#FF0000";
        String url = "http://www.ssspaimai.com/goodsDetail.html?goodsId=" + auctionReminder.getGoodsId();
        HashMap<String, TemplateMessage.DataItem> stringDataItemHashMap = new HashMap<>();
        TemplateMessage.DataItem name = new TemplateMessage.DataItem();
        name.setValue(goods.getTitle());
        name.setColor("#173177");
        stringDataItemHashMap.put("name", name);
        WxInterface.sendTemplateMessage(templateId, user.getOpenId(), topcolor, url, stringDataItemHashMap);
    }

    /**
     * 代理出价
     */
    //TODO 代理价触发事件间隔限制，
    //TODO 比如同时有两个用户设置代理价，那么一个用户代理出价后，需隔x秒再触发另一个用户的代理出价
    //TODO 优化性能，例如其他用户拍卖后通知
    @Scheduled(fixedDelay = 1000)
    public void proxyAuction() {
        List<ProxyAuction> underProxyAuctions = proxyAuctionRepository.findByStatus(ProxyAuction.UNDER_PROXY);
        for (ProxyAuction underProxyAuction : underProxyAuctions) {
            Goods goods = goodsRepository.findOne(underProxyAuction.getGoodsId());
            if (goods.getAuctionUserId().intValue() != underProxyAuction.getUserId().intValue()) {
                if (goods.getCurrentPrice() < underProxyAuction.getPrice()) {
                    Integer preAuctionUserId = goods.getAuctionUserId();
                    goods.setAuctionUserId(underProxyAuction.getUserId());
                    goods.setCurrentPrice(goods.getCurrentPrice() + goods.getBidIncrement());
                    goodsRepository.save(goods);
                    remindUserOfPriceProxy(preAuctionUserId, goods);
                } else {
                    underProxyAuction.setStatus(ProxyAuction.PRICE_OVER);
                    proxyAuctionRepository.save(underProxyAuction);
                    remindUserOfPriceOver(underProxyAuction.getUserId(), goods);
                }
            }
        }
    }

    /**
     * 提醒用户竞价被超过
     *
     * @param userId
     * @param goods
     */
    //TODO 封装进WxInterface
    private void remindUserOfPriceProxy(Integer userId, Goods goods) {
        User user = userRepository.findOne(userId);
        String templateId = "iyu51Ee1S8F9Wf-ZX6lBMltv-nONEu3lQvog5W3fDF8";
        String topcolor = "#FF0000";
        String url = "http://www.ssspaimai.com/goodsDetail.html?goodsId=" + goods.getId();
        HashMap<String, TemplateMessage.DataItem> stringDataItemHashMap = new HashMap<>();
        TemplateMessage.DataItem name = new TemplateMessage.DataItem();
        name.setValue(goods.getTitle());
        name.setColor("#173177");
        stringDataItemHashMap.put("name", name);
        WxInterface.sendTemplateMessage(templateId, user.getOpenId(), topcolor, url, stringDataItemHashMap);
    }

    /**
     * 提醒代理价被超过
     *
     * @param userId
     * @param goods
     */
    //TODO 封装进WxInterface
    private void remindUserOfPriceOver(Integer userId, Goods goods) {
        User user = userRepository.findOne(userId);

        String templateId = "0ycvUSKrpAJIzjQJWPW8qKc8QrzccrDAyEZ6w9s1Nn4";
        String topcolor = "#FF0000";
        String url = "http://www.ssspaimai.com/goodsDetail.html?goodsId=" + goods.getId();
        HashMap<String, TemplateMessage.DataItem> stringDataItemHashMap = new HashMap<>();
        TemplateMessage.DataItem name = new TemplateMessage.DataItem();
        name.setValue(goods.getTitle());
        name.setColor("#173177");
        stringDataItemHashMap.put("name", name);
        WxInterface.sendTemplateMessage(templateId, user.getOpenId(), topcolor, url, stringDataItemHashMap);
    }

    /**
     * 拍卖到时生成订单
     */
    @Scheduled(fixedDelay = 1000)
    public void finishAuction() {
        List<Goods> goodsAtAuction = goodsRepository.findAllByStatus(Goods.AUCTION);
        for (Goods goods : goodsAtAuction) {
            Date endTime = goods.getEndTime();
            Date now = new Date();
            if (now.getTime() > endTime.getTime()) {
                goods.setStatus(Goods.DONE);

                //如果有代理价，修改状态
                List<ProxyAuction> proxyAuctions = proxyAuctionRepository.findByStatusAndGoodsId(ProxyAuction.UNDER_PROXY, goods.getId());
                if (CollectionUtils.isNotEmpty(proxyAuctions)) {
                    for (ProxyAuction proxyAuction : proxyAuctions) {
                        proxyAuction.setStatus(ProxyAuction.AUCTION_FINISH);
                    }
                    proxyAuctionRepository.save(proxyAuctions);
                }

                if(null == goods.getAuctionUserId()){
                    goods.setStatus(Goods.ABORTIVE);
                }else {
                    goods.setStatus(Goods.DONE);

                    remindUserOfAuctionSuccess(goods);

                    //生成订单
                    Order order = new Order();
                    order.setDisplayId(generateOrderDisplayId());
                    order.setPrice(goods.getCurrentPrice());
                    order.setStatus(Order.OrderStatus.WAIT_FOR_PAY.getCode());
                    order.setUserId(goods.getAuctionUserId());
                    order.setGoodsId(goods.getId());
                    orderRepository.save(order);
                }

                goodsRepository.save(goods);
            }
        }
    }

    /**
     * 生成用户看的订单ID
     * @return
     */
    private String generateOrderDisplayId(){
        return String.valueOf(new Date().getTime());
    }

    /**
     * 提醒用户竞拍成功
     *
     * @param goods
     */
    private void remindUserOfAuctionSuccess(Goods goods) {
        User user = userRepository.findOne(goods.getAuctionUserId());
        String templateId = "-_DwO_45AMMzGRxJtbirC1YNUN5kzpE3WncrmcentGg";
        String topcolor = "#FF0000";
        String url = "http://119.29.159.58/auctionList.html";
        HashMap<String, TemplateMessage.DataItem> stringDataItemHashMap = new HashMap<>();
        TemplateMessage.DataItem name = new TemplateMessage.DataItem();
        name.setValue(goods.getTitle());
        name.setColor("#173177");
        stringDataItemHashMap.put("name", name);
        WxInterface.sendTemplateMessage(templateId, user.getOpenId(), topcolor, url, stringDataItemHashMap);
    }
}
