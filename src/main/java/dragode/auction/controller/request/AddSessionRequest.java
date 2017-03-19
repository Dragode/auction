package dragode.auction.controller.request;

import java.util.Date;

/**
 * 新增专场请求类
 */
public class AddSessionRequest {
    private String bannerPictureWxServerId;
    private String title;
    private Date startTime;
    private Date endTime;

    public String getBannerPictureWxServerId() {
        return bannerPictureWxServerId;
    }

    public void setBannerPictureWxServerId(String bannerPictureWxServerId) {
        this.bannerPictureWxServerId = bannerPictureWxServerId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }
}
