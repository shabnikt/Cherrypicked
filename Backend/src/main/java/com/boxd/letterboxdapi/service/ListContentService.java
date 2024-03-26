package com.boxd.letterboxdapi.service;

import org.springframework.stereotype.Service;

import com.boxd.letterboxdapi.model.ListContent;
import com.boxd.letterboxdapi.model.Liste;
import com.boxd.letterboxdapi.repo.ListContentRepo;
import com.boxd.letterboxdapi.exception.EntityNotFoundException;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class ListContentService {
    private final ListContentRepo listRepo;

    public ListContentService(ListContentRepo listRepo) {
        this.listRepo = listRepo;
    }

    public ListContent addList(ListContent list) {
        list.setPkList(UUID.randomUUID());
        return listRepo.save(list);
    }

    public List<ListContent> findAllLists() {
        return listRepo.findAllByOrderByListName();
    }

    public ListContent updateList(ListContent list) {
        return listRepo.save(list);
    }

    public ListContent switchToggle(ListContent list){
        list.setListUse(!list.getListUse());
        return listRepo.save(list);
    }


    public ListContent findListById(UUID pkList) {
        return listRepo.findByPkList(pkList)
                .orElseThrow(() -> new EntityNotFoundException("List by id " + pkList + " was not found"));
    }

    public ListContent findByListAddress(String listAddress) {
        return listRepo.findByListAddress(listAddress)
                .orElseThrow(() -> new EntityNotFoundException("List by address " + listAddress + " was not found"));
    }

    public void deleteList(UUID pkList){
        listRepo.deleteByPkList(pkList);
    }
}
