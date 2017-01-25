package dragode.auction.repository;

import dragode.auction.model.AuctionRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 拍卖纪录DAO
 */
@Repository
public interface AuctionRecordRepository extends JpaRepository<AuctionRecord,Integer>{
    List<AuctionRecord> findAllByGoodsId(Integer goodsId);
}
