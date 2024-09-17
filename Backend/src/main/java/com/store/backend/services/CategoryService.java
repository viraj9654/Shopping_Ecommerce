package com.store.backend.services;

import com.store.backend.entity.Category;
import com.store.backend.entity.Product;
import com.store.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;
    public Category addCategory (Category category, Integer root) {
        if(root !=0) {
            Category rootCategory =  categoryRepository.findById(root).orElse(null);
            category.setRoot(rootCategory);
        }
        return categoryRepository.save(category);
    }

    public Category getCategoryById(int id) {
        Category category = categoryRepository.findById(id).orElse(null);
        return  category;
    }

    public List<Category> categoryhierarchy(){
        List<Category> root=  categoryRepository.findAll()
                .stream()
                .filter(e->e.getRoot()==null)
                .toList();
             return root;

    }
    public List<Product> getProductByCid(int id){
        Category category=categoryRepository.findById(id).get();
        return category.getProducts();

    }
}
