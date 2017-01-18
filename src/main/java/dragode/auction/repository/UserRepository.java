package dragode.auction.repository;

import dragode.auction.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *用户DAO
 */
@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    User findByOpenId(String openId);
}
