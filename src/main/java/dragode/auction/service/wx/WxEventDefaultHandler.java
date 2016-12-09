package dragode.auction.service.wx;

import org.springframework.stereotype.Service;

/**
 *
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
