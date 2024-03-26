package com.boxd.letterboxdapi.service;

import org.springframework.stereotype.Service;

import com.boxd.letterboxdapi.model.Film;
import com.boxd.letterboxdapi.model.Liste;
import com.boxd.letterboxdapi.repo.FilmRepo;

import com.boxd.letterboxdapi.exception.EntityNotFoundException;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class FilmService {
    private final FilmRepo filmRepo;

    public FilmService(FilmRepo filmRepo) {
        this.filmRepo = filmRepo;
    }

    public Film addFilm(Film film) {
        film.setPkFilm(UUID.randomUUID());
        return filmRepo.save(film);
    }

    public List<Film> findAllFilms() {
        return filmRepo.findAllByOrderByFilmName();
    }

    public Film updateFilm(Film film) {
        return filmRepo.save(film);
    }

        public Film switchToggle(Film film){
            film.setFilmUse(!film.getFilmUse());
        return filmRepo.save(film);
    }

    public Film findFilmById(UUID pkFilm) {
        return filmRepo.findByPkFilm(pkFilm)
                .orElseThrow(() -> new EntityNotFoundException("Film by id " + pkFilm + " was not found"));
    }

    public void deleteFilm(UUID pkFilm){
        filmRepo.deleteByPkFilm(pkFilm);
    }
}