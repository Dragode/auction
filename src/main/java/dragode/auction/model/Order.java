package dragode.auction.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 订单
 */
@Entity
@Table(name = "auctionOrder")
public class Order {
    @Id
    @GeneratedValue
    private Integer id;
    /**
     * 对客户展示的Id
     */
    private String displayId;
    /**
     * 订单价格，以元为单位
     */
    private Long price;
    /**
     * 订单状态
     */
    private String orderStatus;
    /**
     * 用户Id
     */
    private Integer userId;
    /**
     * 商品Id
     */
    private Integer goodsId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDisplayId() {
        return displayId;
    }

    public void setDisplayId(String displayId) {
        this.displayId = displayId;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public String getPriceInFenUnit() {
        return String.valueOf((int) (price * 100));
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
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

    public enum OrderStatus {
        /**
         * 代付款
         */
        WAIT_FOR_PAY("WAIT_FOR_PAY"),
        /**
         * 付款中
         */
        PAYING("PAYING"),
        /**
         * 付款成功
         */
        PAY_SUCCESS("PAY_SUCCESS"),
        /**
         * 付款失败
         */
        PAY_FAILURE("PAY_FAILURE"),
        /**
         * 已发货
         */
        DILIVERED("DILIVERED"),
        /**
         * 已结束
         */
        FINISH("FINISH");

        private String code;

        OrderStatus(String code) {
            this.code = code;
        }

        public String getCode(){
            return code;
        }
    }
}
