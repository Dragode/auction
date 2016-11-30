package dragode.auction.utils;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.security.KeyStore;

public class FileUtils {

    public static String getAbsolutePath(String pathRelativeToClassPath) {
        URL resourceUrl = FileUtils.class.getResource(pathRelativeToClassPath);
        if (resourceUrl == null) {
            throw new RuntimeException("File does not exist![pathRelativeToClassPath=" + pathRelativeToClassPath + "]");
        }
        URI resourceUri;
        try {
            resourceUri = resourceUrl.toURI();
        } catch (URISyntaxException e) {
            throw new RuntimeException("Can not cast url to uri.", e);
        }
        return resourceUri.getPath();
    }

    public static void main(String[] args) throws Exception{
        KeyStore ks = KeyStore.getInstance("PKCS12", "BC");

    }
}
