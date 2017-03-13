package dragode.auction.repository;

import dragode.auction.model.AuctionReminder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 拍卖开始提醒DAO
 */
@Repository
public interface AuctionReminderRepository extends JpaRepository<AuctionReminder, Integer> {
    List<AuctionReminder> findAllByGoodsId(Integer sessionId);
}
