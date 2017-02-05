package dragode.auction.controller;

import com.alibaba.fastjson.JSONObject;
import dragode.auction.common.Constant;
import dragode.auction.controller.response.BaseListResponse;
import dragode.auction.controller.response.BaseResponse;
import dragode.auction.controller.response.GoodsResponse;
import dragode.auction.controller.response.SessionDetailResponse;
import dragode.auction.model.*;
import dragode.auction.repository.*;
import dragode.wechat.intf.TemplateMessage;
import dragode.wechat.intf.WxInterface;
import dragode.wechat.service.WxService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

@RestController
public class SessionController {

    private static Logger logger = LoggerFactory.getLogger(SessionController.class);

    @Resource
    private HomePageRepository homePageRepository;
    @Resource
    private SessionRepository sessionRepository;
    @Resource
    private SessionReminderRepository sessionReminderRepository;
    @Resource
    private UserRepository userRepository;
    @Resource
    private GoodsRepository goodsRepository;
    @Resource
    private AuctionRecordRepository auctionRecordRepository;
    @Resource
    private OrderRepository orderRepository;
    @Resource
    private ProxyAuctionRepository proxyAuctionRepository;

    /**
     * 获取首页Banner的专场
     */
    @RequestMapping(path = "/homePage", method = RequestMethod.GET)
    public Session getHomePage() {
        HomePage homePage = homePageRepository.findAll().get(0);
        Session homePageSession = sessionRepository.findOne(homePage.getSessionId());
        return homePageSession;
    }

    /**
     * 设置首页Banner的专场
     */
    @RequestMapping(path = "/homePage/{sessionId}", method = RequestMethod.POST)
    public String setHomePage(@PathVariable Integer sessionId) {
        HomePage homePage = homePageRepository.findAll().get(0);
        homePage.setSessionId(sessionId);

        JSONObject response = new JSONObject();
        response.put(Constant.RETURN_CODE, Constant.SUCCESS_CODE);
        response.put(Constant.RETURN_DESC, Constant.SUCCESS_DESC);
        return response.toJSONString();
    }

    /**
     * 获取所有拍卖专场
     *
     * @return
     */
    @RequestMapping(path = "/session", method = RequestMethod.GET)
    public BaseListResponse<Session> getSessions() {
        return new BaseListResponse<>(sessionRepository.findAll());
    }

    /**
     * 获取拍卖专场详情
     *
     * @param sessionId 专场ID
     * @return
     */
    @RequestMapping(path = "/session/{sessionId}", method = RequestMethod.GET)
    public SessionDetailResponse getSessionDetail(@PathVariable Integer sessionId) {
        SessionDetailResponse sessionDetailResponse = new SessionDetailResponse();
        sessionDetailResponse.setSession(sessionRepository.findOne(sessionId));
        sessionDetailResponse.setItems(goodsRepository.findAllBySessionId(sessionId));
        return sessionDetailResponse;
    }

    /**
     * 专场开拍提醒,现支持微信提醒
     *
     * @param sessionId 专场ID
     * @return
     */
    @RequestMapping(path = "/session/{sessionId}/action/remind")
    public String remindWhenAuctionBegin(@PathVariable Integer sessionId,
                                               HttpServletRequest request) {
        Integer userId = (Integer)request.getSession().getAttribute(Constant.USER_ID);

        SessionReminder sessionReminder = new SessionReminder();
        sessionReminder.setSessionId(sessionId);
        sessionReminder.setUserId(userId);
        sessionReminderRepository.save(sessionReminder);

        JSONObject response = new JSONObject();
        response.put(Constant.RETURN_CODE, Constant.SUCCESS_CODE);
        response.put(Constant.RETURN_DESC, Constant.SUCCESS_DESC);
        return response.toJSONString();
    }



    @RequestMapping(path = "/signUpSession")
    public void signUpSession(@RequestParam Integer userId,
                              @RequestParam String sessionId) {
        User user = userRepository.findOne(userId);
    }

    @RequestMapping(path = "/auction/goods/{goodsId}/price/{price}", method = RequestMethod.POST)
    public String auction(@PathVariable Integer goodsId, HttpServletRequest request,
                          @PathVariable Long price) {
        JSONObject response = new JSONObject();

        //Long price = Long.parseLong(requestParams.get("price"));
        //Assert.notNull(price);

        Goods goods = goodsRepository.findOne(goodsId);
        Long currentPrice = goods.getCurrentPrice();
        if (currentPrice >= price) {
            response.put("code", -1);
            response.put("message", "有人出价比你高！");
            response.put("price", goods.getCurrentPrice());
            return response.toJSONString();
        }

        Integer userId = (Integer) request.getSession().getAttribute(Constant.USER_ID);

        AuctionRecord auctionRecord = new AuctionRecord();
        auctionRecord.setUserId(userId);
        auctionRecord.setGoodsId(goodsId);
        auctionRecord.setPrice(price);
        auctionRecordRepository.save(auctionRecord);


        goods.setCurrentPrice(price);
        goods.setAuctionUserId(userId);
        goodsRepository.save(goods);

        //出价被超过提醒
        if (goods.getAuctionUserId() != userId) {
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

        response.put("code", 0);
        response.put("message", "成功");
        return response.toJSONString();
    }

    @RequestMapping(path = "/proxyAuction/goods/{goodsId}/price/{price}", method = RequestMethod.POST)
    public String proxyAuction(@PathVariable Integer goodsId, HttpServletRequest request,
                                   @PathVariable Long price) {

        JSONObject response = new JSONObject();

        Goods goods = goodsRepository.findOne(goodsId);
        Long currentPrice = goods.getCurrentPrice();
        if (currentPrice >= price) {
            response.put("code", -1);
            response.put("message", "有人出价比你高！");
            response.put("price", goods.getCurrentPrice());
            return response.toJSONString();
        }

        Integer userId = (Integer) request.getSession().getAttribute(Constant.USER_ID);

        goods.setCurrentPrice(goods.getCurrentPrice()+goods.getBidIncrement());
        goods.setAuctionUserId(userId);
        goodsRepository.save(goods);

        ProxyAuction proxyAuction = new ProxyAuction();
        proxyAuction.setUserId(userId);
        proxyAuction.setGoodsId(goodsId);
        proxyAuction.setPrice(price);
        proxyAuction.setStatus(ProxyAuction.UNDER_PROXY);
        proxyAuctionRepository.save(proxyAuction);

        response.put(Constant.RETURN_CODE, Constant.SUCCESS_CODE);
        response.put(Constant.RETURN_DESC, Constant.SUCCESS_DESC);
        return response.toJSONString();
    }

    @RequestMapping(path = "/auctionRecord/goods/{goodsId}")
    public BaseListResponse<AuctionRecord> getAuctionRecords(@PathVariable Integer goodsId) {
        List<AuctionRecord> auctionRecords = auctionRecordRepository.findAllByGoodsId(goodsId);
        return new BaseListResponse<>(auctionRecords);
    }

    @RequestMapping(path = "/order",method = RequestMethod.GET)
    public BaseListResponse<Order> getOrders(HttpServletRequest request){
        Integer userId = (Integer) request.getSession().getAttribute(Constant.USER_ID);
        List<Order> orders = orderRepository.findAllByUserId(userId);
        return new BaseListResponse<>(orders);
    }

    //TODO 修改url成restful 风格
    @RequestMapping(path = "/order/all",method = RequestMethod.GET)
    public BaseListResponse<Order> getUserOrder(){
        List<Order> allOrders = orderRepository.findAll();
        return new BaseListResponse<>(allOrders);
    }
}
