package dragode.auction.repository;

import dragode.auction.model.BidRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 拍卖纪录DAO
 */
@Repository
public interface BidRecordRepository extends JpaRepository<BidRecord,Integer>{
    List<BidRecord> findAllByGoodsId(Integer goodsId);
}
