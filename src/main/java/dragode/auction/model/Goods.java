package dragode.auction.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Dracode on 2016/8/27.
 */
@Entity
@Table(name = "goods")
public class Goods {
    @Id
    @GeneratedValue
    private Integer id;
    private Integer sessionId;
    private String bannerUrl;
    private String title;

    private Long bidCount;
    /**
     * 当前价格
     */
    private Long currentPrice;
    /**
     * 起拍价
     */
    private Long startingPrice;
    /**
     * 是否需要保证金
     */
    private Boolean hasCashDeposit;
    /**
     * 保证金
     */
    private Long cashDeposit;
    /**
     * 加价幅度
     */
    private Long bidIncrement;
    /**
     * 延迟周期，X分/次，默认5分/次
     */
    private Integer delayCycle;
    private String showPics;
    private String descPics;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSessionId() {
        return sessionId;
    }

    public void setSessionId(Integer sessionId) {
        this.sessionId = sessionId;
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

    public Long getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(Long currentPrice) {
        this.currentPrice = currentPrice;
    }

    public String getDescPics() {
        return descPics;
    }

    public void setDescPics(String descPics) {
        this.descPics = descPics;
    }

    public String getShowPics() {
        return showPics;
    }

    public void setShowPics(String showPics) {
        this.showPics = showPics;
    }

    public Long getStartingPrice() {
        return startingPrice;
    }

    public void setStartingPrice(Long startingPrice) {
        this.startingPrice = startingPrice;
    }

    public Long getCashDeposit() {
        return cashDeposit;
    }

    public void setCashDeposit(Long cashDeposit) {
        this.cashDeposit = cashDeposit;
    }

    public Long getBidIncrement() {
        return bidIncrement;
    }

    public void setBidIncrement(Long bidIncrement) {
        this.bidIncrement = bidIncrement;
    }

    public Boolean getHasCashDeposit() {
        return hasCashDeposit;
    }

    public void setHasCashDeposit(Boolean hasCashDeposit) {
        this.hasCashDeposit = hasCashDeposit;
    }

    public Integer getDelayCycle() {
        return delayCycle;
    }

    public void setDelayCycle(Integer delayCycle) {
        this.delayCycle = delayCycle;
    }
}
