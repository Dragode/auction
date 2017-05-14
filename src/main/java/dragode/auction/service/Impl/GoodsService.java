package dragode.auction.service.Impl;

import dragode.auction.common.Constant;
import dragode.auction.controller.request.AddGoodsRequest;
import dragode.auction.model.Goods;
import dragode.auction.model.GoodsPictures;
import dragode.auction.model.Session;
import dragode.auction.repository.GoodsPicturesRepository;
import dragode.auction.repository.GoodsRepository;
import dragode.auction.repository.SessionRepository;
import dragode.wechat.intf.WxInterface;
import org.apache.commons.collections4.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * 商品服务
 */
@Service
public class GoodsService {

    private static final Logger LOGGER = LoggerFactory.getLogger(GoodsService.class);

    @Resource
    private GoodsRepository goodsRepository;
    @Resource
    private SessionRepository sessionRepository;
    @Resource
    private GoodsPicturesRepository goodsPicturesRepository;

    /**
     * 获取专场中的商品列表
     *
     * @param sessionId
     * @return
     */
    public List<Goods> findBySessionId(Integer sessionId) {
        return goodsRepository.findAllBySessionId(sessionId);
    }

    /**
     * 获取商品详情
     *
     * @param goodsId 商品ID
     * @return
     */
    public Goods findOne(Integer goodsId) {
        return goodsRepository.findOne(goodsId);
    }

    /**
     * 获取商品跑马灯图片列表
     *
     * @param goodsId
     * @return
     */
    public List<String> getGoodsShowPictures(Integer goodsId) {
        List<String> goodsShowPicturesUrls = new ArrayList<>();
        List<GoodsPictures> goodsShowPictures = goodsPicturesRepository.findAllByGoodsIdAndType(goodsId, GoodsPictures.SHOW_PIC);
        if (!CollectionUtils.isEmpty(goodsShowPictures)) {
            for (GoodsPictures goodsShowPicture : goodsShowPictures) {
                goodsShowPicturesUrls.add(goodsShowPicture.getRelativeUrl());
            }
        }

        return goodsShowPicturesUrls;
    }

    /**
     * 获取商品详情图片列表
     *
     * @param goodsId
     * @return
     */
    public List<String> getGoodsDescPictures(Integer goodsId) {
        List<String> goodsDescPicturesUrls = new ArrayList<>();
        List<GoodsPictures> goodsDescPictures = goodsPicturesRepository.findAllByGoodsIdAndType(goodsId, GoodsPictures.DESC_PIC);
        if (!CollectionUtils.isEmpty(goodsDescPictures)) {
            for (GoodsPictures goodsDescPicture : goodsDescPictures) {
                goodsDescPicturesUrls.add(goodsDescPicture.getRelativeUrl());
            }
        }

        return goodsDescPicturesUrls;
    }

    /**
     * 新增商品
     *
     * @param addGoodsRequest
     * @return
     */
    public Goods addGoods(AddGoodsRequest addGoodsRequest) {
        Goods goods = Goods.newDefaultGoods();
        BeanUtils.copyProperties(addGoodsRequest, goods);
        goods.setCurrentPrice(goods.getStartingPrice());

        Session session = sessionRepository.findOne(goods.getSessionId());
        session.setNumberOfGoods(session.getNumberOfGoods() + 1);
        goods.setStatus(session.getStatus());
        goods.setStartTime(session.getStartTime());
        goods.setEndTime(session.getEndTime());

        //从微信服务器下载图片
        LOGGER.info("开始从微信服务下载图片");
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
        LOGGER.info("结束从微信服务下载图片");

        return goods;
    }
}
