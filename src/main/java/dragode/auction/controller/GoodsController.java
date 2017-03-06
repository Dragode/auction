package dragode.auction.controller;

import dragode.auction.common.Constant;
import dragode.auction.controller.response.GoodsResponse;
import dragode.auction.model.Goods;
import dragode.auction.model.GoodsPictures;
import dragode.auction.model.Session;
import dragode.auction.repository.GoodsPicturesRepository;
import dragode.auction.repository.GoodsRepository;
import dragode.auction.repository.SessionRepository;
import dragode.wechat.intf.WxInterface;
import org.springframework.beans.BeanUtils;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.LinkedList;
import java.util.List;

/**
 * 商品接口
 */
@RestController
@RequestMapping(path = "/goods")
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
    @RequestMapping(path = "/{goodsId}",method = RequestMethod.GET)
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

    //TODO 为什么会让/goods.html会405
    @RequestMapping(method = RequestMethod.POST)
    public void addGoods(@RequestBody AddGoodsRequest addGoodsRequest) {
        //,@RequestBody Map requestBody
        //下载图片
        List<String> pictures = addGoodsRequest.getPictures();
        //List<String> pictures = (List)requestBody.get("pictures");
        for (String picture : pictures) {
            WxInterface.downloadMediaFile(picture, picture + ".jpg", Constant.PICS_PATH);
        }

        //保存商品信息
        Goods goods = new Goods();
        BeanUtils.copyProperties(addGoodsRequest, goods);
        //TODO 临时方案
        goods.setShowPics("");
        goods.setDescPics("");
        goods.setBidCount(0l);
        goods.setCurrentPrice(goods.getStartingPrice());
        goods.setSessionId(1);
        goods.setBannerUrl("/pic/" + addGoodsRequest.getPictures().get(0) + ".jpg");
        goods.setAuctionPic("/pic/" + addGoodsRequest.getPictures().get(3) + ".jpg");
        goodsRepository.save(goods);

        //保存商品图片信息
        GoodsPictures goodsShowPictures = new GoodsPictures();
        String showPicture = addGoodsRequest.getPictures().get(1);
        goodsShowPictures.setType(GoodsPictures.SHOW_PIC);
        goodsShowPictures.setGoodsId(goods.getId());
        goodsShowPictures.setRelativeUrl("/pic/" + showPicture + ".jpg");
        goodsPicturesRepository.save(goodsShowPictures);

        GoodsPictures goodsDesPictures = new GoodsPictures();
        String desPicture = pictures.get(2);
        goodsDesPictures.setType(GoodsPictures.DESC_PIC);
        goodsDesPictures.setGoodsId(goods.getId());
        goodsDesPictures.setRelativeUrl("/pic/" + desPicture + ".jpg");
        goodsPicturesRepository.save(goodsDesPictures);
    }
}
