package com.boxd.letterboxdapi.resorce;
import com.boxd.letterboxdapi.model.Liste;
import com.boxd.letterboxdapi.service.ListeService;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/list")
public class ListeResource {
private ListeService listeService;

    public ListeResource(ListeService listeService) {
        this.listeService = listeService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Liste>> getAllFilms () {
        List<Liste> lists = listeService.findAllLists();
        return new ResponseEntity<>(lists, HttpStatus.OK);
    }

    @GetMapping("/find/{pkList}")
    public ResponseEntity<Liste> getListById (@PathVariable("pkList") UUID pkList) {
        Liste list = listeService.findListById(pkList);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/address/{listAddress}")
    public ResponseEntity<Liste> getListByListAddress (@PathVariable("listAddress") String listAddress) {
        Liste list = listeService.findByListAddress(listAddress);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Liste> addList(@RequestBody Liste list) {
        Liste newList = listeService.addList(list);
        return new ResponseEntity<>(newList, HttpStatus.CREATED);
    }

    // @PutMapping("/update")
    // public ResponseEntity<Liste> updateList(@RequestBody Liste list) {
    //     Liste updatedList = listeService.updateList(list);
    //     return new ResponseEntity<>(updatedList, HttpStatus.OK);
    // }

    @PutMapping("/update/{pkList}")
    public ResponseEntity<Liste> updateList(@PathVariable("pkList") UUID pkList, @RequestBody String str) {
        Liste list = listeService.findListById(pkList);
        Liste updatedList = listeService.switchToggle(list);
        return new ResponseEntity<>(updatedList, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{pkList}")
    public ResponseEntity<?> deleteList(@PathVariable("pkList") UUID pkList) {
        listeService.deleteList(pkList);
        return new ResponseEntity<>(HttpStatus.OK);
    } 
}
