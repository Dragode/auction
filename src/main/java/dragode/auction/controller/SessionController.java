package dragode.auction.controller;

import dragode.auction.common.Constant;
import dragode.auction.controller.request.AddSessionRequest;
import dragode.auction.controller.response.BaseListResponse;
import dragode.auction.model.*;
import dragode.auction.repository.*;
import dragode.wechat.intf.WxInterface;
import org.joda.time.DateTime;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * 拍卖专场接口
 */
@RestController
@RequestMapping(path = "/sessions")
public class SessionController {

    @Resource
    private SessionRepository sessionRepository;

    /**
     * 获取所有拍卖专场
     */
    @GetMapping(path = "")
    public BaseListResponse<Session> getAllSessions() {
        return new BaseListResponse<>(sessionRepository.findAll());
    }

    /**
     * 新增专场
     *
     * @param addSessionRequest
     * @return
     */
    @PostMapping(path = "")
    public Session addSession(@RequestBody AddSessionRequest addSessionRequest) {
        Session session = new Session();
        BeanUtils.copyProperties(addSessionRequest, session);
        session.setStatus(analyseSessionStatus(session));
        session.setNumberOfGoods(0);

        WxInterface.downloadMediaFile(addSessionRequest.getBannerPictureWxServerId(), Constant.PICS_PATH);
        session.setBannerUrl(Constant.PICTURE_CONTEXT_PATH + "/" + addSessionRequest.getBannerPictureWxServerId());
        session = sessionRepository.save(session);
        return session;
    }

    /**
     * 获取专场的状态
     * @param session 专场
     * @return 状态
     */
    private Integer analyseSessionStatus(Session session){
        DateTime startTime = new DateTime(session.getStartTime());
        DateTime endTime = new DateTime(session.getEndTime());
        if (startTime.isBeforeNow()) {
            return Session.WAITING;
        } else if (endTime.isBeforeNow()) {
            return Session.AUCTION;
        } else {
            return Session.DONE;
        }
    }
}
