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
     * 腾讯云短信接口参数
     */
    public static final String QC_SMS_URL = getAsString("QC_SMS_URL");
    public static final Integer QC_SMS_SDK_APP_ID = getAsInteger("QC_SMS_SDK_APP_ID");
    public static final String QC_SMS_APP_KEY = getAsString("QC_SMS_APP_KEY");
    public static final Integer QC_SMS_VERIFICATION_CODE_SMS_TEMPLATE_ID = getAsInteger("QC_SMS_VERIFICATION_CODE_SMS_TEMPLATE_ID");

    public static final String PICS_PATH = getAsString("PICS_PATH");
    public static final String PICTURE_CONTEXT_PATH = "/pic";
}
