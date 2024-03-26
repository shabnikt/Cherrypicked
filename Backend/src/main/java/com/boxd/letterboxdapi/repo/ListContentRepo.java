package com.boxd.letterboxdapi.repo;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import com.boxd.letterboxdapi.model.ListContent;

public interface ListContentRepo extends JpaRepository<ListContent, UUID> {
    Optional<ListContent> findByPkList(UUID pkList);
    Optional<ListContent> findByListAddress(String listAddress);
    List<ListContent> findAllByOrderByListName();
    void deleteByPkList(UUID pkList);
}