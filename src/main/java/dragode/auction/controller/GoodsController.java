package dragode.auction.controller;

import dragode.auction.controller.request.AddGoodsRequest;
import dragode.auction.controller.response.BaseListResponse;
import dragode.auction.controller.response.GoodsResponse;
import dragode.auction.model.BidRecord;
import dragode.auction.model.Goods;
import dragode.auction.repository.BidRecordRepository;
import dragode.auction.service.Impl.GoodsService;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * 商品接口
 */
@RestController
@RequestMapping(path = "/goods")
public class GoodsController {

    @Resource
    private GoodsService goodsService;
    @Resource
    private BidRecordRepository bidRecordRepository;

    /**
     * 获取专场对应的商品列表
     *
     * @param sessionId 专场ID
     * @return 商品列表
     */
    @GetMapping(path = "/sessionId/{sessionId}")
    public BaseListResponse<Goods> getGoodsOfSession(@PathVariable Integer sessionId) {
        return new BaseListResponse<>(goodsService.findBySessionId(sessionId));
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
        //TODO 用Hibernate实体中直接关联？
        goodsResponse.setShowPictures(goodsService.getGoodsShowPictures(goodsId));
        goodsResponse.setDescPictures(goodsService.getGoodsDescPictures(goodsId));
        return goodsResponse;
    }

    /**
     * 新增商品
     *
     * @param addGoodsRequest
     * @return
     */
    @PostMapping(path = "")
    public Goods addGoods(@RequestBody AddGoodsRequest addGoodsRequest) {
        return goodsService.addGoods(addGoodsRequest);
    }

    /**
     * 获取商品的拍卖记录
     * @param goodsId
     * @return
     */
    @RequestMapping(value = "/{goodsId}/records")
    public BaseListResponse<BidRecord> records(@PathVariable Integer goodsId) {
        Sort sort = new Sort(Sort.Direction.DESC, "bidTime");
        Pageable pageable = new PageRequest(0, 4, sort);
        return new BaseListResponse(bidRecordRepository.findAllByGoodsId(goodsId,pageable));
    }
}
