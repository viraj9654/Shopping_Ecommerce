package com.store.backend.controller;


import com.store.backend.entity.Product;
import com.store.backend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    ProductService productService;


    @GetMapping("/get/{id}")
    public Product getProductById(@PathVariable(value = "id")int id){
        Product products=productService.getProductById(id);
        return products;

    }
    @PostMapping("/add/{id}")
    public List<Product> addProducts(@RequestBody List<Product> products, @PathVariable int id){
        List<Product> products1=productService.addProducts(products, id);
        return products1;

    }


    @GetMapping("/get")
    public List<Product> getAllProducts(){
        List<Product> products=productService.getAllProducts();

        return products;
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable (value = "id") int id ){
        productService.deleteById(id);
    }

    @DeleteMapping("/delete")
    public  void deleteAll(){
        productService.deleteAll();
    }


    // get product by category id

    @GetMapping("/{id}")
    public List<Product> getProductByCid(@PathVariable (value = "id") int id){
        List<Product> products=productService.getProductByCid(id);
        return products;

    }



}
