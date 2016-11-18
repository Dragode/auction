package dragode.auction.utils;

public class Constants {
    /** 证书ID. */
    public static final String param_certId = "certId";
    /** 签名. */
    public static final String param_signature = "signature";
    /** 批量文件内容. */
    public static final String param_fileContent = "fileContent";
    /** memeber variable: equal mark. */
    public static final String EQUAL = "=";
    /** memeber variable: AMPERSAND. */
    public static final String AMPERSAND = "&";
    /** memeber variable: string true. */
    public static final String TRUE_STRING = "true";
    /** memeber variable: string false. */
    public static final String FALSE_STRING = "false";
    /** 证书使用模式(单证书/多证书) */
    public static final String singleMode = TRUE_STRING;
    public static final String SignCertPath = "D:/certs/acp_test_sign.pfx";
    public static final String SignCertPwd = "000000";
    public static final String SignCertType = "PKCS12";
    public static final String EncryptCertPath = "d:/certs/acp_test_enc.cer";
    public static final String EncryptTrackKeyModulus = "";
    public static final String EncryptTrackKeyExponent = "";
    public static final String ValidateCertDir = "D:/certs/";

    //默认配置的是UTF-8
    public static String encoding_UTF8 = "UTF-8";
    //全渠道固定值
    public static String version = "5.0.0";

    public static final String frontUrl = "http://119.29.162.156/paySuccess.html";
    public static final String backUrl = "http://119.29.162.156/";

    public static final String frontTransUrl = "https://101.231.204.80:5000/gateway/api/frontTransReq.do";
}
