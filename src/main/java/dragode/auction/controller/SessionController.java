package dragode.auction.controller;

import dragode.auction.controller.response.BaseListResponse;
import dragode.auction.controller.response.BaseResponse;
import dragode.auction.controller.response.GoodsResponse;
import dragode.auction.controller.response.SessionDetailResponse;
import dragode.auction.model.*;
import dragode.auction.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
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
    private GoodsPicturesRepository goodsPicturesRepository;

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
        Session session = sessionRepository.findOne(sessionId);
        sessionReminder.setSessionStartTime(session.getStartTime());
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
    @RequestMapping(path = "/getGoods/{goodsId}")
    public GoodsResponse getGoods(@PathVariable Integer goodsId) {
        Goods one = goodsRepository.findOne(goodsId);

        GoodsResponse goods = new GoodsResponse();
        goods.setId(one.getId());
        goods.setSessionId(one.getSessionId());
        goods.setBannerUrl(one.getBannerUrl());
        goods.setTitle(one.getTitle());
        goods.setBidCount(one.getBidCount());
        goods.setStartingPrice(one.getStartingPrice());
        goods.setCashDeposit(one.getCashDeposit());
        goods.setBidIncrement(one.getBidIncrement());
        goods.setPrice(one.getPrice());
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
        return goods;
    }

    @RequestMapping(path = "/signUpSession")
    public void signUpSession(@RequestParam Integer userId,
                              @RequestParam String sessionId) {
        User user = userRepository.findOne(userId);
    }


}
