package dragode.auction.service.Impl;

import dragode.auction.model.Goods;
import dragode.auction.model.ProxyBid;
import dragode.auction.repository.GoodsRepository;
import dragode.auction.repository.ProxyBidRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.annotation.Resource;

/**
 * 代理出价服务
 */
@Service
public class ProxyBidService {

    @Resource
    private GoodsRepository goodsRepository;
    @Resource
    private ProxyBidRepository proxyBidRepository;
    @Resource
    private AuctionService auctionService;

    /**
     * 用户设置代理价
     *
     * @param proxyBid 代理出价
     */
    public void setProxyBid(ProxyBid proxyBid) {
        Assert.notNull(proxyBid);
        Assert.notNull(proxyBid.getGoodsId());
        Assert.notNull(proxyBid.getUserId());
        Assert.notNull(proxyBid.getMaxPrice());

        Goods goods = goodsRepository.findOne(proxyBid.getGoodsId());
        if (goods.getCurrentPrice() >= proxyBid.getMaxPrice()) {
            //TODO 自建异常体系
            throw new RuntimeException("-1");
        }

        //拍一手
        if (!goods.getAuctionUserId().equals(proxyBid.getUserId())) {
            auctionService.bid(proxyBid.getGoodsId(), proxyBid.getUserId(), goods.getCurrentPrice() + goods.getBidIncrement());
        }

        proxyBid.setStatus(ProxyBid.UNDER_PROXY);
        proxyBidRepository.save(proxyBid);
    }
}
