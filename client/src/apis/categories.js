// src/apis/categories.js

export const fetchCategories = async () => {
    try {
      const response = await fetch('/board/category'); // 서버 API 주소
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };
  