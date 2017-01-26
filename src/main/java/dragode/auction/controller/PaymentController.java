package dragode.auction.controller;

import dragode.auction.model.Order;
import dragode.auction.service.payment.SignService;
import dragode.auction.utils.HttpRequestUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static dragode.auction.common.Constant.*;

/**
 * 支付接口
 */
@RestController
@RequestMapping(path = "/transaction")
public class PaymentController {
    private static Logger logger = LoggerFactory.getLogger(SessionController.class);

    @RequestMapping(path = "/pay")
    public void pay(@RequestParam Integer orderId,
                    HttpServletResponse response) {
        Order order = getOrder(orderId);
        String responseString = "";
        //TODO 暂不支持支付功能
        /*switch (order.getStatus()) {
            case PAYING:
                logger.info("支付中，继续支付");
            case PAY_FAILURE:
                logger.info("支付失败，继续支付");
            case WAIT_FOR_PAY:
                responseString = generatePayHtml(order);
                break;
            case PAY_SUCCESS:
                responseString = "已支付成功";
                break;
        }*/

        try {
            response.getWriter().print(responseString);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private String generatePayHtml(Order order) {
        Map<String, String> requestData = new HashMap<String, String>();

        /*
         * 银联全渠道系统，产品参数，除了encoding自行选择外其他不需修改
         */
        requestData.put("version", UNIONPAY_VERSION);      //版本号，全渠道默认值
        requestData.put("encoding", UNIONPAY_ENCODING);    //字符集编码，可以使用UTF-8,GBK两种方式
        requestData.put("signMethod", "01");               //签名方法，只支持 01：RSA方式证书加密
        requestData.put("txnType", "01");                  //交易类型 ，01：消费
        requestData.put("txnSubType", "01");               //交易子类型， 01：自助消费
        requestData.put("bizType", "000201");              //业务类型，B2C网关支付，手机wap支付
        requestData.put("channelType", "07");              //渠道类型，这个字段区分B2C网关支付和手机wap支付；07：PC,平板  08：手机

        /*
         * 商户接入参数
         */
        requestData.put("merId", UNIONPAY_MER_ID);              //商户号码，请改成自己申请的正式商户号或者open上注册得来的777测试商户号
        requestData.put("accessType", "0");                     //接入类型，0：直连商户
        requestData.put("txnTime", DateTime.now().toString(UNIONPAY_DATE_PATTERN));//订单发送时间，取系统时间，格式为YYYYMMDDhhmmss，必须取当前时间，否则会报txnTime无效
        requestData.put("currencyCode", "156");                 //交易币种（境内商户一般是156 人民币）
        //requestData.put("reqReserved", "透传字段");              //请求方保留域，如需使用请启用即可；透传字段（可以实现商户自定义参数的追踪）本交易的后台通知,对本交易的交易状态查询交易、对账文件中均会原样返回，商户可以按需上传，长度为1-1024个字节
        requestData.put("orderId", order.getDisplayId());   //商户订单号，8-40位数字字母，不能含“-”或“_”，可以自行定制规则
        requestData.put("txnAmt", order.getPriceInFenUnit());   //交易金额，单位分，不要带小数点
        requestData.put("frontUrl", FRONT_URL);
        requestData.put("backUrl", BACK_URL);

        /*
         * 请求参数设置完毕，以下对请求参数进行签名并生成html表单，将表单写入浏览器跳转打开银联页面
         */
        Map<String, String> submitFromData = SignService.sign(requestData, UNIONPAY_ENCODING);  //报文中certId,signature的值是在signData方法中获取并自动赋值的，只要证书配置正确即可。

        String html = SignService.createAutoFormHtml(UNIONPAY_TRANS_URL, submitFromData, UNIONPAY_ENCODING);

        logger.info("打印请求HTML，此为请求报文，为联调排查问题的依据：" + html);
        return html;
    }

    private Order getOrder(Integer orderId) {
        Order order = new Order();
        order.setId(1);
        order.setDisplayId(generateOrderDisplayId());
        order.setPrice(1l);
        //TODO 暂不支持支付功能
        //order.setStatus(Order.OrderStatus.WAIT_FOR_PAY);
        return order;
    }

    private String generateOrderDisplayId() {
        String dateString = DateTime.now().toString("yyyyMMddHHmmss");
        String random = RandomStringUtils.randomNumeric(4);
        return dateString + random;
    }

    //3.收单后台通知后需要10秒内返回http200或302状态码
    //4.如果银联通知服务器发送通知后10秒内未收到返回状态码或者应答码非http200，那么银联会间隔一段时间再次发送。总共发送5次，每次的间隔时间为0,1,2,4分钟。
    //5.后台通知地址如果上送了带有？的参数，例如：http://abc/web?a=b&c=d 在后台通知处理程序验证签名之前需要编写逻辑将这些字段去掉再验签，否则将会验签失败
    @RequestMapping(path = "/receivePaySuccess")
    public void receivePaySuccess(HttpServletRequest request) {
        logger.info("[Url = " + "/receivePaySuccess" + "]" + "[Method = " + request.getMethod() + "]" +
                "[Request = " + HttpRequestUtils.transferRequestToString(request) + "]");
    }
}
