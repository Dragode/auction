package dragode.auction.controller;

import dragode.auction.controller.response.BaseListResponse;
import dragode.auction.model.Session;
import org.joda.time.DateTime;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

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
            session.setBannerUrl("//img.alicdn.com/bao/uploaded/i1/2738770841/TB24oddtXXXXXXhXpXXXXXXXXXX_!!0-paimai.jpg_600x600q75s150.jpg_.webp");
            session.setStartTime(new DateTime(2016, 10, 1, 8, 8).toDate());
            session.setEndTime(new DateTime(2016, 11, 11, 8, 8).toDate());
            session.setItemNum(88l);
            session.setBidCount(8l);
            session.setStatus(Session.WAITING);

            items.add(session);
        }
        response.setItems(items);
        return response;
    }
}
