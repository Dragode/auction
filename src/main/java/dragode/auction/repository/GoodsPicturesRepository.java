package dragode.auction.repository;

import dragode.auction.model.GoodsPictures;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Dracode on 2016/9/11.
 */
@Repository
public interface GoodsPicturesRepository extends JpaRepository<GoodsPictures, Integer> {
    List<GoodsPictures> findAllByGoodsId(Integer goodsId);
    List<GoodsPictures> findAllByGoodsIdAndType(Integer goodsId, String type);
}
