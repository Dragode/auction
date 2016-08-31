package dragode.auction.controller.response;

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
 * @Title WxAccessResponse
 * @Package dragode.auction.controller.response
 * <p/>
 * *****************************************
 * @Description
 * @date 2016/8/31 0031
 */
public class WxAccessResponse {
    private String echostr;

    public WxAccessResponse(String echostr) {
        this.echostr = echostr;
    }

    public String getEchostr() {
        return echostr;
    }

    public void setEchostr(String echostr) {
        this.echostr = echostr;
    }
}
