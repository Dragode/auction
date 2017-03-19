package dragode.auction.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 *
 */
@Entity
@Table(name = "auctionReminder")
public class AuctionReminder {

    /**
     * 拍卖开始时提醒
     */
    public static final Integer AUCTION_START_REMIND = 0;
    /**
     * 拍卖结束时提醒
     */
    public static final Integer AUCTION_END_REMIND = 1;

    @Id
    @GeneratedValue
    private Integer id;
    private Integer goodsId;
    private Integer userId;
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
