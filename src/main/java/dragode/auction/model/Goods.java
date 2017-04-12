package dragode.auction.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * 商品实体类
 */
//TODO 商品信息和拍卖信息是否需要分离
@Entity
@Table(name = "goods")
public class Goods {
    /**
     * 等待拍卖
     */
    public static final Integer WAITING = 0;
    /**
     * 拍卖中
     */
    public static final Integer AUCTION = 1;
    /**
     * 拍卖成功
     */
    public static final Integer DONE = 2;
    /**
     * 流拍
     */
    public static final Integer ABORTIVE = 3;

    @Id
    @GeneratedValue
    private Integer id;
    /**
     * 专场ID
     */
    private Integer sessionId;
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
     * 市场估价
     */
    private Long evaluate;
    /**
     * 一口价
     */
    private Long buyoutPrice;
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
     * 规格
     */
    private String standard;
    /**
     * 品种
     */
    private String breed;
    /**
     * 作者
     */
    private String author;
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
     * 状态，0：等待拍卖；1：正在拍卖；2：拍卖结束；3：流拍
     * 便于后台定时任务索引搜索订单
     */
    private Integer status;
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
    /**
     * 已延迟次数
     */
    private Integer delayTimes;
    /**
     * 是否已提醒过竞拍即将结束
     */
    private Boolean remindOfFinish;

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

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
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

    public Integer getDelayTimes() {
        return delayTimes;
    }

    public void setDelayTimes(Integer delayTimes) {
        this.delayTimes = delayTimes;
    }

    public Long getEvaluate() {
        return evaluate;
    }

    public void setEvaluate(Long evaluate) {
        this.evaluate = evaluate;
    }

    public String getStandard() {
        return standard;
    }

    public void setStandard(String standard) {
        this.standard = standard;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Long getBuyoutPrice() {
        return buyoutPrice;
    }

    public void setBuyoutPrice(Long buyoutPrice) {
        this.buyoutPrice = buyoutPrice;
    }

    public Boolean getRemindOfFinish() {
        return remindOfFinish;
    }

    public void setRemindOfFinish(Boolean remindOfFinish) {
        this.remindOfFinish = remindOfFinish;
    }

    public static Goods newDefaultGoods() {
        Goods goods = new Goods();
        goods.setStatus(Goods.WAITING);
        goods.setDelayTimes(0);
        return goods;
    }
}
