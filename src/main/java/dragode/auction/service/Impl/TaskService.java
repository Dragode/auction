package dragode.auction.service.Impl;

import dragode.auction.model.*;
import dragode.auction.repository.*;
import dragode.wechat.intf.TemplateMessage;
import dragode.wechat.intf.WxInterface;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.annotation.Resource;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * 定时任务
 */
@Service
public class TaskService {

    @Resource
    private SessionReminderRepository sessionReminderRepository;
    @Resource
    private ProxyAuctionRepository proxyAuctionRepository;
    @Resource
    private GoodsRepository goodsRepository;
    @Resource
    private UserRepository userRepository;
    @Resource
    private SessionRepository sessionRepository;
    @Resource
    private OrderRepository orderRepository;

    /**
     * 代理价
     */
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

                    User user = userRepository.findOne(preAuctionUserId);
                    String templateId = "iyu51Ee1S8F9Wf-ZX6lBMltv-nONEu3lQvog5W3fDF8";
                    String topcolor = "#FF0000";
                    String url = "http://119.29.159.58/auctionList.html";
                    HashMap<String, TemplateMessage.DataItem> stringDataItemHashMap = new HashMap<>();
                    TemplateMessage.DataItem name = new TemplateMessage.DataItem();
                    name.setValue(goods.getTitle());
                    name.setColor("#173177");
                    stringDataItemHashMap.put("name", name);
                    WxInterface.sendTemplateMessage(templateId, user.getOpenId(), topcolor, url, stringDataItemHashMap);
                } else {
                    underProxyAuction.setStatus(ProxyAuction.PRICE_OVER);
                    proxyAuctionRepository.save(underProxyAuction);

                    //提醒代理价被超过
                    User user = userRepository.findOne(underProxyAuction.getUserId());

                    String templateId = "0ycvUSKrpAJIzjQJWPW8qKc8QrzccrDAyEZ6w9s1Nn4";
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
        }
    }

    /**
     * 到时拍卖生成订单
     */
    @Scheduled(fixedDelay = 1000)
    public void finishAuction() {
        List<Session> sessions = sessionRepository.findByStatus(Session.AUCTION);
        for (Session session : sessions) {
            Date endTime = session.getEndTime();
            Date now = new Date();
            if (now.getTime() > endTime.getTime()) {
                session.setStatus(Session.DONE);

                List<Goods> allGoods = goodsRepository.findAllBySessionId(session.getId());
                for (Goods goods : allGoods) {
                    //如果有代理价，修改状态
                    List<ProxyAuction> proxyAuctions = proxyAuctionRepository.findByStatusAndGoodsId(ProxyAuction.UNDER_PROXY, goods.getId());
                    if (CollectionUtils.isNotEmpty(proxyAuctions)) {
                        for (ProxyAuction proxyAuction : proxyAuctions) {
                            proxyAuction.setStatus(ProxyAuction.AUCTION_FINISH);
                        }
                        proxyAuctionRepository.save(proxyAuctions);
                    }

                    //提醒竞拍成功的用户
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

                    //生成订单
                    Order order = new Order();
                    order.setDisplayId(String.valueOf(now.getTime()));
                    order.setPrice(goods.getCurrentPrice());
                    order.setOrderStatus(Order.OrderStatus.WAIT_FOR_PAY.getCode());
                    order.setUserId(goods.getAuctionUserId());
                    order.setGoodsId(goods.getId());
                    orderRepository.save(order);
                }

                sessionRepository.save(session);
            }
        }
    }

    /**
     * 开始拍卖
     */
    @Scheduled(fixedDelay = 1000)
    public void startAuction() {
        List<Session> waitingForAuctionSessions = sessionRepository.findByStatus(Session.WAITING);
        for (Session session : waitingForAuctionSessions) {
            Date startTime = session.getStartTime();
            Date now = new Date();
            if (now.getTime() > startTime.getTime()) {
                session.setStatus(Session.AUCTION);

                List<SessionReminder> sessionReminders = sessionReminderRepository.findAllBySessionId(session.getId());
                for (SessionReminder sessionReminder : sessionReminders) {
                    remindUser(sessionReminder, session);
                }

                sessionRepository.save(session);
            }
        }
    }

    //TODO 异步执行
    public void remindUser(SessionReminder sessionReminder, Session session) {
        User user = userRepository.findOne(sessionReminder.getUserId());

        String templateId = "ADHrbX8R1mB736XPDyT9HNxD4-3EIhqE--2go8YrVlA";
        String topcolor = "#FF0000";
        String url = "http://119.29.159.58/auctionList.html";
        HashMap<String, TemplateMessage.DataItem> stringDataItemHashMap = new HashMap<>();
        TemplateMessage.DataItem name = new TemplateMessage.DataItem();
        name.setValue(session.getTitle());
        name.setColor("#173177");
        stringDataItemHashMap.put("name", name);
        WxInterface.sendTemplateMessage(templateId, user.getOpenId(), topcolor, url, stringDataItemHashMap);
    }
}
