package dragode.auction.service.wx;

import org.springframework.stereotype.Service;

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
public class WxEventDefaultHandler implements WxEventHandler{
    @Override
    public String subscribe(String openId) {
        return "";
    }

    @Override
    public String unsubscribe(String openId) {
        return "";
    }
}
