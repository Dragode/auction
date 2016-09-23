package dragode.auction.service.wx;

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
 * @Title WxEventHandler
 * @Package dragode.auction.service.wx
 * <p/>
 * *****************************************
 * @Description
 * @date 2016/9/23 0023
 */
public interface WxEventHandler {

    //-------------------- Event --------------------
    /**
     * 用户订阅事件
     * @param openId 用户OpenId
     * @return 发送给用户的消息
     */
    String subscribe(String openId);

    /**
     * 用户取消订阅事件
     * @param openId 用户OpenId
     * @return 发送给用户的消息
     */
    String unsubscribe(String openId);
}
