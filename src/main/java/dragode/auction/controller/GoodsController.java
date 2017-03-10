package dragode.auction.controller;

import dragode.auction.common.Constant;
import dragode.auction.controller.response.BaseListResponse;
import dragode.auction.controller.response.GoodsResponse;
import dragode.auction.model.Goods;
import dragode.auction.model.GoodsPictures;
import dragode.auction.repository.GoodsPicturesRepository;
import dragode.auction.repository.GoodsRepository;
import dragode.wechat.intf.WxInterface;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
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
    private GoodsPicturesRepository goodsPicturesRepository;

    /**
     * 获取商品列表
     *
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public BaseListResponse<Goods> getGoods() {
        return new BaseListResponse<>(goodsRepository.findAll());
    }

    /**
     * 获取商品详情
     *
     * @param goodsId 商品ID
     * @return
     */
    @RequestMapping(path = "/{goodsId}", method = RequestMethod.GET)
    public GoodsResponse getGoods(@PathVariable Integer goodsId) {
        GoodsResponse goodsResponse = new GoodsResponse();

        Goods goods = goodsRepository.findOne(goodsId);
        BeanUtils.copyProperties(goods, goodsResponse);


        goodsResponse.setShowPictures(new ArrayList<String>());
        List<GoodsPictures> goodsShowPictures = goodsPicturesRepository.findAllByGoodsIdAndType(goodsId, GoodsPictures.SHOW_PIC);
        if (!CollectionUtils.isEmpty(goodsShowPictures)) {
            for (GoodsPictures goodsShowPicture : goodsShowPictures) {
                goodsResponse.getShowPictures().add(goodsShowPicture.getRelativeUrl());
            }
        }

        goodsResponse.setDescPictures(new ArrayList<String>());
        List<GoodsPictures> goodsDescPictures = goodsPicturesRepository.findAllByGoodsIdAndType(goodsId, GoodsPictures.DESC_PIC);
        for (GoodsPictures goodsDescPicture : goodsDescPictures) {
            goodsResponse.getDescPictures().add(goodsDescPicture.getRelativeUrl());
        }

        return goodsResponse;
    }

    //TODO 为什么会让/goods.html会405
    @RequestMapping(method = RequestMethod.POST)
    public Goods addGoods(@RequestBody AddGoodsRequest addGoodsRequest) {
        Goods goods = new Goods();
        BeanUtils.copyProperties(addGoodsRequest, goods);
        goods.setCurrentPrice(goods.getStartingPrice());

        //从微信服务器下载图片
        WxInterface.downloadMediaFile(addGoodsRequest.getBannerPictureWxServerId(), Constant.PICS_PATH);
        goods.setBannerUrl(Constant.PICTURE_CONTEXT_PATH + "/" + addGoodsRequest.getBannerPictureWxServerId());

        WxInterface.downloadMediaFile(addGoodsRequest.getAuctionPictureWxServerId(), Constant.PICS_PATH);
        goods.setAuctionPic(Constant.PICTURE_CONTEXT_PATH + "/" + addGoodsRequest.getAuctionPictureWxServerId());
        goodsRepository.save(goods);


        for (String showPictureWxServerId : addGoodsRequest.getShowPicturesWxServerId()) {
            WxInterface.downloadMediaFile(showPictureWxServerId, Constant.PICS_PATH);
            GoodsPictures goodsShowPictures = new GoodsPictures();
            goodsShowPictures.setType(GoodsPictures.SHOW_PIC);
            goodsShowPictures.setGoodsId(goods.getId());
            goodsShowPictures.setRelativeUrl(Constant.PICTURE_CONTEXT_PATH + "/" + showPictureWxServerId);
            goodsPicturesRepository.save(goodsShowPictures);
        }
        for (String descPictureWxServerId : addGoodsRequest.getDescPicturesWxServerId()) {
            WxInterface.downloadMediaFile(descPictureWxServerId, Constant.PICS_PATH);
            GoodsPictures goodsDesPictures = new GoodsPictures();
            goodsDesPictures.setType(GoodsPictures.DESC_PIC);
            goodsDesPictures.setGoodsId(goods.getId());
            goodsDesPictures.setRelativeUrl(Constant.PICTURE_CONTEXT_PATH + "/" + descPictureWxServerId);
            goodsPicturesRepository.save(goodsDesPictures);
        }

        return goods;
    }
}
