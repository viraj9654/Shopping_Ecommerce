package com.store.backend.repository;

import com.store.backend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends JpaRepository <Category,Integer>{

}
