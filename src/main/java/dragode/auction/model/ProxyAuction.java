package dragode.auction.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 代理拍卖
 */
@Entity
@Table(name = "proxyAuction")
public class ProxyAuction {

    public static final String UNDER_PROXY = "UNDER_PROXY";
    public static final String AUCTION_FINISH = "AUCTION_FINISH";
    /**
     * 代理价被别人竞价超过
     */
    public static final String PRICE_OVER = "PRICE_OVER";

    @Id
    @GeneratedValue
    private Integer id;
    private String status;
    private Integer userId;
    private Integer goodsId;
    /**
     * 代理的最高价
     */
    private Long price;

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

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }
}
