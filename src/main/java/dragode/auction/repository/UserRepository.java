package dragode.auction.repository;

import dragode.auction.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 *用户DAO
 */
@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    User findByOpenId(String openId);
    List<User> findAllByRole(String role);
}
