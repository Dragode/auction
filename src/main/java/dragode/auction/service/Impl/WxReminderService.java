package dragode.auction.service.Impl;

import dragode.auction.model.Goods;
import dragode.auction.model.Order;
import dragode.auction.model.User;
import dragode.auction.repository.GoodsRepository;
import dragode.auction.repository.UserRepository;
import dragode.wechat.intf.TemplateMessage;
import dragode.wechat.intf.WxInterface;
import org.joda.time.DateTime;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.annotation.Resource;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static dragode.auction.common.Constant.*;

/**
 * 微信提醒服务
 */
@Service
public class WxReminderService {

    private static final String INDEX_HTML = "http://www.ssspaimai.com/index.html#";
    private static final String GOODS_DETAIL_URL = INDEX_HTML + "/goodsDetail/";
    private static final String ORDERS_URL = INDEX_HTML + "/myOrders";

    /**
     * 预约拍卖开始提醒
     * <p/>
     * {{first.DATA}}
     * 拍卖名称：{{keyword1.DATA}}
     * 开拍时间：{{keyword2.DATA}}
     * {{remark.DATA}}
     */
    private static final String AUCTION_START_TEMPLATE_ID = "k-K8-X9L6caLw-umEkwelvYz3KEArpJC-L8g_qy9Qm4";
    /**
     * 竞拍价格被超越通知
     * <p/>
     * {{first.DATA}}
     * 拍品名称：{{keyword1.DATA}}
     * 当前应价：{{keyword2.DATA}}
     * {{remark.DATA}}
     */
    private static final String OVER_BID_TEMPLATE_ID = "VHQp5Wx5oet4BubNGVcYz8K2vimsRPzENSS3KyzQ5CE";
    /**
     * 操作提醒
     * <p/>
     * {{first.DATA}}
     * 提醒内容：{{keyword1.DATA}}
     * 提醒时间：{{keyword2.DATA}}
     * {{remark.DATA}}
     */
    private static final String NOTICE_USER_AUCTION_TEMPLATE_ID = "4Ueo6pujkILcu62rxiOKoq7Lba7qoUN9FNPOXsFYsgo";
    /**
     * 竞拍结束提醒
     * <p/>
     * {{first.DATA}}
     * 拍品名称：{{keyword1.DATA}}
     * 最新价格：{{keyword2.DATA}}
     * 预定结束时间：{{keyword3.DATA}}
     * {{remark.DATA}}
     */
    private static final String AUCTION_TO_BE_FINISH_TEMPLATE_ID = "DbV3XnZMqIEIMZgj2ACk1fhdGX9YpQm9X24r_QZsBsI";
    /**
     * 竞拍成功通知
     * {{first.DATA}}
     * 拍品名称：{{keyword1.DATA}}
     * 拍卖价：{{keyword2.DATA}}
     * {{remark.DATA}}
     */
    private static final String AUCTION_SUCCESS_TEMPLATE_ID = "HrM-g7KJZM8dkBX9xXoae8QnIDaZYYbyCxxHWonB2SI";
    /**
     * 订单消息提醒
     * <p/>
     * {{first.DATA}}
     * 商品名称：{{keyword1.DATA}}
     * 订单金额：{{keyword2.DATA}}
     * 订单状态：{{keyword3.DATA}}
     * {{remark.DATA}}
     */
    private static final String ORDER_STATUS_CHANGE_TEMPLATE_ID = "ZZN8hykv3StsNy6KcystdfrfST6JCryvjDz1waazrTE";

    @Resource
    private UserRepository userRepository;
    @Resource
    private GoodsRepository goodsRepository;

    private TemplateMessage.DataItem defaultDataItem(String value) {
        return defaultDataItem(value, BLUE_COLOR);
    }

    private TemplateMessage.DataItem defaultDataItem(Date date) {
        return defaultDataItem(new DateTime(date).toString(DATE_PATTERN), BLUE_COLOR);
    }

    private TemplateMessage.DataItem defaultDataItem(String value, String color) {
        TemplateMessage.DataItem item = new TemplateMessage.DataItem();
        item.setValue(value);
        item.setColor(color);
        return item;
    }

    /**
     * 提醒用户拍卖开始
     */
    public void remindUserOfAuctionStart(Integer userId, Goods goods) {
        String goodsUrl = GOODS_DETAIL_URL + goods.getId();
        HashMap<String, TemplateMessage.DataItem> params = new HashMap<>();
        params.put("first", defaultDataItem("亲爱的用户，你关注的拍卖品即将开拍"));
        params.put("keyword1", defaultDataItem(goods.getTitle()));
        params.put("keyword2", defaultDataItem(goods.getStartTime()));
        params.put("remark", defaultDataItem("请注意。"));

        defaultRemind(AUCTION_START_TEMPLATE_ID, userId, goodsUrl, params);
    }

    /**
     * 提醒用户竞价被超过
     */
    public void remindUserOfBidOver(Integer userId, Goods goods) {
        String goodsUrl = GOODS_DETAIL_URL + goods.getId();
        HashMap<String, TemplateMessage.DataItem> params = new HashMap<>();
        params.put("first", defaultDataItem("亲爱的用户，你竞拍的拍卖品出价被超过"));
        params.put("keyword1", defaultDataItem(goods.getTitle()));
        params.put("keyword2", defaultDataItem(goods.getCurrentPrice().toString()));
        params.put("remark", defaultDataItem("请注意。"));
        defaultRemind(OVER_BID_TEMPLATE_ID, userId, goodsUrl, params);
    }

    /**
     * 提醒代理价被超过
     */
    public void remindUserOfOverProxy(Integer userId, Goods goods) {
        String goodsUrl = GOODS_DETAIL_URL + goods.getId();
        HashMap<String, TemplateMessage.DataItem> params = new HashMap<>();
        params.put("first", defaultDataItem("亲爱的用户，你设置的代理价被超过"));
        params.put("keyword1", defaultDataItem(goods.getTitle()));
        params.put("keyword2", defaultDataItem(goods.getCurrentPrice().toString()));
        params.put("remark", defaultDataItem("请注意。"));
        defaultRemind(OVER_BID_TEMPLATE_ID, userId, goodsUrl, params);
    }

    /**
     * 通知管理员有用户竞拍
     */
    public void remindAdminOfBid(Integer userId, Goods goods) {
        User user = userRepository.findOne(userId);
        Assert.notNull(user);

        String goodsUrl = GOODS_DETAIL_URL + goods.getId();
        HashMap<String, TemplateMessage.DataItem> params = new HashMap<>();
        params.put("first", defaultDataItem("用户竞拍提醒"));
        params.put("keyword1", defaultDataItem("用户" + user.getPhoneNumber() +
                "以价格" + goods.getCurrentPrice().toString() +
                "竞拍商品" + goods.getTitle()));
        params.put("keyword2", defaultDataItem(new Date()));
        params.put("remark", defaultDataItem("请注意。"));
        defaultRemind(NOTICE_USER_AUCTION_TEMPLATE_ID, userId, goodsUrl, params);
    }

    /**
     * 提醒用户拍卖即将结束
     */
    public void remindUserOfAuctionToBeFinish(Integer userId, Goods goods) {
        String goodsUrl = GOODS_DETAIL_URL + goods.getId();
        HashMap<String, TemplateMessage.DataItem> params = new HashMap<>();
        params.put("first", defaultDataItem("亲爱的用户，你关注的拍卖品竞拍即将结束"));
        params.put("keyword1", defaultDataItem(goods.getTitle()));
        params.put("keyword2", defaultDataItem(goods.getCurrentPrice().toString()));
        params.put("keyword3", defaultDataItem(goods.getEndTime()));
        params.put("remark", defaultDataItem("请注意。"));
        defaultRemind(AUCTION_TO_BE_FINISH_TEMPLATE_ID, userId, goodsUrl, params);
    }

    /**
     * 提醒用户竞拍成功
     */
    public void remindUserOfAuctionSuccess(Goods goods) {
        User user = userRepository.findOne(goods.getAuctionUserId());
        Assert.notNull(user);

        String orderUrl = ORDERS_URL;
        HashMap<String, TemplateMessage.DataItem> params = new HashMap<>();
        params.put("first", defaultDataItem("亲爱的用户，恭喜您竞拍成功"));
        params.put("keyword1", defaultDataItem(goods.getTitle()));
        params.put("keyword2", defaultDataItem(goods.getCurrentPrice().toString()));
        params.put("remark", defaultDataItem("请及时支付。"));
        defaultRemind(AUCTION_SUCCESS_TEMPLATE_ID, user.getId(), orderUrl, params);
    }

    /**
     * 提醒用户已发货
     */
    public void remindUserOfGoodsDelivered(Order order) {
        User user = userRepository.findOne(order.getUserId());
        Assert.notNull(user);
        Goods goods = goodsRepository.findOne(order.getGoodsId());
        Assert.notNull(goods);

        String orderUrl = ORDERS_URL;
        HashMap<String, TemplateMessage.DataItem> params = new HashMap<>();
        params.put("first", defaultDataItem("亲爱的用户，您的订单已发货"));
        params.put("keyword1", defaultDataItem(goods.getTitle()));
        params.put("keyword2", defaultDataItem(order.getPrice().toString()));
        params.put("keyword3", defaultDataItem("已发货"));
        params.put("remark", defaultDataItem("请注意查收。"));
        defaultRemind(ORDER_STATUS_CHANGE_TEMPLATE_ID, user.getId(), orderUrl, params);
    }

    private void defaultRemind(String templateId, Integer userId, String url, Map<String, TemplateMessage.DataItem> params) {
        User user = userRepository.findOne(userId);
        Assert.notNull(user);
        WxInterface.sendTemplateMessage(templateId, user.getOpenId(), RED_COLOR, url, params);
    }
}
