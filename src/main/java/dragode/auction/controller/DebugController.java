package dragode.auction.controller;

import dragode.auction.common.Constant;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * 调试接口
 */
@RestController
@RequestMapping(path = "/debug")
public class DebugController {
    @RequestMapping("/setUser/{userId}")
    public String setUser(@PathVariable Integer userId,
                          HttpServletRequest httpServletRequest) {
        Assert.notNull(userId);
        httpServletRequest.getSession().setAttribute(Constant.USER_ID, userId);
        return "success";
    }
}
