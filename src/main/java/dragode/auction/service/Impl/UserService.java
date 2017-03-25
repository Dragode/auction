package dragode.auction.service.Impl;

import dragode.auction.model.User;
import dragode.auction.repository.UserRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 用户服务
 */
@Service
public class UserService {

    @Resource
    private UserRepository userRepository;

    /**
     * 获取用户信息
     * @param userId
     * @return
     */
    public User findOne(Integer userId){
        return userRepository.findOne(userId);
    }

    /**
     * 获取openId的用户
     * @param openId
     * @return
     */
    public User findByOpenId(String openId){
        return userRepository.findByOpenId(openId);
    }

    /**
     * 获取所有用户
     * @return
     */
    public List<User> findAll(){
        return userRepository.findAll();
    }

    /**
     * 保存、更新用户信息
     * @param user
     */
    public void save(User user){
        userRepository.save(user);
    }

    /**
     * 添加用户
     * @param openId
     * @param ifSubcribe
     */
    public void addUser(String openId,Boolean ifSubcribe) {
        User user = new User();
        user.setOpenId(openId);
        user.setBalance(0);
        user.setRole(User.NORMAL_USER);
        user.setSubscribed(ifSubcribe);
        userRepository.save(user);
    }
}
