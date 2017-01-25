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
    private WxService wxService;
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
    private GoodsPicturesRepository goodsPicturesRepository;
    @Resource
    private AuctionRecordRepository auctionRecordRepository;

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
     * @param userId    用户ID
     * @return
     */
    @RequestMapping(path = "/remindWhenAuctionBegin")
    public BaseResponse remindWhenAuctionBegin(@RequestParam Integer sessionId,
                                               @RequestParam Integer userId) {
        //TODO 业务逻辑校验
        SessionReminder sessionReminder = new SessionReminder();
        sessionReminder.setSessionId(sessionId);
        sessionReminder.setUserId(userId);
        User user = userRepository.findOne(userId);
        sessionReminder.setOpenId(user.getOpenId());
        sessionReminderRepository.save(sessionReminder);
        return new BaseResponse();
    }

    /**
     * 获取商品详情
     *
     * @param goodsId 商品ID
     * @return
     */
    @RequestMapping(path = "/goods/{goodsId}")
    public GoodsResponse getGoods(@PathVariable Integer goodsId) {
        Goods one = goodsRepository.findOne(goodsId);
        Session session = sessionRepository.findOne(one.getSessionId());

        GoodsResponse goods = new GoodsResponse();
        goods.setId(one.getId());
        goods.setSessionId(one.getSessionId());
        goods.setBannerUrl(one.getBannerUrl());
        goods.setTitle(one.getTitle());
        goods.setBidCount(one.getBidCount());
        goods.setStartingPrice(one.getStartingPrice());
        goods.setHasCashDeposit(one.getHasCashDeposit());
        goods.setCashDeposit(one.getCashDeposit());
        goods.setBidIncrement(one.getBidIncrement());
        goods.setDelayCycle(one.getDelayCycle());
        goods.setCurrentPrice(one.getCurrentPrice());
        goods.setAuctionPic(one.getAuctionPic());
        goods.setShowPics(new LinkedList<String>());
        List<GoodsPictures> goodsShowPictures = goodsPicturesRepository.findAllByGoodsIdAndType(goodsId, GoodsPictures.SHOW_PIC);
        if (!CollectionUtils.isEmpty(goodsShowPictures)) {
            for (GoodsPictures goodsShowPicture : goodsShowPictures) {
                goods.getShowPics().add(goodsShowPicture.getRelativeUrl());
            }
        }
        /*goods.getShowPics().add("exampleImg/goodsShowExample1.jpg");
        goods.getShowPics().add("exampleImg/goodsShowExample2.jpg");
        goods.getShowPics().add("exampleImg/goodsShowExample3.jpg");*/
        goods.setDescPics(new LinkedList<String>());
        List<GoodsPictures> goodsDescPictures = goodsPicturesRepository.findAllByGoodsIdAndType(goodsId, GoodsPictures.DESC_PIC);
        for (GoodsPictures goodsDescPicture : goodsDescPictures) {
            goods.getDescPics().add(goodsDescPicture.getRelativeUrl());
        }
        //goods.getDescPics().add("exampleImg/goodsDescExample1.jpg");
        //goods.getDescPics().add("exampleImg/goodsDescExample2.jpg");
        goods.setSession(session);
        return goods;
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
    public JSONObject proxyAuction(@PathVariable Integer goodsId, HttpServletRequest request,
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
            return response;
        }

        Integer userId = (Integer) request.getSession().getAttribute(Constant.USER_ID);
        return response;
    }

    @RequestMapping(path = "/auctionRecord/goods/{goodsId}")
    public BaseListResponse<AuctionRecord> getAuctionRecords(@PathVariable Integer goodsId) {
        List<AuctionRecord> auctionRecords = auctionRecordRepository.findAllByGoodsId(goodsId);
        return new BaseListResponse<>(auctionRecords);
    }
}
