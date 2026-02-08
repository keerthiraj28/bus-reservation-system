package com.busreservation.controller;

import com.busreservation.exception.ResourceNotFoundException;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.busreservation.entity.Seat;
import com.busreservation.entity.Bus;
import com.busreservation.repository.SeatRepository;
import com.busreservation.repository.BusRepository;

@RestController
@RequestMapping("/api/seats")
@CrossOrigin(origins = "*")
public class SeatController {

    private final SeatRepository seatRepo;
    private final BusRepository busRepo;

    public SeatController(SeatRepository seatRepo, BusRepository busRepo) {
        this.seatRepo = seatRepo;
        this.busRepo = busRepo;
    }

    // Get ALL seats for a bus
    @GetMapping
    public List<Seat> getSeatsByBus(@RequestParam Long busId) {
        Bus bus = busRepo.findById(busId).orElseThrow();
        return seatRepo.findByBus(bus);
    }

    // Get ONLY available seats
    @GetMapping("/available")
    public List<Seat> getAvailableSeats(@RequestParam Long busId) {
        Bus bus = busRepo.findById(busId).orElseThrow();
        return seatRepo.findByBusAndBookedFalse(bus);
    }

    @GetMapping("/all")
    public List<Seat> getAllSeats(@RequestParam Long busId) {

        Bus bus = busRepo.findById(busId)
                .orElseThrow(() -> new ResourceNotFoundException("Bus not found"));

        return seatRepo.findByBus(bus);
    }

}
