package com.boxd.letterboxdapi.service;

import org.springframework.stereotype.Service;

import com.boxd.letterboxdapi.model.Config;
import com.boxd.letterboxdapi.repo.ConfigRepo;

import jakarta.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ConfigService {
    private final ConfigRepo configRepo;

    public ConfigService(ConfigRepo configRepo) {
        this.configRepo = configRepo;
    }

    public List<Config> findAllConfigs() {
        return configRepo.findAllByOrderByPkConfig();
    }

    public Config updateConfig(Config config) {
        return configRepo.save(config);
    }
}