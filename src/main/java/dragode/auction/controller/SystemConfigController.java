package dragode.auction.controller;

import dragode.auction.common.Constant;
import dragode.auction.model.SystemConfig;
import dragode.auction.repository.SystemConfigRepository;
import dragode.wechat.intf.WxInterface;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * 系统配置参数接口
 */
@RestController
@RequestMapping("/systemConfigs")
public class SystemConfigController {

    public static final String HOME_BANNER_KEY = "HOME_BANNER_KEY";

    @Resource
    private SystemConfigRepository systemConfigRepository;

    @RequestMapping(path = "/configKey/{configKey}",method = RequestMethod.GET)
    public SystemConfig getSystemConfig(@PathVariable String configKey){
        return systemConfigRepository.findByConfigKey(configKey);
    }

    @RequestMapping(path = "",method = RequestMethod.POST)
    public SystemConfig addSystemConfig(@RequestBody SystemConfig systemConfig){
        systemConfigRepository.save(systemConfig);
        return systemConfig;
    }

    @RequestMapping(path = "",method = RequestMethod.PUT)
    public SystemConfig updateSystemConfig(@RequestBody SystemConfig systemConfig){
        systemConfigRepository.save(systemConfig);
        return systemConfig;
    }

    /**
     * 设置首页Banner的图片地址
     *
     * @param homeBannerWxServerId
     * @return
     */
    //TODO 抽取统一的保存微信图片接口
    @RequestMapping(path = "/homeBanner", method = RequestMethod.POST)
    public SystemConfig setHomeBanner(@RequestBody String homeBannerWxServerId) {
        WxInterface.downloadMediaFile(homeBannerWxServerId, Constant.PICS_PATH);
        SystemConfig homeBanner = systemConfigRepository.findByConfigKey(HOME_BANNER_KEY);
        homeBanner.setValue(Constant.PICTURE_CONTEXT_PATH + "/" + homeBannerWxServerId);
        systemConfigRepository.save(homeBanner);
        return homeBanner;
    }
}
