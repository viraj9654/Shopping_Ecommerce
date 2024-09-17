package com.store.backend.repository;

import com.store.backend.entity.Shipping;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShippingRepository extends JpaRepository<Shipping,Integer> {
}
