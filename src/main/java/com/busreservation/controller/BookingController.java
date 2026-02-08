package com.busreservation.controller;

import com.busreservation.exception.ResourceNotFoundException;
import com.busreservation.exception.SeatAlreadyBookedException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.busreservation.entity.Booking;
import com.busreservation.entity.Bus;
import com.busreservation.entity.User;
import com.busreservation.entity.Seat;
import com.busreservation.repository.BookingRepository;
import com.busreservation.repository.SeatRepository;
import com.busreservation.repository.BusRepository;
import com.busreservation.repository.UserRepository;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    private final BookingRepository bookingRepo;
    private final SeatRepository seatRepo;
    private final BusRepository busRepo;
    private final UserRepository userRepo;

    public BookingController(
            BookingRepository bookingRepo,
            SeatRepository seatRepo,
            BusRepository busRepo,
            UserRepository userRepo) {

        this.bookingRepo = bookingRepo;
        this.seatRepo = seatRepo;
        this.busRepo = busRepo;
        this.userRepo = userRepo;
    }

    @PostMapping
    public Booking bookSeat(
            @RequestParam Long userId,
            @RequestParam Long busId,
            @RequestParam int seatNumber) {

        User user = userRepo.findById(userId).orElseThrow();
        Bus bus = busRepo.findById(busId).orElseThrow();

        Seat seat = seatRepo.findByBusAndSeatNumber(bus, seatNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Seat not found"));

        if (seat.isBooked()) {
            throw new SeatAlreadyBookedException("Seat already booked");
        }

        // mark seat as booked
        seat.setBooked(true);
        seatRepo.save(seat);

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setBus(bus);
        booking.setSeat(seat);
        booking.setBookingDate(LocalDate.now().toString());

        return bookingRepo.save(booking);
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<String> cancelBooking(@PathVariable Long bookingId) {

        Booking booking = bookingRepo.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        Seat seat = booking.getSeat();
        seat.setBooked(false);
        seatRepo.save(seat);

        bookingRepo.delete(booking);

        return ResponseEntity.ok("Booking cancelled successfully");
    }


    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUser(@PathVariable Long userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return bookingRepo.findByUser(user);
    }

}

