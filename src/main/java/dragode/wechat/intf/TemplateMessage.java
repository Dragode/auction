package dragode.wechat.intf;

import java.util.Map;

/**
 * 微信模板消息POJO
 */
public class TemplateMessage {
    /**
     * 用户的openId
     */
    private String touser;
    /**
     * 模板消息Id
     */
    private String template_id;
    /**
     * 模板消息跳转链接【可选】
     */
    private String url;
    /**
     * 模板消息顶部颜色
     */
    private String topcolor;
    /**
     * 模板消息数据
     */
    private Map<String, DataItem> data;

    public String getTouser() {
        return touser;
    }

    public void setTouser(String touser) {
        this.touser = touser;
    }

    public String getTemplate_id() {
        return template_id;
    }

    public void setTemplate_id(String template_id) {
        this.template_id = template_id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTopcolor() {
        return topcolor;
    }

    public void setTopcolor(String topcolor) {
        this.topcolor = topcolor;
    }

    public Map<String, DataItem> getData() {
        return data;
    }

    public void setData(Map<String, DataItem> data) {
        this.data = data;
    }

    /**
     * 模板消息数据项
     */
    public static class DataItem {
        /**
         * 数值值
         */
        private String value;
        /**
         * 字体颜色
         */
        private String color;

        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }

        public String getColor() {
            return color;
        }

        public void setColor(String color) {
            this.color = color;
        }
    }
}
