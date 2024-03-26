package com.boxd.letterboxdapi.model;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.UUID;

@Data
@Entity
@Table(name = "film")
public class Film implements Serializable {
    @Id
    @Column(name = "pk_film")
    private UUID pkFilm;
    @Column(name = "film_name")
    private String filmName;
    @Column(name = "film_page")
    private String filmPage;
    @Column(name = "film_img_url")
    private String filmImgUrl;
    @Column(name = "film_streaming")
    private String filmStreaming;
    @Column(name = "film_watched")
    private Boolean filmWatched;
    @Column(name = "film_use")
    private Boolean filmUse;

    public Film() {}

}