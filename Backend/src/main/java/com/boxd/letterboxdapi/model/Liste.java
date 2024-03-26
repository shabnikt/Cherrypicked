package com.boxd.letterboxdapi.model;

import java.io.Serializable;
import java.util.UUID;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "list")
public class Liste implements Serializable{

    @Id
    @Column(nullable = false, name = "pk_list")
    private UUID pkList;
    @Column(nullable = false, name = "list_name")
    private String listName;
    @Column(nullable = false, name = "list_address")
    private String listAddress;
    @Column(nullable = false, name = "list_use")
    private Boolean listUse;

    public Liste() {
    }
}
