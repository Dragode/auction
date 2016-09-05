package dragode.auction.controller;

import dragode.auction.controller.response.BaseListResponse;
import dragode.auction.controller.response.BaseResponse;
import dragode.auction.controller.response.SessionDetailResponse;
import dragode.auction.model.Goods;
import dragode.auction.model.Session;
import dragode.auction.model.SessionReminder;
import dragode.auction.model.User;
import dragode.auction.repository.SessionReminderRepository;
import dragode.auction.repository.SessionRepository;
import dragode.auction.repository.UserRepository;
import org.joda.time.DateTime;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@RestController
public class SessionController {

    @Resource
    private SessionRepository sessionRepository;
    @Resource
    private SessionReminderRepository sessionReminderRepository;
    @Resource
    private UserRepository userRepository;

    @RequestMapping(path = "/getSessions")
    public BaseListResponse<Session> getSessions() {
        return new BaseListResponse<>(sessionRepository.findAll());
    }

    @RequestMapping(path = "/getSessionDetail/{sessionId}")
    public SessionDetailResponse getSessionDetail(@PathVariable String sessionId) {
        SessionDetailResponse sessionDetailResponse = new SessionDetailResponse();
        Session session = new Session();
        session.setId(68635992);
        session.setTitle("拍卖专场详情-接口");
        session.setBannerUrl("exampleImg/sessionExample.jpg");
        session.setStartTime(new DateTime(2016, 2, 1, 8, 8).toDate());
        session.setEndTime(new DateTime(2016, 3, 11, 8, 8).toDate());
        session.setItemNum(88l);
        session.setBidCount(8l);
        session.setStatus(Session.WAITING);
        sessionDetailResponse.setSession(session);
        sessionDetailResponse.setItems(new ArrayList<Goods>());
        for (int i = 0; i < 10; i++) {
            Goods goods = new Goods();
            goods.setBannerUrl("exampleImg/goodsExample.jpg");
            goods.setTitle("商品详情-接口");
            goods.setBidCount((long) i);
            goods.setPrice((long) i * 100);
            sessionDetailResponse.getItems().add(goods);
        }
        return sessionDetailResponse;
    }

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

    @RequestMapping(path = "/getGoods/{goodsId}")
    public Goods getGoods(@PathVariable String goodsId) {
        Goods goods = new Goods();
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


    @RequestMapping(path = "/test")
    public void test() {
        List<Session> all = sessionRepository.findAll();
        for (Session session : all) {
            System.out.println(session.getTitle());
        }
    }
}
