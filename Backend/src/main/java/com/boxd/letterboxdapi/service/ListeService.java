
package com.boxd.letterboxdapi.service;

import org.springframework.stereotype.Service;

import com.boxd.letterboxdapi.model.Liste;
import com.boxd.letterboxdapi.repo.ListeRepo;
import com.boxd.letterboxdapi.exception.EntityNotFoundException;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class ListeService {
    private final ListeRepo listeRepo;

    public ListeService(ListeRepo listRepo) {
        this.listeRepo = listRepo;
    }

    public Liste addList(Liste list) {
        list.setPkList(UUID.randomUUID());
        return listeRepo.save(list);
    }

    public List<Liste> findAllLists() {
        return listeRepo.findAllByOrderByListName();
    }

    public Liste updateList(Liste list) {
        return listeRepo.save(list);
    }

    public Liste switchToggle(Liste list){
        list.setListUse(!list.getListUse());
        return listeRepo.save(list);
    }

    public Liste findListById(UUID pkList) {
        return listeRepo.findByPkList(pkList)
                .orElseThrow(() -> new EntityNotFoundException("List by id " + pkList + " was not found"));
    }

    public Liste findByListAddress(String listAddress) {
        return listeRepo.findByListAddress(listAddress)
                .orElseThrow(() -> new EntityNotFoundException("List by address " + listAddress + " was not found"));
    }

    public void deleteList(UUID pkList){
        listeRepo.deleteByPkList(pkList);
    }
}
