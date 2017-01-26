package dragode.auction.utils;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

/**
 * 该项目特殊工具
 */
public class AuctionUtil {

    /**
     * 不弹出授权页面，直接跳转，只能获取用户openid
     */
    public static String SNSAPI_BASE_SCOPE = "snsapi_base";
    /**
     * 弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，即使在未关注的情况下，只要用户授权，也能获取其信息
     */
    public static String SNSAPI_USERINFO_SCOPE = "snsapi_userinfo";

    /**
     * https://open.weixin.qq.com/connect/oauth2/authorize?appid={appid}&redirect_uri={redirect_uri}&response_type=code&scope={scope}&state=STATE#wechat_redirect
     *
     * @return
     */
    public static String generateOauthUrl() {
        String oauthUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid={appid}&redirect_uri={redirect_uri}&response_type=code&scope={scope}#wechat_redirect";
        oauthUrl = oauthUrl.replace("{appid}", "wxcecf87b6a40bda8f");
        //String redirectUri = "http://www.ssspaimai.com/auctionList.html";
        String redirectUri = "http://www.ssspaimai.com/wx/redirectToAuctionList";
        try {
            oauthUrl = oauthUrl.replace("{redirect_uri}", URLEncoder.encode(redirectUri, "UTF-8"));
        } catch (UnsupportedEncodingException e) {
            System.out.println("Error occurred in url encode!");
            e.printStackTrace();
        }
        oauthUrl = oauthUrl.replace("{scope}", SNSAPI_BASE_SCOPE);
        System.out.println(oauthUrl);
        return oauthUrl;
    }


    public static void main(String[] args) {
        generateOauthUrl();
    }
}
