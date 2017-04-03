package dragode.auction.controller;

import dragode.auction.model.SystemConfig;
import dragode.auction.repository.SystemConfigRepository;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * 系统配置参数接口
 */
@RestController
@RequestMapping("/systemConfigs")
public class SystemConfigController {

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
}
