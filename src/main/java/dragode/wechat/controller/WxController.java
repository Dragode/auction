package dragode.wechat.controller;

import com.alibaba.fastjson.JSONObject;
import dragode.auction.model.User;
import dragode.auction.repository.UserRepository;
import dragode.auction.utils.HttpRequestUtils;
import dragode.wechat.intf.TemplateMessage;
import dragode.wechat.intf.WxInterface;
import dragode.wechat.service.WxService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


/**
 * 微信对接接口
 */
@RestController
@RequestMapping(path = "/wx")
public class WxController {

    private static Logger logger = LoggerFactory.getLogger(WxController.class);

    @Resource
    private WxService wxService;

    @Resource
    private UserRepository userRepository;


    /**
     * 接入微信开发者
     *
     * @param request Http请求
     * @return echostr
     */
    @RequestMapping(path = "/receiveWxPush", method = RequestMethod.GET)
    public String accessWx(@RequestParam String signature, @RequestParam String timestamp,
                           @RequestParam String nonce, @RequestParam String echostr,
                           @RequestParam Map<String,String> requestParams,
                           HttpServletRequest request) throws Exception {
        logRequestIfDebug(request);

        //TODO 校验是否为微信的请求
        logger.info("echostr=" + echostr);
        if (wxService.validateWxRequest(signature,timestamp,nonce)) {
            return echostr;
        }else {
            return "";
        }
    }

    private void logRequestIfDebug(HttpServletRequest request) {
        logger.info("[Method = " + request.getMethod() + "]" +
                "[Request = " + HttpRequestUtils.transferRequestToString(request) + "]");
    }

    /**
     * 接受微信消息推送
     *
     * @param request Http请求
     * @return 返回给用户的消息
     */
    @RequestMapping(path = "/receiveWxPush", method = RequestMethod.POST)
    public String receiveWxPush(HttpServletRequest request, @RequestBody String postBody) {
        logRequestIfDebug(request);
        logger.info("[postBody = " + postBody + "]");

        //TODO 校验是否为微信的请求？

        //默认返回空字符串
        return wxService.handleWxPush(postBody);
    }

    /**
     * 微信网页授权接口
     *
     * @param request Http请求
     */
    @RequestMapping(path = "/wxOauth2",method = RequestMethod.GET)
    public void wxOauth2(@RequestParam String code,@RequestParam String state,
                         HttpServletRequest request, HttpServletResponse response) {
        logRequestIfDebug(request);

        if (StringUtils.isEmpty(code)) {
            //TODO 用户不同意授权
        }else {
            //用户同意授权
            String openId = getOpenId(code);
            logger.info("openId=" + openId);
            try {
                response.sendRedirect("/auctionList.html");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 获取openid
     *
     * @param code code
     * @return openid
     */
    private String getOpenId(String code) {
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

    //TODO 重构
    @RequestMapping(path = "/redirectToAuctionList")
    public void redirectToAuctionList(@RequestParam String code,@RequestParam String state,
                                      HttpServletRequest request, HttpServletResponse response) {
        String openId = getOpenId(code);
        User user = userRepository.findByOpenId(openId);
        try {
            response.sendRedirect("/auctionList.html?userId=" + user.getId());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
