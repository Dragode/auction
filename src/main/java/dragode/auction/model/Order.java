package dragode.auction.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 订单
 */
@Entity
@Table(name = "order")
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
    private Double price;
    /**
     * 订单状态
     */
    private OrderStatus status;

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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getPriceInFenUnit() {
        return String.valueOf((int) (price * 100));
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public enum OrderStatus {
        WAIT_FOR_PAY, PAYING, PAY_SUCCESS, PAY_FAILURE;
    }
}
