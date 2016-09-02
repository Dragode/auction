package dragode.auction.config;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.hibernate.jpa.HibernatePersistenceProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaDialect;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaDialect;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.spi.PersistenceProvider;
import javax.sql.DataSource;
import java.beans.PropertyVetoException;

/**
 *
 */
@Configuration
@PropertySource(value = {"classpath:c3p0.properties"})
@EnableJpaRepositories(
        basePackages = {
                "dragode.auction.repository"}
)
@EnableTransactionManagement(proxyTargetClass = true)
@EnableJpaAuditing
public class MySQLConfig {
    private static final Logger logger = LoggerFactory.getLogger(MySQLConfig.class);
    @Value("${c3p0.driverClass}")
    private String c3p0DriverClass;
    @Value("${c3p0.url}")
    private String c3p0Url;
    @Value("${c3p0.user}")
    private String c3p0User;
    @Value("${c3p0.password}")
    private String c3p0Password;
    @Value("${c3p0.initialPoolSize}")
    private int c3p0InitPoolSize;
    @Value("${c3p0.maxPoolSize}")
    private int c3p0MaxPoolSize;
    @Value("${c3p0.minPoolSize}")
    private int c3p0MinPoolSize;
    @Value("${c3p0.maxIdleTime}")
    private int c3p0MaxIdleTime;
    @Value("${c3p0.maxStatements}")
    private int c3p0MaxStatements;
    @Value("${c3p0.maxStatementsPerConnection}")
    private int c3p0MaxStatementsPerConnection;
    @Value("${c3p0.idleConnectionTestPeriod}")
    private int c3p0IdleConnectionTestPeriod;
    @Value("${c3p0.acquireIncrement}")
    private int c3p0AcquireIncrement;
    @Value("${c3p0.acquireRetryDelay}")
    private int c3p0AcquireRetryDelay;
    @Value("${c3p0.acquireRetryAttempts}")
    private int c3p0AcquireRetryAttempts;
    @Value("${c3p0.autoCommitOnClose}")
    private boolean c3p0AutoCommitOnClose;
    @Value("${c3p0.breakAfterAcquireFailure}")
    private boolean c3p0BreakAfterAcquireFailure;

    private ComboPooledDataSource dataSource;

    @Bean
    public DataSource dataSource() {
        if(null == dataSource) {
            dataSource = new ComboPooledDataSource();
            dataSource.setJdbcUrl(c3p0Url);
            dataSource.setUser(c3p0User);
            dataSource.setPassword(c3p0Password);
            dataSource = setDataSourceProperty(dataSource);
        }
        return dataSource;
    }

    private ComboPooledDataSource setDataSourceProperty(ComboPooledDataSource dataSource) {
        try {
            dataSource.setDriverClass(c3p0DriverClass);
            dataSource.setInitialPoolSize(c3p0InitPoolSize);
            dataSource.setMaxPoolSize(c3p0MaxPoolSize);
            dataSource.setMinPoolSize(c3p0InitPoolSize);
            dataSource.setMaxIdleTime(c3p0MaxIdleTime);
            dataSource.setMaxStatements(c3p0MaxStatements);
            dataSource.setMaxStatementsPerConnection(c3p0MaxStatementsPerConnection);
            dataSource.setIdleConnectionTestPeriod(c3p0IdleConnectionTestPeriod);
            dataSource.setAcquireIncrement(c3p0AcquireIncrement);
            dataSource.setAcquireRetryDelay(c3p0AcquireRetryDelay);
            dataSource.setAcquireRetryAttempts(c3p0AcquireRetryAttempts);
            dataSource.setAutoCommitOnClose(c3p0AutoCommitOnClose);
            dataSource.setBreakAfterAcquireFailure(c3p0BreakAfterAcquireFailure);
        } catch (PropertyVetoException e) {
            logger.error("MySQLConfig#setDataSourceProperty, mysql dataSource config property error");
        }
        return dataSource;
    }

    @Bean
    public JpaVendorAdapter jpaVendorAdapter() {
        HibernateJpaVendorAdapter hibernateJpaVendorAdapter = new HibernateJpaVendorAdapter();
        hibernateJpaVendorAdapter.setShowSql(false);
        hibernateJpaVendorAdapter.setGenerateDdl(true);
        hibernateJpaVendorAdapter.setDatabase(Database.MYSQL);
        hibernateJpaVendorAdapter.setDatabasePlatform("org.hibernate.dialect.MySQL5Dialect");
        return hibernateJpaVendorAdapter;
    }

    @Bean
    public JpaDialect jpaDialect() {
        return new HibernateJpaDialect();
    }

    @Bean
    public PersistenceProvider persistenceProvider() {
        return new HibernatePersistenceProvider();
    }
    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
        LocalContainerEntityManagerFactoryBean entityManagerFactory = new LocalContainerEntityManagerFactoryBean();
        entityManagerFactory.setDataSource(dataSource());
        entityManagerFactory.setPackagesToScan(
                "com.nd.smartq.interaction.exercise.repository",
                "com.nd.smartq.interaction.exercise.domain"
        );
        entityManagerFactory.setPersistenceProvider(persistenceProvider());
        entityManagerFactory.setJpaVendorAdapter(jpaVendorAdapter());
        entityManagerFactory.setJpaDialect(jpaDialect());
        entityManagerFactory.getJpaPropertyMap().put("hibernate.hbm2ddl.auto","update");
        return entityManagerFactory;
    }

    @Bean
    public PlatformTransactionManager transactionManager() {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(entityManagerFactory().getNativeEntityManagerFactory());
        return transactionManager;
    }

    /**
     * property文件解析配置
     */
    @Bean
    public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
        return new PropertySourcesPlaceholderConfigurer();
    }
}
