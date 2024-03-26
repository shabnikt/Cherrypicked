package com.boxd.letterboxdapi.resorce;
import com.boxd.letterboxdapi.model.ListContent;
import com.boxd.letterboxdapi.model.Liste;
import com.boxd.letterboxdapi.service.ListContentService;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/list-content")
public class ListContentResource {
private ListContentService listService;

    public ListContentResource(ListContentService listService) {
        this.listService = listService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<ListContent>> getAllFilms () {
        List<ListContent> lists = listService.findAllLists();
        return new ResponseEntity<>(lists, HttpStatus.OK);
    }

    @GetMapping("/find/{pkList}")
    public ResponseEntity<ListContent> getListById (@PathVariable("pkList") UUID pkList) {
        ListContent list = listService.findListById(pkList);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

        @GetMapping("/address/{listAddress}")
    public ResponseEntity<ListContent> getListByListAddress (@PathVariable("listAddress") String listAddress) {
        ListContent list = listService.findByListAddress(listAddress);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<ListContent> addList(@RequestBody ListContent list) {
        ListContent newList = listService.addList(list);
        return new ResponseEntity<>(newList, HttpStatus.CREATED);
    }

    // @PutMapping("/update")
    // public ResponseEntity<ListContent> updateList(@RequestBody ListContent list) {
    //     ListContent updatedList = listService.updateList(list);
    //     return new ResponseEntity<>(updatedList, HttpStatus.OK);
    // }

    @PutMapping("/update/{pkList}")
    public ResponseEntity<ListContent> updateList(@PathVariable("pkList") UUID pkList) {
        ListContent list = listService.findListById(pkList);
        ListContent updatedList = listService.updateList(list);
        return new ResponseEntity<>(updatedList, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{pkList}")
    public ResponseEntity<?> deleteList(@PathVariable("pkList") UUID pkList) {
        listService.deleteList(pkList);
        return new ResponseEntity<>(HttpStatus.OK);
    } 
}