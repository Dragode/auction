package dragode.auction.controller;

import dragode.auction.common.Constant;
import dragode.auction.controller.request.AddSessionRequest;
import dragode.auction.controller.response.BaseListResponse;
import dragode.auction.model.*;
import dragode.auction.repository.*;
import dragode.wechat.intf.WxInterface;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Date;

/**
 * 拍卖专场接口
 */
@RestController
@RequestMapping(path = "/sessions")
public class SessionController {

    private static Logger logger = LoggerFactory.getLogger(SessionController.class);

    public static final String HOME_BANNER_KEY = "HOME_BANNER_KEY";

    @Resource
    private SessionRepository sessionRepository;
    @Resource
    private SystemConfigRepository systemConfigRepository;

    /**
     * 获取首页Banner的图片地址
     *
     * @return
     */
    @RequestMapping(path = "/homeBanner", method = RequestMethod.GET)
    public SystemConfig getHomeBanner() {
        return systemConfigRepository.findByConfigKey(HOME_BANNER_KEY);
    }

    /**
     * 设置首页Banner的图片地址
     *
     * @param homeBannerWxServerId
     * @return
     */
    @RequestMapping(path = "/homeBanner", method = RequestMethod.POST)
    public SystemConfig setHomeBanner(@RequestBody String homeBannerWxServerId) {
        WxInterface.downloadMediaFile(homeBannerWxServerId, Constant.PICS_PATH);
        SystemConfig homeBanner = systemConfigRepository.findByConfigKey(HOME_BANNER_KEY);
        homeBanner.setValue(Constant.PICTURE_CONTEXT_PATH + "/" + homeBannerWxServerId);
        systemConfigRepository.save(homeBanner);
        return homeBanner;
    }

    /**
     * 获取所有拍卖专场
     *
     * @return
     */
    @RequestMapping(path = "", method = RequestMethod.GET)
    public BaseListResponse<Session> getSessions() {
        return new BaseListResponse<>(sessionRepository.findAll());
    }

    /**
     * 新增专场
     *
     * @param addSessionRequest
     * @return
     */
    @RequestMapping(path = "", method = RequestMethod.POST)
    public Session addSession(@RequestBody AddSessionRequest addSessionRequest) {
        Session session = new Session();
        BeanUtils.copyProperties(addSessionRequest, session);
        Date now = new Date();
        if (session.getStartTime().getTime() > now.getTime()) {
            session.setStatus(Session.WAITING);
        } else if (session.getEndTime().getTime() > now.getTime()) {
            session.setStatus(Session.AUCTION);
        } else {
            session.setStatus(Session.DONE);
        }
        session.setNumberOfGoods(0);

        WxInterface.downloadMediaFile(addSessionRequest.getBannerPictureWxServerId(), Constant.PICS_PATH);
        session.setBannerUrl(Constant.PICTURE_CONTEXT_PATH + "/" + addSessionRequest.getBannerPictureWxServerId());
        session = sessionRepository.save(session);
        return session;
    }
}
