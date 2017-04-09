package dragode.auction.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 代理拍卖
 */
@Entity
@Table(name = "proxyBid")
public class ProxyBid {

    /**
     * 代理出价
     */
    public static final String UNDER_PROXY = "UNDER_PROXY";
    /**
     * 代理价被别人竞价超过
     */
    public static final String PRICE_OVER = "PRICE_OVER";
    /**
     * 拍卖结束
     */
    public static final String AUCTION_FINISH = "AUCTION_FINISH";

    @Id
    @GeneratedValue
    private Integer id;
    private String status;
    private Integer userId;
    private Integer goodsId;
    /**
     * 代理的最高价
     */
    private Long maxPrice;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getUserId() {
        return userId;
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

    public Long getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(Long maxPrice) {
        this.maxPrice = maxPrice;
    }
}
