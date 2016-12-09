package dragode.auction.service.Impl;

import dragode.wechat.intf.TemplateMessage;
import dragode.wechat.intf.WxInterface;
import dragode.auction.model.SessionReminder;
import dragode.auction.repository.SessionReminderRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;

/**
 * ******************************************
 * <p/>
 * Copyright 2016
 * NetDragon All rights reserved
 * <p/>
 * *****************************************
 * <p/>
 * *** Company ***
 * NetDragon
 * <p/>
 * *****************************************
 * <p/>
 * *** Team ***
 * SmartQ
 * <p/>
 * *****************************************
 *
 * @author 俞建龙(300116)
 * @version V1.0
 * @Title TaskService
 * @Package dragode.auction.service.Impl
 * <p/>
 * *****************************************
 * @Description
 * @date 2016/9/5 0005
 */
@Service
public class TaskService {

    @Resource
    private SessionReminderRepository sessionReminderRepository;

    @Scheduled(fixedDelay = 1000)
    public void checkUserToRemind() {
        /*List<SessionReminder> all = sessionReminderRepository.findAllByStatus(SessionReminder.WAIT_FOR_REMIND);
        Date now = new Date();
        long nowTime = now.getTime();
        for (SessionReminder sessionReminder : all) {
            if (sessionReminder.getSessionStartTime().getTime() - nowTime >= 0) {
                remindUser(sessionReminder);
            }
        }*/
    }

    //TODO 异步执行
    public void remindUser(SessionReminder sessionReminder) {
        String templateId = "ADHrbX8R1mB736XPDyT9HNxD4-3EIhqE--2go8YrVlA";
        String topcolor = "#FF0000";
        String url = "http://119.29.159.58/auctionList.html";
        HashMap<String, TemplateMessage.DataItem> stringDataItemHashMap = new HashMap<>();
        TemplateMessage.DataItem name = new TemplateMessage.DataItem();
        name.setValue("nameToSet");
        name.setColor("#173177");
        stringDataItemHashMap.put("name", name);
        WxInterface.sendTemplateMessage(templateId, sessionReminder.getOpenId(), topcolor, url, stringDataItemHashMap);

        sessionReminder.setStatus(SessionReminder.REMINDED);
        sessionReminderRepository.save(sessionReminder);
    }
}
