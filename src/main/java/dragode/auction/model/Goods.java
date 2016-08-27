package dragode.auction.model;

import java.util.LinkedList;
import java.util.List;

/**
 * Created by Dracode on 2016/8/27.
 */
public class Goods {
    private String id;
    private String bannerUrl;
    private String title;
    private Long bidCount;
    private Long price;//TODO 改成startingPrice
    /**
     * 起拍价
     */
    private Long startingPrice;
    private Long cashDeposit;
    private Long bidIncrement;
    private List<String> showPics;
    private List<String> descPics;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBannerUrl() {
        return bannerUrl;
    }

    public void setBannerUrl(String bannerUrl) {
        this.bannerUrl = bannerUrl;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getBidCount() {
        return bidCount;
    }

    public void setBidCount(Long bidCount) {
        this.bidCount = bidCount;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public List<String> getDescPics() {
        return descPics;
    }

    public void setDescPics(List<String> descPics) {
        this.descPics = descPics;
    }

    public List<String> getShowPics() {
        return showPics;
    }

    public void setShowPics(List<String> showPics) {
        this.showPics = showPics;
    }
}
