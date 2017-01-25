package dragode.auction.repository;

import dragode.auction.model.HomePage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 首页DAO
 */
@Repository
public interface HomePageRepository extends JpaRepository<HomePage,Integer>{
}
