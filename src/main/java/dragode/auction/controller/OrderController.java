package dragode.auction.controller;

import dragode.auction.common.Constant;
import dragode.auction.controller.response.BaseListResponse;
import dragode.auction.controller.response.BaseResponse;
import dragode.auction.model.Order;
import dragode.auction.repository.OrderRepository;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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
     * 订单支付成功
     *
     * @param orderId
     * @return
     */
    @RequestMapping(path = "/action/userPayed/orderId/{orderId}", method = RequestMethod.POST)
    public BaseResponse userPayed(@PathVariable Integer orderId) {
        Order order = orderRepository.findOne(orderId);
        order.setStatus(Order.OrderStatus.PAY_SUCCESS.getCode());
        orderRepository.save(order);
        return BaseResponse.successResponse();
    }

    /**
     * 订单发货
     *
     * @param orderId
     * @return
     */
    @RequestMapping(path = "/action/deliverGoods/orderId/{orderId}", method = RequestMethod.POST)
    public BaseResponse deliverGoods(@PathVariable Integer orderId) {
        Order order = orderRepository.findOne(orderId);
        order.setStatus(Order.OrderStatus.DILIVERED.getCode());
        orderRepository.save(order);
        return BaseResponse.successResponse();
    }

    /**
     * 用户收到订单
     *
     * @param orderId
     * @return
     */
    @RequestMapping(path = "/action/receiveGoods/orderId/{orderId}", method = RequestMethod.POST)
    public BaseResponse receiveGoods(@PathVariable Integer orderId) {
        Order order = orderRepository.findOne(orderId);
        order.setStatus(Order.OrderStatus.FINISH.getCode());
        orderRepository.save(order);
        return BaseResponse.successResponse();
    }
}
