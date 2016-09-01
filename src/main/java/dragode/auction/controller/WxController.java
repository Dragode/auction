package dragode.auction.controller;

import com.alibaba.fastjson.JSONObject;
import dragode.auction.intf.TemplateMessage;
import dragode.auction.intf.WxInterface;
import dragode.auction.utils.HttpRequestPrinter;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;

/**
 * ******************************************
 * <p/>
 * Copyright 2016
 * NetDragon All rights reserved
 * <p/>
 * *****************************************
 * <p/>
 * *** Company ***
 * NetDragon
 * <p/>
 * *****************************************
 * <p/>
 * *** Team ***
 * SmartQ
 * <p/>
 * *****************************************
 *
 * @author 俞建龙(300116)
 * @version V1.0
 * @Title WxController
 * @Package dragode.auction.controller
 * <p/>
 * *****************************************
 * @Description
 * @date 2016/8/31 0031
 */
@RestController
public class WxController {

    /**
     * 接入微信开发者
     *
     * @param request Http请求
     * @return echostr
     */
    @RequestMapping(path = "/accessWx")
    public String accessWx(HttpServletRequest request) {
        System.out.println(HttpRequestPrinter.tranferRequestToString(request));

        //TODO 校验是否为微信的请求
        return request.getParameter("echostr");
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
        System.out.println(HttpRequestPrinter.tranferRequestToString(request));
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
    //TODO 移到service中
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
}
