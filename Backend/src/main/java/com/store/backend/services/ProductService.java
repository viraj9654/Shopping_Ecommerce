package com.store.backend.services;

import com.store.backend.entity.Category;
import com.store.backend.entity.Product;
import com.store.backend.entity.Size;
import com.store.backend.repository.CategoryRepository;
import com.store.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;



    public List<Product> getAllProducts(){
        List<Product> products=productRepository.findAll();
        return products;

    }

    public List<Product> addProducts(List<Product> products, int categoryId){

        Category category = categoryRepository.findById(categoryId).orElse(null);
        if(category != null) {
            for (Product product : products) {
                product.setCategory(category);
            }
        }

        for (Product product : products) {
            for (Size size : product.getSize()) {
                size.setProduct(product);
            }
        }
       List<Product>  products1=productRepository.saveAll(products);

        return  products1;

    }

    public Product getProductById(int id ){
        Product products=productRepository.findById(id).orElse(null);
        return  products;

    }

    public void deleteById(int id){
       productRepository.deleteById(id);
    }

    public void deleteAll(){
        productRepository.deleteAll();
    }

    public List<Product> getProductByCid(int id){
        Category category=categoryRepository.findById(id).get();
        return category.getProducts();

    }
}
