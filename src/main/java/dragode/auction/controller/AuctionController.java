package dragode.auction.controller;

import dragode.auction.common.Constant;
import dragode.auction.controller.response.BaseResponse;
import dragode.auction.controller.response.HttpResult;
import dragode.auction.service.Impl.AuctionService;
import dragode.auction.service.Impl.GoodsService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * 拍卖接口
 */
@RequestMapping(path = "/auctions")
public class AuctionController {

    @Resource
    private AuctionService auctionService;

    /**
     * 用户竞拍商品
     * @param goodsId
     * @param price
     * @param request
     * @return
     */
    //TODO 拍卖接口独立
    @PostMapping(path = "/goodsId/{goodsId}/price/{price}")
    public BaseResponse bidGoods(@PathVariable Integer goodsId,
                                 @PathVariable Long price,
                                 HttpServletRequest request){
        Integer userId = (Integer) request.getSession().getAttribute(Constant.USER_ID);
        try {
            auctionService.bid(goodsId,userId,price);
            return BaseResponse.successResponse();
        } catch (RuntimeException e) {
            if (StringUtils.equals("-1",e.getMessage())){
                return new BaseResponse(HttpResult.BID_MAX_PRICE_LESS_THEN_GOODS_CURRENT_PRICE);
            }else {
                throw e;
            }
        }
    }
}
