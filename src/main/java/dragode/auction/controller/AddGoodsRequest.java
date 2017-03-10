package dragode.auction.controller;

import java.util.Date;
import java.util.List;

/**
 * 新增商品请求
 */
public class AddGoodsRequest {
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
     * 拍卖开始时间
     */
    private Date startTime;
    /**
     * 拍卖结束时间
     */
    private Date endTime;
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
