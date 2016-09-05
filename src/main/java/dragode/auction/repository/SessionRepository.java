package dragode.auction.repository;

import dragode.auction.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * ******************************************
 * <p/>
 * Copyright 2016
 * NetDragon All rights reserved
 * <p/>
 * *****************************************
 * <p/>
 * *** Company ***
 * NetDragon
 * <p/>
 * *****************************************
 * <p/>
 * *** Team ***
 * SmartQ
 * <p/>
 * *****************************************
 *
 * @author 俞建龙(300116)
 * @version V1.0
 * @Title SessionRepository
 * @Package dragode.auction.repository
 * <p/>
 * *****************************************
 * @Description
 * @date 2016/9/5 0005
 */
@Repository
public interface SessionRepository extends JpaRepository<Session,Integer> {
}
