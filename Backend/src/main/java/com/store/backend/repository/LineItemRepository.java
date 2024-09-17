package com.store.backend.repository;

import com.store.backend.entity.LineItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LineItemRepository extends JpaRepository<LineItem,Integer> {


}
