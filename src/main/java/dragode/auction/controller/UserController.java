package dragode.auction.controller;

import dragode.auction.common.Constant;
import dragode.auction.controller.response.BaseListResponse;
import dragode.auction.controller.response.BaseResponse;
import dragode.auction.model.User;
import dragode.auction.service.Impl.UserService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * 用户接口
 */
@RestController
@RequestMapping(path = "/users")
public class UserController {

    @Resource
    private UserService userService;

    /**
     * 获取当前用户信息
     * @param httpServletRequest
     * @return
     */
    @RequestMapping(path = "/currentUser")
    public User getCurrentUser(HttpServletRequest httpServletRequest) {
        Integer userId = (Integer) httpServletRequest.getSession().getAttribute(Constant.USER_ID);
        if (null == userId) {
            //TODO 使用自建异常体系
            //TODO vue-resource拦截器处理这个异常
            throw new RuntimeException("User not login!");
        }
        User user = userService.findOne(userId);
        return user;
    }

    /**
     * 获取用户信息
     * @param userId
     * @return
     */
    @RequestMapping(path = "/{userId}",method = RequestMethod.GET)
    public User getUserInfo(@PathVariable Integer userId){
        return userService.findOne(userId);
    }

    /**
     * 获取所有用户
     * @return
     */
    @RequestMapping(path = "",method = RequestMethod.GET)
    public BaseListResponse<User> getAllUser(){
        return new BaseListResponse<>(userService.findAll());
    }

    /**
     * 修改用户信息
     * @param user
     * @return
     */
    @RequestMapping(path = "",method = RequestMethod.PUT)
    public BaseResponse updateUser(@RequestBody User user){
        userService.save(user);
        return BaseResponse.successResponse();
    }
}
