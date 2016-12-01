package dragode.auction.controller;

import com.alibaba.fastjson.JSONObject;
import dragode.auction.service.Impl.TxSmsService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * 短信接口
 */
@RestController
@RequestMapping("/sms")
public class SmsController {

    @Resource
    private TxSmsService txSmsService;

    @RequestMapping(value = "/sendVerificationCodeSms/{telephone}", method = RequestMethod.GET)
    public String sendVerificationCodeSms(@PathVariable String telephone) {
        JSONObject response = new JSONObject();
        Boolean result = txSmsService.sendVerificationCodeSms(telephone);
        response.put("success", result);
        return response.toJSONString();
    }
}
