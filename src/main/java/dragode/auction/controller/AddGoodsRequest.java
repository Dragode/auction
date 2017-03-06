package dragode.auction.controller;

import java.util.Date;
import java.util.List;

/**
 * 新增商品请求
 */
public class AddGoodsRequest {
    private String title;
    private Long startingPrice;
    private Boolean hasCashDeposit;
    private Long cashDeposit = 0l;
    private Long bidIncrement;
    private Integer delayCycle;
    private List<String> pictures;
    private Date startTime;
    private Date endTime;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<String> getPictures() {
        return pictures;
    }

    public void setPictures(List<String> pictures) {
        this.pictures = pictures;
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

    public Long getStartingPrice() {
        return startingPrice;
    }

    public void setStartingPrice(Long startingPrice) {
        this.startingPrice = startingPrice;
    }

    public Boolean getHasCashDeposit() {
        return hasCashDeposit;
    }

    public void setHasCashDeposit(Boolean hasCashDeposit) {
        this.hasCashDeposit = hasCashDeposit;
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
}
