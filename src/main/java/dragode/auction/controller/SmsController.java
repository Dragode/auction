package dragode.auction.controller;

import com.alibaba.fastjson.JSONObject;
import dragode.auction.common.Constant;
import dragode.auction.model.User;
import dragode.auction.repository.UserRepository;
import dragode.auction.service.Impl.TxSmsService;
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
    @Resource
    private UserRepository userRepository;

    @RequestMapping(value = "/sendVerificationCodeSms/{telephone}", method = RequestMethod.GET)
    public String sendVerificationCodeSms(@PathVariable String telephone) {
        JSONObject response = new JSONObject();
        String verificationCode = txSmsService.sendVerificationCodeSms(telephone);
        response.put("success", StringUtils.isNotBlank(verificationCode));
        return response.toJSONString();
    }

    /**
     * 发送短信验证码
     *
     * @param telephone          手机号
     * @param httpServletRequest Http请求
     */
    @RequestMapping(value = "/sendVerificationCodeSms", method = RequestMethod.POST)
    public String sendValidateSms(@RequestParam String telephone,
                                  HttpServletRequest httpServletRequest) {
        //TODO 判断上次获取短信验证码是否超过60秒
        if (StringUtils.isBlank(telephone)) {
            throw new RuntimeException("telephone is required!");
        }
        Integer userId = (Integer) httpServletRequest.getSession().getAttribute(Constant.USER_ID);
        if (null == userId) {
            throw new RuntimeException("User not login!");
        }

        String verificationCode = txSmsService.sendVerificationCodeSms(telephone);
        Boolean sendSuccess = false;
        if (StringUtils.isNotBlank(verificationCode)) {
            httpServletRequest.getSession().setAttribute(Constant.MSG_CHECK_CODE, verificationCode);
            httpServletRequest.getSession().setAttribute(Constant.PHONE_NUMBER, telephone);
            sendSuccess = true;
        }

        JSONObject response = new JSONObject();
        response.put("success", sendSuccess);
        return response.toJSONString();
    }

    /**
     * 验证短信验证码
     *
     * @param msgCheckCode       待验证的短信验证码
     * @param httpServletRequest Http请求
     */
    @RequestMapping(path = "/validateCheckCode", method = RequestMethod.POST)
    public String validateCheckCode(@RequestParam String msgCheckCode,
                                    HttpServletRequest httpServletRequest) {
        if (StringUtils.isBlank(msgCheckCode)) {
            throw new RuntimeException("msgCheckCode is required!");
        }
        Integer userId = (Integer) httpServletRequest.getSession().getAttribute(Constant.USER_ID);
        if (null == userId) {
            throw new RuntimeException("User not login!");
        }

        String rightCheckCode = (String) httpServletRequest.getSession().getAttribute(Constant.MSG_CHECK_CODE);
        Boolean validated = false;
        if (StringUtils.equals(rightCheckCode, msgCheckCode)) {
            validated = true;
            User user = userRepository.findOne(userId);
            String telephone = (String) httpServletRequest.getSession().getAttribute(Constant.PHONE_NUMBER);
            if (StringUtils.isBlank(telephone)) {
                throw new RuntimeException("telephone can not find in session!");
            }
            user.setPhoneNumber(telephone);
            userRepository.save(user);
            httpServletRequest.getSession().removeAttribute(Constant.MSG_CHECK_CODE);
            httpServletRequest.getSession().removeAttribute(Constant.PHONE_NUMBER);
        }

        JSONObject response = new JSONObject();
        response.put("success", validated);
        return response.toJSONString();
    }

}
