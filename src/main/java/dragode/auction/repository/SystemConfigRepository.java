package dragode.auction.repository;

import dragode.auction.model.SystemConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 系统相关配置DAO
 */
@Repository
public interface SystemConfigRepository extends JpaRepository<SystemConfig, Integer> {
    SystemConfig findByConfigKey(String configKey);
}
