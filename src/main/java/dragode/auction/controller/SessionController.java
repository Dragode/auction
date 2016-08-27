package dragode.auction.controller;

import dragode.auction.controller.response.BaseListResponse;
import dragode.auction.controller.response.SessionDetailResponse;
import dragode.auction.model.Goods;
import dragode.auction.model.Session;
import org.joda.time.DateTime;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class SessionController {

    @RequestMapping(path = "/getSessions")
    public BaseListResponse<Session> getSessions() {
        BaseListResponse<Session> response = new BaseListResponse<>();
        List<Session> items = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            Session session = new Session();
            session.setId("68635992");
            session.setTitle("拍卖专场标题-接口");
            session.setBannerUrl("exampleImg/sessionExample.jpg");
            session.setStartTime(new DateTime(2016, 10, 1, 8, 8).toDate());
            session.setEndTime(new DateTime(2016, 11, 11, 8, 8).toDate());
            session.setItemNum(88l);
            session.setBidCount((long) i);
            session.setStatus(Session.WAITING);

            items.add(session);
        }
        response.setItems(items);
        return response;
    }

    @RequestMapping(path = "/getSessionDetail/{sessionId}")
    public SessionDetailResponse getSessionDetail(@PathVariable String sessionId) {
        SessionDetailResponse sessionDetailResponse = new SessionDetailResponse();
        Session session = new Session();
        session.setId("68635992");
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
}
