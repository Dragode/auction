package dragode.auction.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * 商品实体类
 */
@Entity
@Table(name = "goods")
public class Goods {
    @Id
    @GeneratedValue
    private Integer id;
    /**
     * 商品列表图片
     */
    private String bannerUrl;
    /**
     * 标题
     */
    private String title;
    /**
     * 起拍价
     */
    private Long startingPrice;
    /**
     * 加价幅度
     */
    private Long bidIncrement;
    /**
     * 保证金，0即不用保证金
     */
    private Long cashDeposit;
    /**
     * 延迟周期，X分/次，默认5分/次
     */
    private Integer delayCycle;
    /**
     * 拍卖开始时间
     */
    private Date startTime;
    /**
     * 拍卖结束时间
     */
    private Date endTime;

    /**
     * 竞拍大厅页面图片
     */
    private String auctionPic;
    /**
     * 当前价格
     */
    private Long currentPrice;
    /**
     * 当前竞拍所得用户
     */
    private Integer auctionUserId;
    /**
     * 用户竞拍时间
     */
    private Date lastAuctionDate;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    public Long getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(Long currentPrice) {
        this.currentPrice = currentPrice;
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

    public Integer getDelayCycle() {
        return delayCycle;
    }

    public void setDelayCycle(Integer delayCycle) {
        this.delayCycle = delayCycle;
    }

    public String getAuctionPic() {
        return auctionPic;
    }

    public void setAuctionPic(String auctionPic) {
        this.auctionPic = auctionPic;
    }

    public Integer getAuctionUserId() {
        return auctionUserId;
    }

    public void setAuctionUserId(Integer auctionUserId) {
        this.auctionUserId = auctionUserId;
    }

    public Date getLastAuctionDate() {
        return lastAuctionDate;
    }

    public void setLastAuctionDate(Date lastAuctionDate) {
        this.lastAuctionDate = lastAuctionDate;
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
