package dragode.auction.repository;

import dragode.auction.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 拍卖场DAO
 */
@Repository
public interface SessionRepository extends JpaRepository<Session, Integer> {
    List<Session> findAllByStatus(Integer status);
}
