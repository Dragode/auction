package dragode.wechat.service;

import dragode.auction.service.wx.WxEventHandler;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static dragode.auction.service.wx.WxMsgType.EVENT;
import static dragode.auction.service.wx.WxMsgType.SUBSCRIBE_EVENT;
import static dragode.auction.service.wx.WxMsgType.UNSUBSCRIBE_EVENT;

/**
 * 微信服务
 */
@Service
public class WxService {

    private static final Logger logger = LoggerFactory.getLogger(WxService.class);

    //TODO 从配置文件中获取微信接口校验方式
    /**
     * 微信接口校验模式，默认为明文模式
     */
    private static final ValidateType validateType = ValidateType.CLEAR_TEXT;

    @Autowired(required = false)
    private WxEventHandler wxEventHandler;

    /**
     * 校验微信接口有效性
     * @param signature 微信加密签名
     * @param timestamp 时间戳
     * @param nonce	随机数
     * @return 是否通过
     */
    public Boolean validateWxRequest(String signature,String timestamp, String nonce){

        switch (validateType) {
            case CLEAR_TEXT:
                return validateInClearText(signature,timestamp,nonce);
            case CIPHER_TEXT:
                return validateInCipherText(signature,timestamp,nonce);
            default:
                logger.error("未知加密类型[validateType="+validateType.toString()+"]，默认返回False。");
                return false;
        }
    }

    private Boolean validateInClearText(String signature,String timestamp, String nonce){
        //TODO 校验
        return true;
    }

    private Boolean validateInCipherText(String signature,String timestamp, String nonce){
        //TODO 校验
        return true;
    }

    /**
     * 接受微信推送消息
     * @param pushMessage 推送报文
     * @return 相应推送的报文
     */
    public String handleWxPush(String pushMessage){
        if (wxEventHandler != null) {
            Document document;
            try {
                document = org.dom4j.DocumentHelper.parseText(pushMessage);
            } catch (DocumentException e) {
                //TODO 处理异常
                throw new RuntimeException(e);
            }
            Element rootElement = document.getRootElement();
            String openId = rootElement.elementText("FromUserName");

            //判断消息类型
            String msgType = rootElement.elementText("MsgType");
            if (StringUtils.equals(msgType, EVENT)) {
                String event = rootElement.elementText("Event");
                if (StringUtils.equals(event, SUBSCRIBE_EVENT)) {
                    return wxEventHandler.subscribe(openId);
                } else if (StringUtils.equals(event, UNSUBSCRIBE_EVENT)) {
                    return wxEventHandler.unsubscribe(openId);
                } else {
                    logger.warn("Unknowing event:" + pushMessage);
                    return "";
                }
            } else {
                logger.warn("Unknowing MsgType:" + pushMessage);
                return "";
            }
        }

        //默认返回空字符串
        return "";
    }

    /**
     * 微信接口校验模式
     */
    enum ValidateType{
        /**
         * 明文模式
         */
        CLEAR_TEXT,
        /**
         * 安全模式
         */
        CIPHER_TEXT,
        ;
    }
}
