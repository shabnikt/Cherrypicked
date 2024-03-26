package com.boxd.letterboxdapi.model;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.UUID;

@Data
@Entity
@Table(name = "config")
public class Config implements Serializable {
    @Id
    @Column(name = "pk_config")
    private UUID pkConfig;
    @Column(name = "random_amount")
    private Integer randomAmount;
    
    public Config() {}

}