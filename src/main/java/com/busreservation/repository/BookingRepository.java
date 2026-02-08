package com.busreservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.busreservation.entity.Booking;
import com.busreservation.entity.User;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUser(User user);
}
