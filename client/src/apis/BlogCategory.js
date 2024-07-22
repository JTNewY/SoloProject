import React from 'react';

// BlogCategory 컴포넌트
const BlogCategory = ({ categories }) => {
  // categories가 배열인지 확인합니다.
  if (!Array.isArray(categories)) {
    console.error('Categories is not an array:', categories);
    return <div>Invalid categories data</div>;
  }

  return (
    <div className="blog-category">
      <h2>Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogCategory;
