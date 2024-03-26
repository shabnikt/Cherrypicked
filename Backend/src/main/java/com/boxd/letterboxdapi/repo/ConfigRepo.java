package com.boxd.letterboxdapi.repo;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boxd.letterboxdapi.model.Config;

public interface ConfigRepo extends JpaRepository<Config,UUID> {
    List<Config> findAllByOrderByPkConfig();
}