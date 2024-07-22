package com.starcloud.soloproject.mapper;

import com.starcloud.soloproject.dto.Category;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CategoryMapper {

    List<Category> getAllCategories();

    void addCategory(Category category);

    void deleteCategory(int id);
}
