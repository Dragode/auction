package dragode.auction.service.Impl;

import dragode.auction.model.Goods;
import dragode.auction.model.Order;
import dragode.auction.model.User;
import dragode.auction.repository.GoodsRepository;
import dragode.auction.repository.UserRepository;
import dragode.wechat.intf.TemplateMessage;
import dragode.wechat.intf.WxInterface;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;

/**
 * 微信提醒服务
 */
@Service
public class WxReminderService {

    private static final String INDEX_HTML = "http://www.ssspaimai.com/index.html#";
    private static final String GOODS_DETAIL_URL = INDEX_HTML + "/goodsDetail?goodsId=";

    private static final String AUCTION_START_TEMPLATE_ID = "ADHrbX8R1mB736XPDyT9HNxD4-3EIhqE--2go8YrVlA";
    private static final String OVER_BID_TEMPLATE_ID = "iyu51Ee1S8F9Wf-ZX6lBMltv-nONEu3lQvog5W3fDF8";
    private static final String OVER_PROXY_TEMPLATE_ID = "0ycvUSKrpAJIzjQJWPW8qKc8QrzccrDAyEZ6w9s1Nn4";
    private static final String AUCTION_SUCCESS_TEMPLATE_ID = "-_DwO_45AMMzGRxJtbirC1YNUN5kzpE3WncrmcentGg";
    private static final String GOODS_DELIVERED_TEMPLATE_ID = "gWBf9sX9qHG-PS87DnNk27QwqBDkixUmikOl4SJjFOc";
    private static final String AUCTION_TO_BE_FINISH_TEMPLATE_ID = "woXuU5Ov-7Dg9VJ4H_QbRh1yPxCdCaxZUZwWdUqbTEU";

    @Resource
    private UserRepository userRepository;
    @Resource
    private GoodsRepository goodsRepository;

    /**
     * 提醒用户拍卖开始
     *
     * @param userId
     * @param goods
     */
    public void remindUserOfAuctionStart(Integer userId, Goods goods) {
        User user = userRepository.findOne(userId);

        String topcolor = "#FF0000";
        String url = GOODS_DETAIL_URL + goods.getId();
        HashMap<String, TemplateMessage.DataItem> stringDataItemHashMap = new HashMap<>();
        TemplateMessage.DataItem name = new TemplateMessage.DataItem();
        name.setValue(goods.getTitle());
        name.setColor("#173177");
        stringDataItemHashMap.put("name", name);
        WxInterface.sendTemplateMessage(AUCTION_START_TEMPLATE_ID, user.getOpenId(), topcolor, url, stringDataItemHashMap);
    }

    /**
     * 提醒用户竞价被超过
     *
     * @param userId
     * @param goods
     */
    public void remindUserOfOverBid(Integer userId, Goods goods) {
        User user = userRepository.findOne(userId);
        String topcolor = "#FF0000";
        String url = GOODS_DETAIL_URL + goods.getId();
        HashMap<String, TemplateMessage.DataItem> stringDataItemHashMap = new HashMap<>();
        TemplateMessage.DataItem name = new TemplateMessage.DataItem();
        name.setValue(goods.getTitle());
        name.setColor("#173177");
        stringDataItemHashMap.put("name", name);
        WxInterface.sendTemplateMessage(OVER_BID_TEMPLATE_ID, user.getOpenId(), topcolor, url, stringDataItemHashMap);
    }

    /**
     * 提醒代理价被超过
     *
     * @param userId
     * @param goods
     */
    public void remindUserOfOverProxy(Integer userId, Goods goods) {
        User user = userRepository.findOne(userId);

        String topcolor = "#FF0000";
        String url = GOODS_DETAIL_URL + goods.getId();
        HashMap<String, TemplateMessage.DataItem> stringDataItemHashMap = new HashMap<>();
        TemplateMessage.DataItem name = new TemplateMessage.DataItem();
        name.setValue(goods.getTitle());
        name.setColor("#173177");
        stringDataItemHashMap.put("name", name);
        WxInterface.sendTemplateMessage(OVER_PROXY_TEMPLATE_ID, user.getOpenId(), topcolor, url, stringDataItemHashMap);
    }

    /**
     * 提醒用户竞拍成功
     *
     * @param goods
     */
    public void remindUserOfAuctionSuccess(Goods goods) {
        User user = userRepository.findOne(goods.getAuctionUserId());
        String topcolor = "#FF0000";
        String url = GOODS_DETAIL_URL + goods.getId();
        HashMap<String, TemplateMessage.DataItem> stringDataItemHashMap = new HashMap<>();
        TemplateMessage.DataItem name = new TemplateMessage.DataItem();
        name.setValue(goods.getTitle());
        name.setColor("#173177");
        stringDataItemHashMap.put("name", name);
        WxInterface.sendTemplateMessage(AUCTION_SUCCESS_TEMPLATE_ID, user.getOpenId(), topcolor, url, stringDataItemHashMap);
    }

    /**
     * 提醒用户竞拍成功
     *
     * @param order
     */
    public void remindUserOfGoodsDelivered(Order order) {
        User user = userRepository.findOne(order.getUserId());
        Goods goods = goodsRepository.findOne(order.getGoodsId());
        String topcolor = "#FF0000";
        String url = GOODS_DETAIL_URL + order.getGoodsId();
        HashMap<String, TemplateMessage.DataItem> stringDataItemHashMap = new HashMap<>();
        TemplateMessage.DataItem name = new TemplateMessage.DataItem();
        name.setValue(goods.getTitle());
        name.setColor("#173177");
        stringDataItemHashMap.put("name", name);
        WxInterface.sendTemplateMessage(GOODS_DELIVERED_TEMPLATE_ID, user.getOpenId(), topcolor, url, stringDataItemHashMap);
    }

    /**
     * 提醒用户拍卖即将结束
     * @param userId
     * @param goods
     */
    public void remindUserOfAuctionToBeFinish(Integer userId, Goods goods) {
        User user = userRepository.findOne(userId);
        String topcolor = "#FF0000";
        String url = GOODS_DETAIL_URL + goods.getId();
        HashMap<String, TemplateMessage.DataItem> stringDataItemHashMap = new HashMap<>();
        TemplateMessage.DataItem name = new TemplateMessage.DataItem();
        name.setValue(goods.getTitle());
        name.setColor("#173177");
        stringDataItemHashMap.put("name", name);
        WxInterface.sendTemplateMessage(AUCTION_TO_BE_FINISH_TEMPLATE_ID, user.getOpenId(), topcolor, url, stringDataItemHashMap);
    }

    /**
     * 通知用户竞拍出价被超过
     */
    public void remindUserOfBidOver(Integer userId, Goods goods) {
        User user = userRepository.findOne(userId);
        String templateId = "iyu51Ee1S8F9Wf-ZX6lBMltv-nONEu3lQvog5W3fDF8";
        String topcolor = "#FF0000";
        String url = "http://119.29.159.58/auctionList.html";
        HashMap<String, TemplateMessage.DataItem> stringDataItemHashMap = new HashMap<>();
        TemplateMessage.DataItem name = new TemplateMessage.DataItem();
        name.setValue(goods.getTitle());
        name.setColor("#173177");
        stringDataItemHashMap.put("name", name);
        WxInterface.sendTemplateMessage(templateId, user.getOpenId(), topcolor, url, stringDataItemHashMap);
    }

    /**
     * 通知用户竞拍出价被超过
     */
    public void remindAdminOfBid(Integer userId, Goods goods) {
        User user = userRepository.findOne(userId);
        String templateId = "pPcjc7S_cXRYy6UCoF1heSqqaUxMu4YdPd_5ak7bcn4";
        String topcolor = "#FF0000";
        String url = "http://119.29.159.58/auctionList.html";
        HashMap<String, TemplateMessage.DataItem> stringDataItemHashMap = new HashMap<>();
        TemplateMessage.DataItem phoneNumber = new TemplateMessage.DataItem();
        phoneNumber.setValue(user.getPhoneNumber());
        phoneNumber.setColor("#173177");
        stringDataItemHashMap.put("phoneNumber", phoneNumber);
        TemplateMessage.DataItem goodsName = new TemplateMessage.DataItem();
        goodsName.setValue(goods.getTitle());
        goodsName.setColor("#173177");
        stringDataItemHashMap.put("goodsName", goodsName);
        TemplateMessage.DataItem price = new TemplateMessage.DataItem();
        price.setValue(goods.getCurrentPrice().toString());
        price.setColor("#173177");
        stringDataItemHashMap.put("price", price);
        WxInterface.sendTemplateMessage(templateId, user.getOpenId(), topcolor, url, stringDataItemHashMap);
    }
}
