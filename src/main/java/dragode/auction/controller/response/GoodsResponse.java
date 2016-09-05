package dragode.auction.controller.response;

import dragode.auction.model.Goods;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
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
    private Long price;//TODO 改成startingPrice
    /**
     * 起拍价
     */
    private Long startingPrice;
    private Long cashDeposit;
    private Long bidIncrement;
    private List<String> showPics;
    private List<String> descPics;

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

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
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
}
