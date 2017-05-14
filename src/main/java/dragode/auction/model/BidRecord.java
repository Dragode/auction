package dragode.auction.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * 拍卖纪录
 */
@Entity
@Table(name = "bidRecord")
public class BidRecord {
    @Id
    @GeneratedValue
    private Integer id;
    private Integer userId;
    private String userPhoneNumber;
    private Integer goodsId;
    private Long price;
    private Date bidTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getUserPhoneNumber() {
        return userPhoneNumber;
    }

    public void setUserPhoneNumber(String userPhoneNumber) {
        this.userPhoneNumber = userPhoneNumber;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(Integer goodsId) {
        this.goodsId = goodsId;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Date getBidTime() {
        return bidTime;
    }

    public void setBidTime(Date auctionTime) {
        this.bidTime = auctionTime;
    }
}
