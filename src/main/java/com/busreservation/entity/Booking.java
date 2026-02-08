package com.busreservation.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bookingDate;

    @ManyToOne
    private User user;

    @ManyToOne
    private Bus bus;

    @OneToOne
    private Seat seat;

}
