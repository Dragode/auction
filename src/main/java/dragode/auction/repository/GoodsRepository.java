package dragode.auction.repository;

import dragode.auction.model.Goods;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 商品DAO
 */
@Repository
public interface GoodsRepository extends JpaRepository<Goods,Integer> {
    List<Goods> findAllByStatus(Integer status);
    List<Goods> findAllBySessionId(Integer sessionId);
}
