package com.site.blog.my.core.service;

import java.util.Map;

public interface ConfigService {
    /**
     * Edit configuration
     *
     * @param configName
     * @param configValue
     * @return
     */
    int updateConfig(String configName, String configValue);

    /**
     * Get configuration
     *
     * @return
     */
    Map<String,String> getAllConfigs();
}
