package com.starcloud.soloproject.dto;

import lombok.Data;

@Data
public class Category {
    private int id; // 카테고리 id
    private String name; // 카테고리 이름
    private String description; // 카테고리 설명
}
