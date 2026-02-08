package com.busreservation.controller;

import com.busreservation.entity.Seat;
import com.busreservation.repository.SeatRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.busreservation.entity.Bus;
import com.busreservation.repository.BusRepository;

@RestController
@RequestMapping("/api/buses")
@CrossOrigin(origins = "*")
public class BusController {

    private final BusRepository busRepo;
    private final SeatRepository seatRepo;

    public BusController(BusRepository busRepo, SeatRepository seatRepo) {
        this.busRepo = busRepo;
        this.seatRepo = seatRepo;
    }

    @GetMapping
    public List<Bus> getAllBuses() {
        return busRepo.findAll();
    }

    @PostMapping
    public Bus addBus(@RequestBody Bus bus) {

        Bus savedBus = busRepo.save(bus);

        for (int i = 1; i <= bus.getTotalSeats(); i++) {
            Seat seat = new Seat();
            seat.setSeatNumber(i);
            seat.setBooked(false);
            seat.setBus(savedBus);
            seatRepo.save(seat);
        }

        return savedBus;
    }

}


