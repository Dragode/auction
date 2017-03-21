package dragode.auction.controller.request;

import java.util.List;

/**
 * 新增商品请求
 */
public class AddGoodsRequest {
    /**
     * 专场ID
     */
    private Integer sessionId;
    /**
     * 商品列表图片 wx服务器ID
     */
    private String bannerPictureWxServerId;
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
     * 保证金
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
     * 竞拍大厅页面图片 wx服务器ID
     */
    private String auctionPictureWxServerId;
    /**
     * 商品详情页 跑马灯图片列表 wx服务器ID
     */
    private List<String> showPicturesWxServerId;
    /**
     * 商品详情页 详情图片列表 wx服务器ID
     */
    private List<String> descPicturesWxServerId;

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

    public Long getStartingPrice() {
        return startingPrice;
    }

    public void setStartingPrice(Long startingPrice) {
        this.startingPrice = startingPrice;
    }

    public Long getBidIncrement() {
        return bidIncrement;
    }

    public void setBidIncrement(Long bidIncrement) {
        this.bidIncrement = bidIncrement;
    }

    public Long getCashDeposit() {
        return cashDeposit;
    }

    public void setCashDeposit(Long cashDeposit) {
        this.cashDeposit = cashDeposit;
    }

    public Integer getDelayCycle() {
        return delayCycle;
    }

    public void setDelayCycle(Integer delayCycle) {
        this.delayCycle = delayCycle;
    }

    public Integer getSessionId() {
        return sessionId;
    }

    public void setSessionId(Integer sessionId) {
        this.sessionId = sessionId;
    }

    public Long getEvaluate() {
        return evaluate;
    }

    public void setEvaluate(Long evaluate) {
        this.evaluate = evaluate;
    }

    public Long getBuyoutPrice() {
        return buyoutPrice;
    }

    public void setBuyoutPrice(Long buyoutPrice) {
        this.buyoutPrice = buyoutPrice;
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

    public String getAuctionPictureWxServerId() {
        return auctionPictureWxServerId;
    }

    public void setAuctionPictureWxServerId(String auctionPictureWxServerId) {
        this.auctionPictureWxServerId = auctionPictureWxServerId;
    }

    public List<String> getShowPicturesWxServerId() {
        return showPicturesWxServerId;
    }

    public void setShowPicturesWxServerId(List<String> showPicturesWxServerId) {
        this.showPicturesWxServerId = showPicturesWxServerId;
    }

    public List<String> getDescPicturesWxServerId() {
        return descPicturesWxServerId;
    }

    public void setDescPicturesWxServerId(List<String> descPicturesWxServerId) {
        this.descPicturesWxServerId = descPicturesWxServerId;
    }
}
