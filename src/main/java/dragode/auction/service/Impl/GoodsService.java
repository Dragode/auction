package dragode.auction.service.Impl;

import dragode.auction.common.Constant;
import dragode.auction.controller.AddGoodsRequest;
import dragode.auction.model.*;
import dragode.auction.repository.*;
import dragode.wechat.intf.TemplateMessage;
import dragode.wechat.intf.WxInterface;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * 商品服务
 */
@Service
public class GoodsService {

    @Resource
    private GoodsRepository goodsRepository;
    @Resource
    private GoodsPicturesRepository goodsPicturesRepository;
    @Resource
    private AuctionReminderRepository auctionReminderRepository;
    @Resource
    private AuctionRecordRepository auctionRecordRepository;
    @Resource
    private UserRepository userRepository;
    @Resource
    private ProxyAuctionRepository proxyAuctionRepository;

    /**
     * 获取商品列表
     *
     * @return
     */
    public List<Goods> findAll() {
        return goodsRepository.findAll();
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
     * @param addGoodsRequest
     * @return
     */
    public Goods addGoods(AddGoodsRequest addGoodsRequest) {
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

    /**
     * 注册用户拍卖开始通知
     * @param userId
     * @param goodsId
     */
    public void registerRemindOfAuctionStart(Integer userId, Integer goodsId) {
        AuctionReminder auctionReminder = new AuctionReminder();
        auctionReminder.setGoodsId(goodsId);
        auctionReminder.setUserId(userId);
        auctionReminderRepository.save(auctionReminder);
    }

    /**
     * 用户竞拍商品
     * @param goodsId
     * @param userId
     */
    public void auction(Integer goodsId,Integer userId,Long price){
        Goods goods = goodsRepository.findOne(goodsId);
        Long currentPrice = goods.getCurrentPrice();
        if (currentPrice >= price) {
            //TODO 封装通用异常体系
            throw new RuntimeException("-1");
        }

        //增加拍卖纪录
        AuctionRecord auctionRecord = new AuctionRecord();
        auctionRecord.setUserId(userId);
        auctionRecord.setGoodsId(goodsId);
        auctionRecord.setPrice(price);
        auctionRecordRepository.save(auctionRecord);

        //修改物品拍卖状态
        goods.setCurrentPrice(price);
        goods.setAuctionUserId(userId);
        goodsRepository.save(goods);

        //出价被超过提醒
        if (goods.getAuctionUserId() != userId) {
            remindUserOfBidOver(userId, goods);
        }
    }

    /**
     * 通知用户竞拍出价被超过
     */
    private void remindUserOfBidOver(Integer userId,Goods goods){
        User user = userRepository.findOne(userId);
        String templateId = "iyu51Ee1S8F9Wf-ZX6lBMltv-nONEu3lQvog5W3fDF8";
        String topcolor = "#FF0000";
        String url = "http://119.29.159.58/auctionList.html";
        HashMap<String, TemplateMessage.DataItem> stringDataItemHashMap = new HashMap<>();
        TemplateMessage.DataItem name = new TemplateMessage.DataItem();
        name.setValue(goods.getTitle());
        name.setColor("#173177");
        stringDataItemHashMap.put("name", name);
        WxInterface.sendTemplateMessage(templateId, user.getOpenId(), topcolor, url, stringDataItemHashMap);
    }

    /**
     * 用户设置代理价
     * @param goodsId
     * @param userId
     * @param price
     */
    public void setProxyPrice(Integer goodsId,Integer userId,Long price){
        Goods goods = goodsRepository.findOne(goodsId);
        Long currentPrice = goods.getCurrentPrice();
        if (currentPrice >= price) {
            throw new RuntimeException("-1");
        }

        goods.setCurrentPrice(goods.getCurrentPrice()+goods.getBidIncrement());
        goods.setAuctionUserId(userId);
        goodsRepository.save(goods);

        ProxyAuction proxyAuction = new ProxyAuction();
        proxyAuction.setUserId(userId);
        proxyAuction.setGoodsId(goodsId);
        proxyAuction.setPrice(price);
        proxyAuction.setStatus(ProxyAuction.UNDER_PROXY);
        proxyAuctionRepository.save(proxyAuction);
    }

}
