package dragode.auction.common;

import dragode.auction.utils.constantUtil.LoadProperties;

import static dragode.auction.utils.FileUtils.getAbsolutePath;
import static dragode.auction.utils.constantUtil.ConstantUtil.getAsString;

@LoadProperties(files = {"/payment.properties"})
public class Constant {

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
    /** 证书使用模式(单证书/多证书) */
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
}
