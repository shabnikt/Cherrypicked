package com.boxd.letterboxdapi.repo;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import com.boxd.letterboxdapi.model.Film;

public interface FilmRepo extends JpaRepository<Film,UUID> {
    Optional<Film> findByPkFilm(UUID pkFilm);
    List<Film> findAllByOrderByFilmName();
    void deleteByPkFilm(UUID pkFilm);
}