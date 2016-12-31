package dragode.wechat.intf;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import dragode.wechat.intf.response.OAuthAccessToken;
import dragode.wechat.intf.response.OAuthUserInfo;
import org.joda.time.DateTime;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import java.util.Map;

/**
 * 微信接口
 */
public class WxInterface {

    //TODO 改到配置文件
    private static final String APP_ID = "wxcecf87b6a40bda8f";
    private static final String SECRET = "14adfbebbc1fed16333271190309856b";
    private static final String WX_HOST = "https://api.weixin.qq.com";
    private static final String OAUTH_ACCESS_TOKE_URL = "/sns/oauth2/access_token?appid={appid}&secret={secret}&code={code}&grant_type=authorization_code";
    private static final String OAUTH_USER_INFO_URL = "/sns/userinfo?access_token={accessToken}&openid={openid}&lang={lang}";

    private static final String ZH_CN = "zh_CN";

    private static RestTemplate restTemplate = new RestTemplate();

    /**
     * access_token
     */
    private static String access_token;
    /**
     * access_token
     */
    private static String oauth_access_token;
    /**
     * access_token上次刷新时间
     */
    private static Date tokenLastFreshTime;
    /**
     * oauth_access_token上次刷新时间
     */
    private static Date oauthTokenExpiredTime;
    /**
     * access_token过期时间间隔
     * 2小时（7200000） - 网络延迟100秒（200000），等于7000000
     */
    private static long TOKEN_FRESH_INTERVAL = 7000000l;

    /**
     * 获取AccessToken
     *
     * @return AccessToken
     */
    public static String getAccessToken() {
        Date now = new Date();
        //未获取access_token，或access_token获取，则重新获取access_token
        if (StringUtils.isEmpty(access_token)
                || null == tokenLastFreshTime
                || tokenLastFreshTime.getTime() - now.getTime() > TOKEN_FRESH_INTERVAL) {
            String accessTokenUrl = WX_HOST + "/cgi-bin/access_token?grant_type=client_credential&appid={appid}&secret={secret}";
            String response = restTemplate.getForObject(accessTokenUrl, String.class, APP_ID, SECRET);
            JSONObject jsonObjectResponse = convertToJsonObject(response);
            //TODO 异常处理
            access_token = jsonObjectResponse.getString("access_token");
            tokenLastFreshTime = now;
        }
        return access_token;
    }

    /**
     * 获取网页授权AccessToken信息
     *
     * @param code code
     * @return AccessToken
     */
    public static OAuthAccessToken getOAuthAccessToken(String code) {
        OAuthAccessToken accessToken = restTemplate.getForObject(WX_HOST + OAUTH_ACCESS_TOKE_URL, OAuthAccessToken.class,
                APP_ID, SECRET, code);
        return accessToken;
    }

    /**
     * 获取网页授权用户信息
     * @param oAuthAccessToken 网页授权AccessToken
     * @return 用户信息
     */
    public static OAuthUserInfo getUserInfo(OAuthAccessToken oAuthAccessToken) {
        OAuthUserInfo userInfo = restTemplate.getForObject(WX_HOST + OAUTH_USER_INFO_URL, OAuthUserInfo.class,
                oAuthAccessToken.getAccess_token(), oAuthAccessToken.getOpenid(), ZH_CN);
        return userInfo;
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
        String templateMessageUrl = WX_HOST + "/cgi-bin/message/template/send?access_token={accessToken}";

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

    public static void main(String[] args) {
       /* String accessToken = getAccessToken();
        System.out.println(accessToken);*/
        DateTime dateTime = new DateTime(2016, 10, 1, 8, 0);
        DateTime dateTime2 = new DateTime(2016, 10, 1, 10, 0);
        long interval = dateTime2.toDate().getTime() - dateTime.toDate().getTime();
        System.out.println(interval);
    }
}
