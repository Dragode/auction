package dragode.auction.controller;

import dragode.auction.common.Constant;
import dragode.auction.controller.response.BaseListResponse;
import dragode.auction.controller.response.BaseResponse;
import dragode.auction.model.AuctionReminder;
import dragode.auction.repository.AuctionReminderRepository;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * 提醒相关接口
 */
@RestController
@RequestMapping(path = "/reminds")
public class RemindController {

    @Resource
    private AuctionReminderRepository auctionReminderRepository;

    /**
     * 获取用户订阅的所有提醒类型
     *
     * @param request
     * @return
     */
    @RequestMapping(path = "", method = RequestMethod.GET)
    public BaseListResponse<Integer> getRegisteredRemindOfUser(HttpServletRequest request) {
        Integer userId = (Integer) request.getSession().getAttribute(Constant.USER_ID);

        List<AuctionReminder> registeredRemindOfUser = auctionReminderRepository.findAllByuserId(userId);
        BaseListResponse<Integer> response = new BaseListResponse<>();
        response.setItems(new ArrayList<Integer>());
        for (AuctionReminder auctionReminder : registeredRemindOfUser) {
            response.getItems().add(auctionReminder.getRemindType());
        }
        return response;
    }

    /**
     * 注册商品拍卖相关通知
     *
     * @param goodsId
     * @param remindType
     * @param request
     * @return
     */
    @RequestMapping(path = "/goodsId/{goodsId}", method = RequestMethod.POST)
    public BaseResponse registerRemind(@PathVariable Integer goodsId,
                                       @RequestBody Integer remindType,
                                       HttpServletRequest request) {
        Integer userId = (Integer) request.getSession().getAttribute(Constant.USER_ID);
        AuctionReminder auctionReminder = new AuctionReminder();
        auctionReminder.setGoodsId(goodsId);
        auctionReminder.setUserId(userId);
        auctionReminder.setRemindType(remindType);
        auctionReminderRepository.save(auctionReminder);
        return BaseResponse.successResponse();
    }
}
