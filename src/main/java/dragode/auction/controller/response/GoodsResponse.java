package dragode.auction.controller.response;

import dragode.auction.model.Session;

import java.util.List;

/**
 * ******************************************
 * <p/>
 * Copyright 2016
 * NetDragon All rights reserved
 * <p/>
 * *****************************************
 * <p/>
 * *** Company ***
 * NetDragon
 * <p/>
 * *****************************************
 * <p/>
 * *** Team ***
 * SmartQ
 * <p/>
 * *****************************************
 *
 * @author 俞建龙(300116)
 * @version V1.0
 * @Title GoodsResponse
 * @Package dragode.auction.controller.response
 * <p/>
 * *****************************************
 * @Description
 * @date 2016/9/5 0005
 */
public class GoodsResponse {
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
    private Long cashDeposit;
    private Long bidIncrement;
    /**
     * 延迟周期，X分/次，默认5分/次
     */
    private Integer delayCycle;
    private List<String> showPics;
    private List<String> descPics;
    private String auctionPic;

    private Session session;

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

    public List<String> getShowPics() {
        return showPics;
    }

    public void setShowPics(List<String> showPics) {
        this.showPics = showPics;
    }

    public List<String> getDescPics() {
        return descPics;
    }

    public void setDescPics(List<String> descPics) {
        this.descPics = descPics;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public Integer getDelayCycle() {
        return delayCycle;
    }

    public void setDelayCycle(Integer delayCycle) {
        this.delayCycle = delayCycle;
    }

    public Boolean getHasCashDeposit() {
        return hasCashDeposit;
    }

    public void setHasCashDeposit(Boolean hasCashDeposit) {
        this.hasCashDeposit = hasCashDeposit;
    }

    public String getAuctionPic() {
        return auctionPic;
    }

    public void setAuctionPic(String auctionPic) {
        this.auctionPic = auctionPic;
    }
}
