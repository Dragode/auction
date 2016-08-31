package dragode.auction.controller;

import dragode.auction.controller.response.WxAccessResponse;
import dragode.auction.utils.HttpRequestPrinter;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

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

    @RequestMapping(path = "/accessWx")
    public String accessWx(HttpServletRequest request) {
        //TODO 校验是否为微信的请求
        String echostr = request.getParameter("echostr");
        System.out.println(HttpRequestPrinter.tranferRequestToString(request));
        //return new WxAccessResponse(echostr);
        return echostr;
    }

    @RequestMapping(path = "/wxOauth2")
    public String wxOauth2(HttpServletRequest request) {
        String code = request.getParameter("code");


        System.out.println(HttpRequestPrinter.tranferRequestToString(request));
        return code;
    }
}
