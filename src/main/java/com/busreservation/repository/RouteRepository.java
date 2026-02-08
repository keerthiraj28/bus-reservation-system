package com.busreservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.busreservation.entity.Bus;

public interface RouteRepository extends JpaRepository<Bus, Long> {

}
