package dragode.auction.repository;

import dragode.auction.model.ProxyAuction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 代理拍卖DAO
 */
@Repository
public interface ProxyAuctionRepository extends JpaRepository<ProxyAuction,Integer>{
    List<ProxyAuction> findByStatus(String status);
    List<ProxyAuction> findByStatusAndGoodsId(String status,Integer goodsId);
}
