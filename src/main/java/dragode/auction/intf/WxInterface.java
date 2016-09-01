package dragode.auction.intf;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

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
 * @Title WxInterface
 * @Package dragode.auction.intf
 * <p/>
 * *****************************************
 * @Description
 * @date 2016/9/1 0001
 */
public class WxInterface {

    private static String APP_ID = "wxcecf87b6a40bda8f";
    private static String SECRET = "14adfbebbc1fed16333271190309856b";
    private static RestTemplate restTemplate = new RestTemplate();

    /**
     * 获取AccessToken
     *
     * @return AccessToken
     */
    //TODO 自动刷新
    public static String getAccessToken() {
        String accessTokenUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={appid}&secret={secret}";
        String response = restTemplate.getForObject(accessTokenUrl, String.class, APP_ID, SECRET);
        JSONObject jsonObjectResponse = convertToJsonObject(response);
        return jsonObjectResponse.getString("access_token");
    }

    /**
     * 获取网页授权AccessToken信息
     *
     * @param code code
     * @return AccessToken
     */
    public static JSONObject getOAuthAccessToken(String code) {
        String accessTokenUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?appid={appid}&secret={secret}&code={code}&grant_type=authorization_code";
        HashMap<Object, String> requestParams = new HashMap<>();
        requestParams.put("appid", APP_ID);
        requestParams.put("secret", SECRET);
        requestParams.put("code", code);
        String response = restTemplate.getForObject(accessTokenUrl, String.class, APP_ID, SECRET, code);
        return convertToJsonObject(response);
    }

    /**
     * 发送模板消息
     *
     * @param templateId
     * @param openId
     * @param topColor
     * @param url
     * @param params
     */
    public static void sendTemplateMessage(String templateId, String openId, String topColor, String url,
                                           Map<String, TemplateMessage.DataItem> params) {
        String templateMessageUrl = "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token={accessToken}";

        TemplateMessage templateMessage = new TemplateMessage();
        templateMessage.setTouser(openId);
        templateMessage.setTemplate_id(templateId);
        templateMessage.setTopcolor(topColor);
        templateMessage.setUrl(url);
        templateMessage.setData(params);
        String requestBody = JSON.toJSONString(templateMessage);

        String response = restTemplate.postForObject(templateMessageUrl, requestBody, String.class, getAccessToken());
        //{"errcode":0,"errmsg":"ok","msgid":418493294} response
        System.out.println(response);
    }

    private static JSONObject convertToJsonObject(String jsonText) {
        Object parse = JSON.parse(jsonText);
        if (!(parse instanceof JSONObject)) {
            throw new RuntimeException("jsonText can not convert to JSONObject");
        }
        return (JSONObject) parse;
    }
}
