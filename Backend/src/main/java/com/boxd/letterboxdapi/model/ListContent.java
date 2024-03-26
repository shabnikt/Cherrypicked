package com.boxd.letterboxdapi.model;

import java.io.Serializable;
import java.util.Set;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "list")
public class ListContent implements Serializable{

    @Id
    @Column(nullable = false, name = "pk_list")
    private UUID pkList;
    @Column(nullable = false, name = "list_name")
    private String listName;
    @Column(nullable = false, name = "list_address")
    private String listAddress;
    @Column(nullable = false, name = "list_use")
    private Boolean listUse;

    public ListContent() {
    }

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "list_content",
            joinColumns = {
                    @JoinColumn(name = "fk_list", referencedColumnName = "pk_list")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "fk_film", referencedColumnName = "pk_film")
            }
    )
    @JsonManagedReference
    private Set<Film> films;

}
