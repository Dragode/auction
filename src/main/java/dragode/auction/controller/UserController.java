package dragode.auction.controller;

import dragode.auction.common.Constant;
import dragode.auction.model.User;
import dragode.auction.repository.UserRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * 用户接口
 */
@RestController
@RequestMapping(path = "/user")
public class UserController {

    @Resource
    private UserRepository userRepository;

    @RequestMapping
    public User getUser(HttpServletRequest httpServletRequest) {
        Integer userId = (Integer) httpServletRequest.getSession().getAttribute(Constant.USER_ID);
        if (null == userId) {
            throw new RuntimeException("User not login!");
        }
        User user = userRepository.findOne(userId);
        return user;
    }
}
