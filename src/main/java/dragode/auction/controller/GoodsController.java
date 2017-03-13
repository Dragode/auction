package dragode.auction.controller;

import com.alibaba.fastjson.JSON;
import dragode.auction.common.Constant;
import dragode.auction.controller.response.BaseListResponse;
import dragode.auction.controller.response.BaseResponse;
import dragode.auction.controller.response.GoodsResponse;
import dragode.auction.controller.response.HttpResult;
import dragode.auction.model.Goods;
import dragode.auction.service.Impl.GoodsService;
import dragode.auction.utils.HttpRequestUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * 商品接口
 */
@RestController
@RequestMapping(path = "/goods")
public class GoodsController {

    private static Logger logger = LoggerFactory.getLogger(GoodsController.class);

    @Resource
    private GoodsService goodsService;

    /**
     * 获取商品列表
     *
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public BaseListResponse<Goods> getGoods() {
        return new BaseListResponse<>(goodsService.findAll());
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

        Goods goods = goodsService.findOne(goodsId);
        BeanUtils.copyProperties(goods, goodsResponse);
        goodsResponse.setShowPictures(goodsService.getGoodsShowPictures(goodsId));
        goodsResponse.setDescPictures(goodsService.getGoodsDescPictures(goodsId));
        return goodsResponse;
    }

    /**
     * 新增商品
     *
     * @param addGoodsRequest
     * @param request
     * @return
     */
    //TODO 为什么会让/goods.html会405
    @RequestMapping(method = RequestMethod.POST)
    public Goods addGoods(@RequestBody AddGoodsRequest addGoodsRequest, HttpServletRequest request) {

        logRequestIfDebug(request);

        String requestParams = JSON.toJSONString(addGoodsRequest);
        logger.info("requestParams=" + requestParams);

        return goodsService.addGoods(addGoodsRequest);
    }

    private void logRequestIfDebug(HttpServletRequest request) {
        logger.info("[Method = " + request.getMethod() + "]" +
                "[Request = " + HttpRequestUtils.transferRequestToString(request) + "]");
    }

    /**
     * 注册商品拍卖开始通知用户
     *
     * @param goodsId
     * @param request
     * @return
     */
    //TODO 前端改成POST
    @RequestMapping(path = "/action/registerRemindOfAuctionStart/goodsId/{goodsId}", method = RequestMethod.GET)
    public BaseResponse registerRemindOfAuctionStart(@PathVariable Integer goodsId, HttpServletRequest request) {
        Integer userId = (Integer) request.getSession().getAttribute(Constant.USER_ID);
        goodsService.registerRemindOfAuctionStart(userId,goodsId);
        return BaseResponse.successResponse();
    }

    /**
     * 用户竞拍商品
     * @param goodsId
     * @param price
     * @param request
     * @return
     */
    //TODO 前端改成POST
    @RequestMapping(path = "/action/auction/goodsId/{goodsId}/price/{price}", method = RequestMethod.GET)
    public BaseResponse auctionGoods(@PathVariable Integer goodsId,@PathVariable Long price, HttpServletRequest request){
        Integer userId = (Integer) request.getSession().getAttribute(Constant.USER_ID);
        try {
            goodsService.auction(goodsId,userId,price);
            return BaseResponse.successResponse();
        } catch (RuntimeException e) {
            if (StringUtils.equals("-1",e.getMessage())){
                return new BaseResponse(HttpResult.BIDDING_HIGHER);
            }else {
                throw e;
            }
        }
    }

    /**
     * 用户设置代理价
     * @param goodsId
     * @param price
     * @param request
     * @return
     */
    //TODO 前端改成POST
    @RequestMapping(path = "/action/proxyAuction/goods/{goodsId}/price/{price}", method = RequestMethod.GET)
    public BaseResponse setProxyPrice(@PathVariable Integer goodsId,@PathVariable Long price, HttpServletRequest request){
        Integer userId = (Integer) request.getSession().getAttribute(Constant.USER_ID);
        try {
            goodsService.setProxyPrice(goodsId,userId,price);
            return BaseResponse.successResponse();
        } catch (RuntimeException e) {
            if (StringUtils.equals("-1",e.getMessage())){
                return new BaseResponse(HttpResult.BIDDING_HIGHER);
            }else {
                throw e;
            }
        }
    }
}
