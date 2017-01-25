package dragode.auction.repository;

import dragode.auction.model.SessionReminder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 拍卖开始提醒DAO
 */
@Repository
public interface SessionReminderRepository extends JpaRepository<SessionReminder, Integer> {

    List<SessionReminder> findAllByStatus(String status);
    List<SessionReminder> findAllBySessionId(Integer sessionId);
}
