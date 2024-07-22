package com.starcloud.soloproject.service;

import com.starcloud.soloproject.dto.Category;
import com.starcloud.soloproject.mapper.CategoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryMapper categoryMapper;

    // 모든 카테고리 조회
    public List<Category> getAllCategories() {
        return categoryMapper.getAllCategories();
    }

    // 카테고리 추가
    public void addCategory(Category category) {
        categoryMapper.addCategory(category);
    }

    // 카테고리 삭제
    public void deleteCategory(int id) {
        categoryMapper.deleteCategory(id);
    }
}
