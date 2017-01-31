package dragode.auction.controller;

import dragode.auction.controller.response.GoodsResponse;
import dragode.auction.model.Goods;
import dragode.auction.model.GoodsPictures;
import dragode.auction.model.Session;
import dragode.auction.repository.GoodsPicturesRepository;
import dragode.auction.repository.GoodsRepository;
import dragode.auction.repository.SessionRepository;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.LinkedList;
import java.util.List;

/**
 * 商品接口
 */
@RestController
public class GoodsController {

    @Resource
    private GoodsRepository goodsRepository;
    @Resource
    private SessionRepository sessionRepository;
    @Resource
    private GoodsPicturesRepository goodsPicturesRepository;

    /**
     * 获取商品详情
     *
     * @param goodsId 商品ID
     * @return
     */
    @RequestMapping(path = "/goods/{goodsId}")
    public GoodsResponse getGoods(@PathVariable Integer goodsId) {
        Goods one = goodsRepository.findOne(goodsId);
        Session session = sessionRepository.findOne(one.getSessionId());

        GoodsResponse goods = new GoodsResponse();
        goods.setId(one.getId());
        goods.setSessionId(one.getSessionId());
        goods.setBannerUrl(one.getBannerUrl());
        goods.setTitle(one.getTitle());
        goods.setBidCount(one.getBidCount());
        goods.setStartingPrice(one.getStartingPrice());
        goods.setHasCashDeposit(one.getHasCashDeposit());
        goods.setCashDeposit(one.getCashDeposit());
        goods.setBidIncrement(one.getBidIncrement());
        goods.setDelayCycle(one.getDelayCycle());
        goods.setCurrentPrice(one.getCurrentPrice());
        goods.setAuctionPic(one.getAuctionPic());
        goods.setShowPics(new LinkedList<String>());
        List<GoodsPictures> goodsShowPictures = goodsPicturesRepository.findAllByGoodsIdAndType(goodsId, GoodsPictures.SHOW_PIC);
        if (!CollectionUtils.isEmpty(goodsShowPictures)) {
            for (GoodsPictures goodsShowPicture : goodsShowPictures) {
                goods.getShowPics().add(goodsShowPicture.getRelativeUrl());
            }
        }
        /*goods.getShowPics().add("exampleImg/goodsShowExample1.jpg");
        goods.getShowPics().add("exampleImg/goodsShowExample2.jpg");
        goods.getShowPics().add("exampleImg/goodsShowExample3.jpg");*/
        goods.setDescPics(new LinkedList<String>());
        List<GoodsPictures> goodsDescPictures = goodsPicturesRepository.findAllByGoodsIdAndType(goodsId, GoodsPictures.DESC_PIC);
        for (GoodsPictures goodsDescPicture : goodsDescPictures) {
            goods.getDescPics().add(goodsDescPicture.getRelativeUrl());
        }
        //goods.getDescPics().add("exampleImg/goodsDescExample1.jpg");
        //goods.getDescPics().add("exampleImg/goodsDescExample2.jpg");
        goods.setSession(session);
        return goods;
    }
}
