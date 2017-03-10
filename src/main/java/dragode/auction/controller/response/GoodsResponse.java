package dragode.auction.controller.response;

import dragode.auction.model.Goods;
import dragode.auction.model.Session;

import java.util.Date;
import java.util.List;

/**
 * 商品响应报文
 */
public class GoodsResponse extends Goods{
    private List<String> showPictures;
    private List<String> descPictures;

    public List<String> getShowPictures() {
        return showPictures;
    }

    public void setShowPictures(List<String> showPictures) {
        this.showPictures = showPictures;
    }

    public List<String> getDescPictures() {
        return descPictures;
    }

    public void setDescPictures(List<String> descPictures) {
        this.descPictures = descPictures;
    }
}
