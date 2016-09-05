package dragode.auction.controller;

import dragode.auction.controller.response.BaseListResponse;
import dragode.auction.controller.response.BaseResponse;
import dragode.auction.controller.response.GoodsResponse;
import dragode.auction.controller.response.SessionDetailResponse;
import dragode.auction.model.Goods;
import dragode.auction.model.Session;
import dragode.auction.model.SessionReminder;
import dragode.auction.model.User;
import dragode.auction.repository.GoodsRepository;
import dragode.auction.repository.SessionReminderRepository;
import dragode.auction.repository.SessionRepository;
import dragode.auction.repository.UserRepository;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.LinkedList;

@RestController
public class SessionController {

    @Resource
    private SessionRepository sessionRepository;
    @Resource
    private SessionReminderRepository sessionReminderRepository;
    @Resource
    private UserRepository userRepository;
    @Resource
    private GoodsRepository goodsRepository;

    /**
     * 获取所有拍卖专场
     *
     * @return
     */
    @RequestMapping(path = "/getSessions")
    public BaseListResponse<Session> getSessions() {
        return new BaseListResponse<>(sessionRepository.findAll());
    }

    /**
     * 获取拍卖专场详情
     *
     * @param sessionId 专场ID
     * @return
     */
    @RequestMapping(path = "/getSessionDetail/{sessionId}")
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
        goods.setBannerUrl("exampleImg/goodsExample.jpg");
        goods.setTitle("商品详情-接口");
        goods.setBidCount((long) 88);
        goods.setPrice((long) 88888);
        goods.setShowPics(new LinkedList<String>());
        goods.getShowPics().add("exampleImg/goodsShowExample1.jpg");
        goods.getShowPics().add("exampleImg/goodsShowExample2.jpg");
        goods.getShowPics().add("exampleImg/goodsShowExample3.jpg");
        goods.setDescPics(new LinkedList<String>());
        goods.getDescPics().add("exampleImg/goodsDescExample1.jpg");
        goods.getDescPics().add("exampleImg/goodsDescExample2.jpg");
        return goods;
    }
}
