package com.busreservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.busreservation.entity.Seat;
import com.busreservation.entity.Bus;
import java.util.List;
import java.util.Optional;

public interface SeatRepository extends JpaRepository<Seat, Long> {

    List<Seat> findByBus(Bus bus);

    List<Seat> findByBusAndBookedFalse(Bus bus);

    Optional<Seat> findByBusAndSeatNumber(Bus bus, int seatNumber);

}

