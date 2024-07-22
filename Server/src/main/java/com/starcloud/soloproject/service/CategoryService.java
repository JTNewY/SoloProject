package com.starcloud.soloproject.service;

import com.starcloud.soloproject.dto.Category;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

public interface CategoryService {

    // 모든 카테고리 조회
    List<Category> getAllCategories();

    // 카테고리 추가
    void addCategory(Category category);

    // 카테고리 삭제
    void deleteCategory(int id);
}
