package dragode.auction.service.Impl;

import dragode.auction.service.wx.WxEventDefaultHandler;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 *
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
