package dragode.auction.controller;

import dragode.auction.controller.response.BaseListResponse;
import dragode.auction.controller.response.BaseResponse;
import dragode.auction.controller.response.GoodsResponse;
import dragode.auction.controller.response.SessionDetailResponse;
import dragode.auction.model.*;
import dragode.auction.repository.*;
import dragode.auction.service.payment.SignService;
import dragode.auction.utils.Constants;
import dragode.auction.utils.HttpRequestUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
public class SessionController {

    private static Logger logger = LoggerFactory.getLogger(SessionController.class);

    @Resource
    private SessionRepository sessionRepository;
    @Resource
    private SessionReminderRepository sessionReminderRepository;
    @Resource
    private UserRepository userRepository;
    @Resource
    private GoodsRepository goodsRepository;
    @Resource
    private GoodsPicturesRepository goodsPicturesRepository;

    /**
     * 获取所有拍卖专场
     *
     * @return
     */
    @RequestMapping(path = "/getSessions")
    public BaseListResponse<Session> getSessions() {
        return new BaseListResponse<>(sessionRepository.findAll());
    }

    /**
     * 获取拍卖专场详情
     *
     * @param sessionId 专场ID
     * @return
     */
    @RequestMapping(path = "/getSessionDetail/{sessionId}")
    public SessionDetailResponse getSessionDetail(@PathVariable Integer sessionId) {
        SessionDetailResponse sessionDetailResponse = new SessionDetailResponse();
        sessionDetailResponse.setSession(sessionRepository.findOne(sessionId));
        sessionDetailResponse.setItems(goodsRepository.findAllBySessionId(sessionId));
        return sessionDetailResponse;
    }

    /**
     * 专场开拍提醒,现支持微信提醒
     *
     * @param sessionId 专场ID
     * @param userId    用户ID
     * @return
     */
    @RequestMapping(path = "/remindWhenAuctionBegin")
    public BaseResponse remindWhenAuctionBegin(@RequestParam Integer sessionId,
                                               @RequestParam Integer userId) {
        //TODO 业务逻辑校验
        SessionReminder sessionReminder = new SessionReminder();
        sessionReminder.setSessionId(sessionId);
        Session session = sessionRepository.findOne(sessionId);
        sessionReminder.setSessionStartTime(session.getStartTime());
        sessionReminder.setUserId(userId);
        User user = userRepository.findOne(userId);
        sessionReminder.setOpenId(user.getOpenId());
        sessionReminderRepository.save(sessionReminder);
        return new BaseResponse();
    }

    /**
     * 获取商品详情
     *
     * @param goodsId 商品ID
     * @return
     */
    @RequestMapping(path = "/getGoods/{goodsId}")
    public GoodsResponse getGoods(@PathVariable Integer goodsId) {
        Goods one = goodsRepository.findOne(goodsId);

        GoodsResponse goods = new GoodsResponse();
        goods.setId(one.getId());
        goods.setSessionId(one.getSessionId());
        goods.setBannerUrl(one.getBannerUrl());
        goods.setTitle(one.getTitle());
        goods.setBidCount(one.getBidCount());
        goods.setStartingPrice(one.getStartingPrice());
        goods.setCashDeposit(one.getCashDeposit());
        goods.setBidIncrement(one.getBidIncrement());
        goods.setPrice(one.getPrice());
        goods.setShowPics(new LinkedList<String>());
        List<GoodsPictures> goodsShowPictures = goodsPicturesRepository.findAllByGoodsIdAndType(goodsId, GoodsPictures.SHOW_PIC);
        if (!CollectionUtils.isEmpty(goodsShowPictures)) {
            for (GoodsPictures goodsShowPicture : goodsShowPictures) {
                goods.getShowPics().add(goodsShowPicture.getRelativeUrl());
            }
        }
        /*goods.getShowPics().add("exampleImg/goodsShowExample1.jpg");
        goods.getShowPics().add("exampleImg/goodsShowExample2.jpg");
        goods.getShowPics().add("exampleImg/goodsShowExample3.jpg");*/
        goods.setDescPics(new LinkedList<String>());
        List<GoodsPictures> goodsDescPictures = goodsPicturesRepository.findAllByGoodsIdAndType(goodsId, GoodsPictures.DESC_PIC);
        for (GoodsPictures goodsDescPicture : goodsDescPictures) {
            goods.getDescPics().add(goodsDescPicture.getRelativeUrl());
        }
        //goods.getDescPics().add("exampleImg/goodsDescExample1.jpg");
        //goods.getDescPics().add("exampleImg/goodsDescExample2.jpg");
        return goods;
    }

    @RequestMapping(path = "/signUpSession")
    public void signUpSession(@RequestParam Integer userId,
                              @RequestParam String sessionId){
        User user = userRepository.findOne(userId);
    }

    @RequestMapping(path = "/pay")
    public void pay(@RequestParam String merId,@RequestParam String money,
                    HttpServletResponse response) {
        Map<String, String> requestData = new HashMap<String, String>();

        /***银联全渠道系统，产品参数，除了encoding自行选择外其他不需修改***/
        requestData.put("version", Constants.version);   			  //版本号，全渠道默认值
        requestData.put("encoding", Constants.encoding_UTF8); 			  //字符集编码，可以使用UTF-8,GBK两种方式
        requestData.put("signMethod", "01");            			  //签名方法，只支持 01：RSA方式证书加密
        requestData.put("txnType", "01");               			  //交易类型 ，01：消费
        requestData.put("txnSubType", "01");            			  //交易子类型， 01：自助消费
        requestData.put("bizType", "000201");           			  //业务类型，B2C网关支付，手机wap支付
        requestData.put("channelType", "07");           			  //渠道类型，这个字段区分B2C网关支付和手机wap支付；07：PC,平板  08：手机

        /***商户接入参数***/
        requestData.put("merId", merId);    	          			  //商户号码，请改成自己申请的正式商户号或者open上注册得来的777测试商户号
        requestData.put("accessType", "0");             			  //接入类型，0：直连商户
        requestData.put("orderId",generateOrderId());             //商户订单号，8-40位数字字母，不能含“-”或“_”，可以自行定制规则
        requestData.put("txnTime", new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()));        //订单发送时间，取系统时间，格式为YYYYMMDDhhmmss，必须取当前时间，否则会报txnTime无效
        requestData.put("currencyCode", "156");         			  //交易币种（境内商户一般是156 人民币）
        requestData.put("txnAmt", money);             			      //交易金额，单位分，不要带小数点
        //requestData.put("reqReserved", "透传字段");        		      //请求方保留域，如需使用请启用即可；透传字段（可以实现商户自定义参数的追踪）本交易的后台通知,对本交易的交易状态查询交易、对账文件中均会原样返回，商户可以按需上传，长度为1-1024个字节

        //前台通知地址 （需设置为外网能访问 http https均可），支付成功后的页面 点击“返回商户”按钮的时候将异步通知报文post到该地址
        //如果想要实现过几秒中自动跳转回商户页面权限，需联系银联业务申请开通自动返回商户权限
        //异步通知参数详见open.unionpay.com帮助中心 下载  产品接口规范  网关支付产品接口规范 消费交易 商户通知
        requestData.put("frontUrl", Constants.frontUrl);

        //后台通知地址（需设置为【外网】能访问 http https均可），支付成功后银联会自动将异步通知报文post到商户上送的该地址，失败的交易银联不会发送后台通知
        //后台通知参数详见open.unionpay.com帮助中心 下载  产品接口规范  网关支付产品接口规范 消费交易 商户通知
        //注意:1.需设置为外网能访问，否则收不到通知    2.http https均可  3.收单后台通知后需要10秒内返回http200或302状态码
        //    4.如果银联通知服务器发送通知后10秒内未收到返回状态码或者应答码非http200，那么银联会间隔一段时间再次发送。总共发送5次，每次的间隔时间为0,1,2,4分钟。
        //    5.后台通知地址如果上送了带有？的参数，例如：http://abc/web?a=b&c=d 在后台通知处理程序验证签名之前需要编写逻辑将这些字段去掉再验签，否则将会验签失败
        requestData.put("backUrl", Constants.backUrl);

        /**请求参数设置完毕，以下对请求参数进行签名并生成html表单，将表单写入浏览器跳转打开银联页面**/
        Map<String, String> submitFromData = SignService.sign(requestData,Constants.encoding_UTF8);  //报文中certId,signature的值是在signData方法中获取并自动赋值的，只要证书配置正确即可。

        String requestFrontUrl = Constants.frontTransUrl;  //获取请求银联的前台地址：对应属性文件acp_sdk.properties文件中的acpsdk.frontTransUrl
        String html = SignService.createAutoFormHtml(requestFrontUrl, submitFromData,Constants.encoding_UTF8);   //生成自动跳转的Html表单

        logger.info("打印请求HTML，此为请求报文，为联调排查问题的依据："+html);
        try {
            response.getWriter().print(html);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private String generateOrderId() {
        return new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
    }

    @RequestMapping(path = "/receivePaySuccess")
    public void receivePaySuccess(HttpServletRequest request){
        logger.info("[Url = "+"/receivePaySuccess"+"]"+"[Method = " + request.getMethod() + "]" +
                "[Request = " + HttpRequestUtils.transferRequestToString(request) + "]");
    }
}
