package dragode.auction.repository;

import dragode.auction.model.ProxyBid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 代理拍卖DAO
 */
@Repository
public interface ProxyBidRepository extends JpaRepository<ProxyBid,Integer>{
    List<ProxyBid> findByStatus(String status);
    List<ProxyBid> findByStatusAndGoodsId(String status, Integer goodsId);
}
