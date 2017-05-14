package dragode.auction.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 用户信息
 */
@Entity
@Table(name = "user")
public class User {

    public static final String NORMAL_USER = "normal";
    public static final String MEMBER_USER = "member";
    public static final String ADMINISTRATOR = "administrator";
    public static final String BLACK_LIST = "black_list";

    public User() {
    }

    public User(String openId,Boolean subscribed) {
        this.openId = openId;
        this.role = NORMAL_USER;
        this.subscribed = subscribed;
    }

    public User(String openId, String nickname, String headimgurl) {
        this.openId = openId;
        this.nickname = nickname;
        this.headimgurl = headimgurl;
        this.subscribed = false;
    }

    @Id
    @GeneratedValue
    private Integer id;
    private String openId;
    /**
     * 微信昵称
     */
    private String nickname;
    /**
     *用户微信头像
     */
    private String headimgurl;
    private Integer balance;
    private Boolean subscribed;
    private String phoneNumber;
    private String role;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    public Integer getBalance() {
        return balance;
    }

    public void setBalance(Integer balance) {
        this.balance = balance;
    }

    public Boolean getSubscribed() {
        return subscribed;
    }

    public void setSubscribed(Boolean subscribed) {
        this.subscribed = subscribed;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getHeadimgurl() {
        return headimgurl;
    }

    public void setHeadimgurl(String headimgurl) {
        this.headimgurl = headimgurl;
    }
}
