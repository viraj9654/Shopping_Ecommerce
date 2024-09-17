package com.store.backend.controller;


import com.store.backend.entity.Category;
import com.store.backend.entity.Product;
import com.store.backend.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @PostMapping("/add")
    Category addCategory(@RequestBody Category category, @RequestParam Integer root) {
        return  categoryService.addCategory(category, root);
    }

    @GetMapping("/get/{id}")
    Category getCategoryById(@PathVariable int id) {
        return categoryService.getCategoryById(id);
    }

    // create category map

      @GetMapping("/hierarchy")
    public List<Category> categoryhierarchy(){
        return  categoryService.categoryhierarchy();

      }
      @GetMapping("/{id}")
    public List<Product> getProductByCid(@PathVariable(value = "id") int id ){
        List<Product> products=categoryService.getProductByCid(id);
        return products;
      }
}
