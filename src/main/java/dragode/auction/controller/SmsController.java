package dragode.auction.controller;

import com.alibaba.fastjson.JSONObject;
import dragode.auction.common.Constant;
import dragode.auction.service.Impl.TxSmsService;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

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

    @RequestMapping(value = "/sendVerificationCodeSms", method = RequestMethod.POST)
    public String sendValidateSms(@RequestParam String telephone,
                                  HttpServletRequest httpServletRequest) {
        //TODO 判断上次获取短信验证码是否超过60秒
        if (StringUtils.isBlank(telephone)) {
            throw new RuntimeException("telephone is required!");
        }

        String msgCheckCode = RandomStringUtils.randomNumeric(6);
        System.out.println(msgCheckCode);
        httpServletRequest.getSession().setAttribute(Constant.MSG_CHECK_CODE, msgCheckCode);

        JSONObject response = new JSONObject();
        response.put("success", true);
        return response.toJSONString();
    }

    @RequestMapping(path = "/validateCheckCode", method = RequestMethod.POST)
    public String validateCheckCode(@RequestParam String msgCheckCode,
                                    HttpServletRequest httpServletRequest) {
        if (StringUtils.isBlank(msgCheckCode)) {
            throw new RuntimeException("msgCheckCode is required!");
        }
        String rightCheckCode = (String) httpServletRequest.getSession().getAttribute(Constant.MSG_CHECK_CODE);
        //TODO 验证正确 更新用户信息

        JSONObject response = new JSONObject();
        response.put("success", StringUtils.equals(rightCheckCode, msgCheckCode));
        return response.toJSONString();
    }

}
