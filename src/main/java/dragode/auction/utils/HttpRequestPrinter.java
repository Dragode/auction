package dragode.auction.utils;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * ******************************************
 * <p/>
 * Copyright 2016
 * NetDragon All rights reserved
 * <p/>
 * *****************************************
 * <p/>
 * *** Company ***
 * NetDragon
 * <p/>
 * *****************************************
 * <p/>
 * *** Team ***
 * SmartQ
 * <p/>
 * *****************************************
 *
 * @author 俞建龙(300116)
 * @version V1.0
 * @Title HttpRequestPrinter
 * @Package dragode.auction.utils
 * <p/>
 * *****************************************
 * @Description
 * @date 2016/8/31 0031
 */
public class HttpRequestPrinter {

    public static String tranferRequestToString(HttpServletRequest request) {
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
}
