package dragode.auction.controller;

import dragode.auction.common.Constant;
import dragode.auction.controller.response.BaseResponse;
import dragode.auction.controller.response.HttpResult;
import dragode.auction.model.ProxyBid;
import dragode.auction.service.Impl.ProxyBidService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * 代理价接口
 */
@RequestMapping(path = "/proxyBids")
public class ProxyBidController {

    @Resource
    private ProxyBidService proxyBidService;

    /**
     * 用户设置代理价
     * @param proxyBid
     * @param request
     * @return
     */
    @PostMapping(path = "")
    public BaseResponse setProxyBid(@RequestBody ProxyBid proxyBid,
                                      HttpServletRequest request){
        Integer userId = (Integer) request.getSession().getAttribute(Constant.USER_ID);
        proxyBid.setUserId(userId);

        try {
            proxyBidService.setProxyBid(proxyBid);
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
