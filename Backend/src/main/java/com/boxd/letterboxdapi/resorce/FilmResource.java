package com.boxd.letterboxdapi.resorce;

import com.boxd.letterboxdapi.model.Film;
import com.boxd.letterboxdapi.service.FilmService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/film")
public class FilmResource {
    private final FilmService filmService;

    public FilmResource(FilmService filmService) {
        this.filmService = filmService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Film>> getAllFilms () {
        List<Film> films = filmService.findAllFilms();
        return new ResponseEntity<>(films, HttpStatus.OK);
    }

    @GetMapping("/find/{pkFilm}")
    public ResponseEntity<Film> getFilmById (@PathVariable("pkFilm") UUID pkFilm) {
        Film film = filmService.findFilmById(pkFilm);
        return new ResponseEntity<>(film, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Film> addFilm(@RequestBody Film film) {
        Film newFilm = filmService.addFilm(film);
        return new ResponseEntity<>(newFilm, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Film> updateFilm(@RequestBody Film film) {
        Film updatedFilm = filmService.updateFilm(film);
        return new ResponseEntity<>(updatedFilm, HttpStatus.OK);
    }

    // @PutMapping("/update/{pkFilm}")
    // public ResponseEntity<Film> updateList(@PathVariable("pkFilm") UUID pkFilm, @RequestBody String str) {
    //     Film film = filmService.findFilmById(pkFilm);
    //     Film updatedFilm = filmService.switchToggle(film);
    //     return new ResponseEntity<>(updatedFilm, HttpStatus.OK);
    // }

    @DeleteMapping("/delete/{pkFilm}")
    public ResponseEntity<?> deleteFilm(@PathVariable("pkFilm") UUID pkFilm) {
        filmService.deleteFilm(pkFilm);
        return new ResponseEntity<>(HttpStatus.OK);
    } 
}