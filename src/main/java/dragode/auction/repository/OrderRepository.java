package dragode.auction.repository;

import dragode.auction.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 订单DAO
 */
@Repository
public interface OrderRepository extends JpaRepository<Order,Integer>{
    List<Order> findAllByUserId(Integer userId);
}
