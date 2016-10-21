package dragode.auction.controller;

import com.alibaba.fastjson.JSONObject;
import dragode.auction.intf.TemplateMessage;
import dragode.auction.intf.WxInterface;
import dragode.auction.model.User;
import dragode.auction.repository.UserRepository;
import dragode.auction.service.wx.WxEventHandler;
import dragode.auction.utils.HttpRequestUtils;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;

import static dragode.auction.service.wx.WxMsgType.*;

/**
 * 微信Controller
 */
@RestController
@RequestMapping(path = "/wx")
public class WxController {
    private static Logger logger = LoggerFactory.getLogger(WxController.class);

    @Resource
    private UserRepository userRepository;

    @Autowired(required = false)
    private WxEventHandler wxEventHandler;

    private void logRequestIfDebug(HttpServletRequest request) {
        logger.info("[Method = " + request.getMethod() + "]" +
                "[Request = " + HttpRequestUtils.transferRequestToString(request) + "]");
    }

    /**
     * 接入微信开发者
     *
     * @param request Http请求
     * @return echostr
     */
    @RequestMapping(path = "/receiveWxPush", method = RequestMethod.GET)
    public String accessWx(HttpServletRequest request) throws Exception {
        logRequestIfDebug(request);

        //TODO 校验是否为微信的请求

        String echostr = request.getParameter("echostr");
        logger.info("echostr=" + echostr);
        return echostr;
    }

    /**
     * 接受微信消息推送
     *
     * @param request Http请求
     * @return 返回给用户的消息
     */
    @RequestMapping(path = "/receiveWxPush", method = RequestMethod.POST)
    //TODO 有的请求是Json DTO，有的请求是Xml DTO，SpringMVC要怎么设置
    public String receiveWxPush(HttpServletRequest request) {
        logRequestIfDebug(request);

        //TODO 校验是否为微信的请求

        String postBody = HttpRequestUtils.retrievePostBody(request);
        logger.info("[postBody = " + postBody + "]");

        //解析XMl
        if (wxEventHandler != null) {
            Document document;
            try {
                document = org.dom4j.DocumentHelper.parseText(postBody);
            } catch (DocumentException e) {
                //TODO 处理异常
                throw new RuntimeException(e);
            }
            Element rootElement = document.getRootElement();
            String openId = rootElement.elementText("FromUserName");

            //判断消息类型
            String msgType = rootElement.elementText("MsgType");
            if (StringUtils.equals(msgType, EVENT)) {
                String event = rootElement.elementText("Event");
                if (StringUtils.equals(event, SUBSCRIBE_EVENT)) {
                    return wxEventHandler.subscribe(openId);
                } else if (StringUtils.equals(event, UNSUBSCRIBE_EVENT)) {
                    return wxEventHandler.unsubscribe(openId);
                } else {
                    logger.warn("Unknowing event:" + postBody);
                    return "";
                }
            } else {
                logger.warn("Unknowing MsgType:" + postBody);
                return "";
            }
        }

        //默认返回空字符串
        return "";
    }


    /**
     * 微信网页授权接口
     * <br>用来测试接口
     *
     * @param request Http请求
     * @return openid
     */
    @RequestMapping(path = "/wxOauth2")
    public void wxOauth2(HttpServletRequest request, HttpServletResponse response) {
        System.out.println(HttpRequestUtils.transferRequestToString(request));
        String state = request.getParameter("state");//回传参数state

        String openId = getAndCacheOpenId(request);
        System.out.println("openId=" + openId);
        try {
            response.sendRedirect("/auctionList.html");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 获取openid，并保存到session中
     *
     * @param request Http请求
     * @return openid
     */
    private String getAndCacheOpenId(HttpServletRequest request) {
        String openId = getOpenId(request);
        request.getSession().setAttribute("openid", openId);
        return openId;
    }

    /**
     * 获取openid
     *
     * @param request Http请求
     * @return openid
     */
    //TODO 移到service中
    private String getOpenId(HttpServletRequest request) {
        String code = request.getParameter("code");
        if (StringUtils.isEmpty(code)) {
            throw new RuntimeException("Code required in request params.");
        }

        JSONObject accessTokenResponse = WxInterface.getOAuthAccessToken(code);
        if (accessTokenResponse == null
                || !accessTokenResponse.containsKey("openid")) {
            throw new RuntimeException("Response does not contains openid.");
        }
        return accessTokenResponse.getString("openid");
    }

    /**
     * 发送模板消息
     *
     * @return
     */
    @RequestMapping(path = "/sendTemplateMessage")
    public String sendTemplateMessage() {
        String templateId = "ADHrbX8R1mB736XPDyT9HNxD4-3EIhqE--2go8YrVlA";
        String openId = "o7xGLxE6jdOiF0LRoAlZyWNQZKQc";
        String topcolor = "#FF0000";
        String url = "http://119.29.159.58/auctionList.html";
        HashMap<String, TemplateMessage.DataItem> stringDataItemHashMap = new HashMap<>();
        TemplateMessage.DataItem name = new TemplateMessage.DataItem();
        name.setValue("nameToSet");
        name.setColor("#173177");
        stringDataItemHashMap.put("name", name);
        WxInterface.sendTemplateMessage(templateId, openId, topcolor, url, stringDataItemHashMap);
        return "sended";
    }

    @RequestMapping(path = "/redirectToAuctionList")
    public void redirectToAuctionList(HttpServletRequest request, HttpServletResponse response) {
        String openId = getAndCacheOpenId(request);
        User user = userRepository.findByOpenId(openId);
        try {
            response.sendRedirect("/auctionList.html?userId=" + user.getId());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
