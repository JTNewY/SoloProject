import React, { useState, useEffect } from 'react';
import '../css/profile.css';  // CSS 파일을 임포트합니다

const BlogPost = ({ title, content }) => (
  <div className="blog-post">
    <h3 className="blog-title">{title}</h3>
    <p className="blog-content">{content}</p>
  </div>
);

const BlogCategory = ({ categories }) => (
  <div className="blog-category">
    <h3 className="category-title">게시글 카테고리</h3>
    <ul className="category-list">
      {categories.map(category => (
        <li key={category.id} className="category-item">{category.name}</li>
      ))}
    </ul>
  </div>
);

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // 블로그 게시물 로드
    fetch('https://api.example.com/blog-posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('블로그 게시물 로드 오류:', error));

    // 블로그 카테고리 로드
    fetch('http://localhost:8080/api/categories')  // Spring Boot 서버 URL
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('게시글 카테고리 로드 오류:', error));
  }, []);

  return (
    <section className="profile-section">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="profile-card">
              <div className="profile-card-header">
                <img
                  src="./img/profile.jpg"
                  alt="프로필"
                  className="profile-img"
                />
              </div>
              <div className="profile-card-body">
                <p className="profile-description">
                <h2>JTNewY</h2>
              개발자를 꿈꾸고있는 JTnewY 라고 합니다.
              <br />환영합니다.
            <hr></hr>
                <h5>SKill</h5>
                - <b>FrontEnd</b> : html,CSS,JavaScript,React,Flutter<br/>
                - <b>BackEnd</b> : JAVA,JSP,Spring,SpringBoot<br/>&nbsp;Node.js,MySQL,Oracle 
                
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="blog-section">
        
              <div className="category-section">
                <BlogCategory categories={categories} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
