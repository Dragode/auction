package dragode.auction.utils;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.Map;

/**
 * Http请求工具类
 */
public class HttpRequestUtils {

    /**
     * 解析请求参数
     * @param request
     * @return
     */
    public static String transferRequestToString(HttpServletRequest request) {
        StringBuilder requestString = new StringBuilder();
        Map<String, String[]> parameterMap = request.getParameterMap();
        for (Map.Entry<String, String[]> parameterEs : parameterMap.entrySet()) {
            String key = parameterEs.getKey();
            requestString.append("[");
            requestString.append(key);
            requestString.append("=");
            for (String value : parameterEs.getValue()) {
                requestString.append(value);
                requestString.append("|");
            }
            requestString.append("]");
        }
        return requestString.toString();
    }

    /**
     * 解析Post body
     * @param request
     * @return
     */
    public static String retrievePostBody(HttpServletRequest request){
        StringBuffer postBodyBuffer = new StringBuffer();
        BufferedReader bufferedReader = null;
        try {

            bufferedReader = request.getReader();
            char[] charBuffer = new char[128];
            int bytesRead;
            while ((bytesRead = bufferedReader.read(charBuffer)) != -1) {
                postBodyBuffer.append(charBuffer, 0, bytesRead);
            }
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        } finally {
            if (bufferedReader != null) {
                try {
                    bufferedReader.close();
                } catch (IOException ex) {
                    throw new RuntimeException(ex);
                }
            }
        }
        return postBodyBuffer.toString();
    }
}
