package dragode.auction.controller;

import dragode.auction.common.Constant;
import dragode.auction.controller.response.BaseListResponse;
import dragode.auction.controller.response.BaseResponse;
import dragode.auction.model.User;
import dragode.auction.repository.UserRepository;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * 用户接口
 */
@RestController
@RequestMapping(path = "/users")
public class UserController {

    @Resource
    private UserRepository userRepository;

    @RequestMapping(path = "/currentUser")
    public User getCurrentUser(HttpServletRequest httpServletRequest) {
        Integer userId = (Integer) httpServletRequest.getSession().getAttribute(Constant.USER_ID);
        if (null == userId) {
            throw new RuntimeException("User not login!");
        }
        User user = userRepository.findOne(userId);
        return user;
    }

    /**
     * 获取用户信息
     * @param userId
     * @return
     */
    @RequestMapping(path = "/{userId}",method = RequestMethod.GET)
    public User getUserInfo(@PathVariable Integer userId){
        return userRepository.findOne(userId);
    }

    /**
     * 获取所有用户
     * @return
     */
    @RequestMapping(path = "",method = RequestMethod.GET)
    public BaseListResponse<User> getAllUser(){
        return new BaseListResponse<>(userRepository.findAll());
    }

    /**
     * 升级用户成会员
     * @param userId
     * @return
     */
    @RequestMapping(path = "/action/promotionToMember/userId/{userId}",method = RequestMethod.POST)
    public BaseResponse promotionToMember(@PathVariable Integer userId){
        User user = userRepository.findOne(userId);
        user.setRole(User.MEMBER_USER);
        userRepository.save(user);
        return BaseResponse.successResponse();
    }

    /**
     * 降低用户成普通用户
     * @param userId
     * @return
     */
    @RequestMapping(path = "/action/demotionToNormal/userId/{userId}",method = RequestMethod.POST)
    public BaseResponse demotionToNormal(@PathVariable Integer userId){
        User user = userRepository.findOne(userId);
        user.setRole(User.NORMAL_USER);
        userRepository.save(user);
        return BaseResponse.successResponse();
    }
}
