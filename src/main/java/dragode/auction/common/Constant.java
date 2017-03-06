package dragode.auction.common;

import dragode.auction.utils.constantUtil.LoadProperties;

import static dragode.auction.utils.FileUtils.getAbsolutePath;
import static dragode.auction.utils.constantUtil.ConstantUtil.getAsInteger;
import static dragode.auction.utils.constantUtil.ConstantUtil.getAsString;

@LoadProperties(files = {"/payment.properties", "/qCloudSms.properties","/config.properties"})
public class Constant {

    /**
     * response key
     */
    public static final String RETURN_CODE = "code";
    public static final String RETURN_DESC = "desc";

    /**
     * response value
     */
    public static final String SUCCESS_CODE = "0";
    public static final String SUCCESS_DESC = "success";

    /**
     * request.session keys
     */
    public static final String USER_ID = "USER_ID";
    public static final String MSG_CHECK_CODE = "MSG_CHECK_CODE";
    public static final String PHONE_NUMBER = "PHONE_NUMBER";

    /**
     * 前后端统一时间格式
     */
    public static final String DATE_PATTERN = "yyyy-MM-dd hh:mm:ss";

    public static final String PROJECT_HOST = getAsString("PROJECT_HOST");
    public static final String FRONT_URL = PROJECT_HOST + getAsString("FRONT_URL");
    public static final String BACK_URL = PROJECT_HOST + getAsString("BACK_URL");

    /**
     * 银联支付相关
     */
    public static final String UNIONPAY_TRANS_URL = getAsString("UNIONPAY_TRANS_URL");
    public static final String UNIONPAY_VERSION = getAsString("UNIONPAY_VERSION");
    public static final String UNIONPAY_ENCODING = getAsString("UNIONPAY_ENCODING");
    public static final String UNIONPAY_DATE_PATTERN = getAsString("UNIONPAY_DATE_PATTERN");
    public static final String UNIONPAY_MER_ID = getAsString("UNIONPAY_MER_ID");

    /**
     * 银联支付证书相关
     */
    /**
     * 证书使用模式(单证书/多证书)
     */
    public static final Boolean SINGLE_MODE = true;
    public static final String CER_RELATIVE_PATH = "/certs";
    public static final String CER_ABSOLUTE_PATH = getAbsolutePath(CER_RELATIVE_PATH);
    public static final String CER_SIGN_PATH = getAbsolutePath(CER_RELATIVE_PATH + "/sign.pfx");
    public static final String CER_SIGN_PWD = "000000";
    public static final String CER_SIGN_TYPE = "PKCS12";
    public static final String CER_ENCRYPT_PATH = getAbsolutePath(CER_RELATIVE_PATH + "/enc.cer");
    public static final String CER_ENCRYPT_TRACK_KEY_MODULUS = "";
    public static final String CER_ENCRYPT_TRACK_KEY_EXPONENT = "";
    public static final String CER_VALIDATE_DIR = CER_ABSOLUTE_PATH;

    /**
     * 腾讯云短信接口参数
     */
    public static final String QC_SMS_URL = getAsString("QC_SMS_URL");
    public static final Integer QC_SMS_SDK_APP_ID = getAsInteger("QC_SMS_SDK_APP_ID");
    public static final String QC_SMS_APP_KEY = getAsString("QC_SMS_APP_KEY");
    public static final Integer QC_SMS_VERIFICATION_CODE_SMS_TEMPLATE_ID = getAsInteger("QC_SMS_VERIFICATION_CODE_SMS_TEMPLATE_ID");

    public static final String PICS_PATH = getAsString("PICS_PATH");
}
