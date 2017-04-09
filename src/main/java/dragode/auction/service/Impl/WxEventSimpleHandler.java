package dragode.auction.service.Impl;

import dragode.auction.model.User;
import dragode.auction.service.wx.WxEventDefaultHandler;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;

/**
 *
 */
@Service
public class WxEventSimpleHandler extends WxEventDefaultHandler{

    @Resource
    private UserService userService;

    @Override
    public String subscribe(String openId) {
        //用户不存在，则新增用户；用户存在，则更新用户关注信息
        User userByOpenId = userService.findByOpenId(openId);
        if(null == userByOpenId){
            userByOpenId = new User(openId,true);
            userService.save(userByOpenId);
        }else if(!userByOpenId.getSubscribed()){
            userByOpenId.setSubscribed(true);
            userService.save(userByOpenId);
        }

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
