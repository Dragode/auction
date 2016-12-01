package dragode.auction.service.Impl;


import dragode.auction.intf.QCloudSmsInterface;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

import static dragode.auction.common.Constant.*;
import static dragode.auction.intf.QCloudSmsInterface.SmsType;

@Service
public class TxSmsService {

    private QCloudSmsInterface qCloudSmsIntf = null;

    private static String CHINA_NATION_CODE = "86";
    private static Integer VERIFICATION_CODE_SMS_TEMPLATE_ID = QC_SMS_VERIFICATION_CODE_SMS_TEMPLATE_ID;

    public TxSmsService() {
        qCloudSmsIntf = new QCloudSmsInterface(QC_SMS_SDK_APP_ID, QC_SMS_APP_KEY);
    }

    /**
     * 发送验证码短信
     *
     * @param phoneNumber 接收验证码的手机号
     */
    public Boolean sendVerificationCodeSms(String phoneNumber) {
        return sendVerificationCodeSms(Arrays.asList(phoneNumber));
    }

    /**
     * 群发发送验证码短信
     *
     * @param phoneNumbers 接收验证码的手机号列表
     */
    public Boolean sendVerificationCodeSms(List<String> phoneNumbers) {
        String response = qCloudSmsIntf.sendMsgByTemplate(CHINA_NATION_CODE, phoneNumbers, SmsType.NORMAL,
                VERIFICATION_CODE_SMS_TEMPLATE_ID, Arrays.asList(generateVerificationCode()));
        if (StringUtils.isEmpty(response)) {
            return false;
        } else {
            return true;
        }
    }

    private String generateVerificationCode() {
        return RandomStringUtils.randomNumeric(6);
    }
}


