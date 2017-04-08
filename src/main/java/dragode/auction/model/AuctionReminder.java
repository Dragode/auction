package dragode.auction.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * 拍卖提醒
 */
@Entity
@Table(name = "auctionReminder")
public class AuctionReminder {

    /**
     * 拍卖即将开始提醒
     */
    public static final Integer START = 0;
    /**
     * 拍卖即将结束提醒
     */
    public static final Integer END = 1;

    @Id
    @GeneratedValue
    private Integer id;
    /**
     * 商品ID
     */
    private Integer goodsId;
    /**
     * 用户ID
     */
    private Integer userId;
    /**
     * 提醒类型
     */
    private Integer remindType;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(Integer goodsId) {
        this.goodsId = goodsId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getRemindType() {
        return remindType;
    }

    public void setRemindType(Integer remindType) {
        this.remindType = remindType;
    }
}
