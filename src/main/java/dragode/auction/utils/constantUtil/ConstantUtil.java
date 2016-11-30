package dragode.auction.utils.constantUtil;

import dragode.auction.utils.FileUtils;
import org.apache.commons.lang3.ArrayUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

/**
 * 常量工具类
 */
public class ConstantUtil {

    private static Properties props = new Properties();

    private static List<String> initClasses = new ArrayList<>();

    private static void loadProperties() {
        String callerClassName = getCallerClassName();
        if (!initClasses.contains(initClasses)) {
            try {
                Class<?> clazz = Class.forName(callerClassName);
                LoadProperties annotation = clazz.getAnnotation(LoadProperties.class);
                if (annotation != null) {
                    String[] resourceFiles = annotation.files();
                    if (ArrayUtils.isNotEmpty(resourceFiles)) {
                        for (String resourceFile : resourceFiles) {
                            loadPropertiesFile(resourceFile);
                        }
                    }
                }
            } catch (ClassNotFoundException e) {
                //TODO handle
                e.printStackTrace();
            }
        }
    }

    private static String getCallerClassName() {
        StackTraceElement[] stackTrace = Thread.currentThread().getStackTrace();
        StackTraceElement caller = stackTrace[4];
        return caller.getClassName();
    }

    public static void loadPropertiesFile(String propertiesPath) {
        File resourceFile = new File(FileUtils.getAbsolutePath(propertiesPath));
        if (!resourceFile.exists()) {
            throw new RuntimeException("File with path = " + propertiesPath + " does not exist!");
        }
        try {
            FileInputStream fis = new FileInputStream(resourceFile);
            props.load(fis);
        } catch (FileNotFoundException e) {
            e.printStackTrace(); //TODO new FileInputStream(file);
        } catch (IOException e) {
            e.printStackTrace();//TODO props.load(fis);
        }
    }

    public static Object getAsObject(String key) {
        loadProperties();

        return props.get(key);
    }

    public static String getAsString(String key) {
        loadProperties();

        final Object value = props.get(key);
        if (value != null) {
            return value.toString();
        }
        return null;
    }
}
