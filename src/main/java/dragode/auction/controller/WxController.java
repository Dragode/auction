package dragode.auction.controller;

import com.alibaba.fastjson.JSON;
import dragode.auction.common.Constant;
import dragode.auction.model.User;
import dragode.auction.service.Impl.UserService;
import dragode.auction.utils.AuctionUtil;
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
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
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
    private UserService userService;

    /**
     * 接入微信开发者
     *
     * @param request Http请求
     * @return echostr
     */
    @RequestMapping(path = "/receiveWxPush", method = RequestMethod.GET)
    public String accessWx(@RequestParam String signature, @RequestParam String timestamp,
                           @RequestParam String nonce, @RequestParam String echostr,
                           @RequestParam Map<String, String> requestParams,
                           HttpServletRequest request) throws Exception {
        logRequestIfDebug(request);

        logger.info("echostr=" + echostr);
        if (wxService.validateWxRequest(signature, timestamp, nonce)) {
            return echostr;
        } else {
            return "";
        }
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

    /**
     * 微信网页授权后，跳转到特定页面
     *
     * @param code
     * @param state
     * @param request
     * @param response
     */
    @RequestMapping(path = "/redirectToHtml")
    public void redirectToHtml(@RequestParam String code, @RequestParam String state,
                               HttpServletRequest request, HttpServletResponse response) {
        logRequestIfDebug(request);

        if (StringUtils.isEmpty(code)) {
            //TODO 优化
            logger.error("code param is empty，or user have not authorized.");
            PrintWriter writer = null;
            try {
                writer = response.getWriter();
            } catch (IOException e) {
                e.printStackTrace();
            }
            writer.write("请授权！");
            writer.flush();
        } else {
            String openId = null;
            try {
                openId = wxService.getOpenId(code);
            } catch (Exception e) {
                logger.error("Error occurred in get openId.", e);
                return;
            }
            User user = userService.findByOpenId(openId);
            if (user == null) {
                userService.addUser(openId, false);
            }
            HttpSession session = request.getSession();
            session.setAttribute(Constant.USER_ID, user.getId());
            try {
                response.sendRedirect("/" + state + ".html");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private void logRequestIfDebug(HttpServletRequest request) {
        logger.info("[Method = " + request.getMethod() + "]" +
                "[Request = " + HttpRequestUtils.transferRequestToString(request) + "]");
    }

    /**
     * 重定向到微信授权页面
     * @param status
     * @param response
     */
    @RequestMapping(path = "/redirectToWxOauth/{status}")
    public void oauthRedirect(@PathVariable String status,
                              HttpServletResponse response){
        String url = AuctionUtil.generateOauthUrl(status);
        try {
            response.sendRedirect(url);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 获取微信js-sdk config
     * @param request
     * @return
     */
    @RequestMapping(path = "/jssdk/config",method = RequestMethod.GET)
    public String getJsSdkConfig(HttpServletRequest request){
        String requestUrl = request.getHeader("Referer");
        Map<String, String> jsSdkConfig = wxService.getJsSdkConfig(requestUrl);
        return JSON.toJSONString(jsSdkConfig);
    }
}
