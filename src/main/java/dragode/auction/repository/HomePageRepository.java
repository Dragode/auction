package dragode.auction.repository;

import dragode.auction.model.HomePage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Dracode on 2016/10/23.
 */
@Repository
public interface HomePageRepository extends JpaRepository<HomePage,Integer>{
}
