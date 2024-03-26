package com.boxd.letterboxdapi.repo;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import com.boxd.letterboxdapi.model.Liste;

public interface ListeRepo extends JpaRepository<Liste, UUID> {
    Optional<Liste> findByPkList(UUID pkList);
    Optional<Liste> findByListAddress(String listAddress);
    List<Liste> findAllByOrderByListName();
    void deleteByPkList(UUID pkList);
}
