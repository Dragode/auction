package dragode.auction.intf;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import dragode.auction.common.Constant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.Assert;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Random;

/**
 * 腾讯云发送短信接口
 */
public class QCloudSmsInterface {

    private static final Logger logger = LoggerFactory.getLogger(QCloudSmsInterface.class);
    private static final String ENCODING = "utf-8";

    private String URL = Constant.QC_SMS_URL;
    private int SDK_APP_ID;
    private String APP_KEY;
    private Random random = new Random();

    public QCloudSmsInterface(int sdkAppId, String appKey) {
        this.SDK_APP_ID = sdkAppId;
        this.APP_KEY = appKey;
    }


    public String sendMsgByTemplate(String nationCode, List<String> phoneNumbers, SmsType smsType,
                                    Integer templateId, List<String> params) {
        Assert.notEmpty(phoneNumbers);

        try {
            HttpURLConnection con = openConnection();
            String requestBody = generateRequestBody(nationCode, phoneNumbers, smsType, templateId, params);
            sendRequest(con, requestBody);
            String response = getResponse(con);
            return response;
        } catch (Exception e) {
            logger.error("[腾讯云-指定模板群发短信接口] 异常！", e);
            return null;
        }
    }

    private HttpURLConnection openConnection() throws IOException {
        long randomNumber = random.nextInt(999999) % (999999 - 100000 + 1) + 100000;
        String wholeUrl = String.format("%s?sdkappid=%d&random=%d", URL, SDK_APP_ID, randomNumber);
        java.net.URL object = new URL(wholeUrl);

        HttpURLConnection con = (HttpURLConnection) object.openConnection();
        con.setDoOutput(true);
        con.setDoInput(true);
        con.setRequestProperty("Content-Type", "application/json");
        con.setRequestProperty("Accept", "application/json");
        con.setRequestMethod("POST");

        return con;
    }

    private String generateRequestBody(String nationCode, List<String> phoneNumbers, SmsType smsType,
                                       Integer templateId, List<String> params) throws NoSuchAlgorithmException {
        JSONObject postBody = new JSONObject();

        //TODO 单次提交不超过200个手机号
        JSONArray telephones = new JSONArray();
        for (String phoneNumber : phoneNumbers) {
            JSONObject telElement = new JSONObject();
            telElement.put("nationcode", nationCode);
            telElement.put("phone", phoneNumber);
            telephones.add(telElement);
        }
        postBody.put("tel", telephones);
        postBody.put("type", smsType.getValue());
        postBody.put("tpl_id", templateId);
        //TODO 内容长度不超过450字
        postBody.put("params", params);

        String sign = calculateSign(phoneNumbers);
        postBody.put("sig", sign);

        return postBody.toString();
    }

    private void sendRequest(HttpURLConnection con, String requestBody) throws IOException {
        OutputStreamWriter wr = new OutputStreamWriter(con.getOutputStream(), ENCODING);
        wr.write(requestBody);
        wr.flush();
        logger.debug("[腾讯云-指定模板群发短信接口] 发起请求[url=" + con.getURL() + "]，请求参数[postBody=" + requestBody + "]");
    }

    private String getResponse(HttpURLConnection con) throws IOException {
        StringBuilder response = new StringBuilder();
        int HttpResult = con.getResponseCode();
        if (HttpResult == HttpURLConnection.HTTP_OK) {
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(con.getInputStream(), "utf-8"));
            String line = null;
            while ((line = bufferedReader.readLine()) != null) {
                response.append(line + "\n");
            }
            bufferedReader.close();
            logger.debug("[腾讯云-指定模板群发短信接口] 相应报文[response=" + response + "]");
        } else {
            logger.error("[腾讯云-指定模板群发短信接口] 请求失败[ResponseMessage=" + con.getResponseMessage() + "]");
        }
        return response.toString();
    }

    /**
     * 计算签名
     *
     * @param phoneNumbers
     * @return
     * @throws NoSuchAlgorithmException
     */
    private String calculateSign(List<String> phoneNumbers)
            throws NoSuchAlgorithmException {
        String phoneNumbersString = phoneNumbers.get(0);
        for (int i = 1; i < phoneNumbers.size(); i++) {
            phoneNumbersString += "," + phoneNumbers.get(i);
        }
        return stringMD5(APP_KEY.concat(phoneNumbersString));
    }

    private static String stringMD5(String input) throws NoSuchAlgorithmException {
        MessageDigest messageDigest = MessageDigest.getInstance("MD5");
        byte[] inputByteArray = input.getBytes();
        messageDigest.update(inputByteArray);
        byte[] resultByteArray = messageDigest.digest();
        return byteArrayToHex(resultByteArray);
    }

    private static String byteArrayToHex(byte[] byteArray) {
        char[] hexDigits = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'};
        char[] resultCharArray = new char[byteArray.length * 2];
        int index = 0;
        for (byte b : byteArray) {
            resultCharArray[index++] = hexDigits[b >>> 4 & 0xf];
            resultCharArray[index++] = hexDigits[b & 0xf];
        }
        return new String(resultCharArray);
    }

    /**
     * 短信类型：0，普通短信，1营销短信
     */
    public enum SmsType {
        NORMAL("0"), MARKETING("1"),;

        private String value;

        SmsType(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }
}
