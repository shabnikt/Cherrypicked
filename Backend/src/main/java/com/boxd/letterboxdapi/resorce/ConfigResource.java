package com.boxd.letterboxdapi.resorce;

import com.boxd.letterboxdapi.model.Config;
import com.boxd.letterboxdapi.service.ConfigService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/config")
public class ConfigResource {
    private final ConfigService configService;

    public ConfigResource(ConfigService configService) {
        this.configService = configService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Config>> getAllConfigs() {
        List<Config> configs = configService.findAllConfigs();
        return new ResponseEntity<>(configs, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Config> updateConfig(@RequestBody Config config) {
        Config updatedConfig = configService.updateConfig(config);
        return new ResponseEntity<>(updatedConfig, HttpStatus.OK);
    }

}