package dragode.auction.controller;

import dragode.auction.common.Constant;
import dragode.auction.controller.response.BaseListResponse;
import dragode.auction.controller.response.BaseResponse;
import dragode.auction.model.Order;
import dragode.auction.model.User;
import dragode.auction.repository.OrderRepository;
import dragode.auction.service.Impl.WxReminderService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 订单接口
 */
@RestController
@RequestMapping(path = "/orders")
public class OrderController {
    @Resource
    private OrderRepository orderRepository;

    @Resource
    private WxReminderService wxReminderService;

    /**
     * 获取用户的订单列表
     *
     * @param request
     * @return
     */
    @RequestMapping(path = "", method = RequestMethod.GET)
    public BaseListResponse<Order> getOrdersOfUser(HttpServletRequest request) {
        Integer userId = (Integer) request.getSession().getAttribute(Constant.USER_ID);
        List<Order> orders = orderRepository.findAllByUserId(userId);
        return new BaseListResponse<>(orders);
    }

    /**
     * 获取订单列表
     *
     * @return
     */
    @RequestMapping(path = "/all", method = RequestMethod.GET)
    public BaseListResponse<Order> allOrders() {
        List<Order> orders = orderRepository.findAll();
        return new BaseListResponse<>(orders);
    }

    /**
     * 修改订单
     *
     * @return
     */
    @RequestMapping(path = "", method = RequestMethod.PUT)
    public BaseResponse updateOrder(@RequestBody Order order) {
        orderRepository.save(order);
        if (order.getStatus().equals(Order.OrderStatus.DILIVERED.getCode())){
            wxReminderService.remindUserOfGoodsDelivered(order);
        }
        return BaseResponse.successResponse();
    }
}
