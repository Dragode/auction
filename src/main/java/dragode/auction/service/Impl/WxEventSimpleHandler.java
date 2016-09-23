package dragode.auction.service.Impl;

import dragode.auction.service.wx.WxEventDefaultHandler;
import org.springframework.stereotype.Service;

import java.util.Date;

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
 * @Title WxEventSimpleHandler
 * @Package dragode.auction.service.wx
 * <p/>
 * *****************************************
 * @Description
 * @date 2016/9/23 0023
 */
@Service
public class WxEventSimpleHandler extends WxEventDefaultHandler{
    @Override
    public String subscribe(String openId) {
        String responseBody = "<xml>" +
                "<ToUserName><![CDATA[" + openId + "]]></ToUserName>" +
                "<FromUserName><![CDATA[gh_faf2a1bd43ca]]></FromUserName>" +
                "<CreateTime>" + new Date().getTime() + "</CreateTime>" +
                "<MsgType><![CDATA[text]]></MsgType>" +
                "<Content><![CDATA[关注回复消息测试]]></Content>" +
                "</xml>";
        return responseBody;
    }
}
