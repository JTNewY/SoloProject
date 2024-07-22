import React, { useState, useEffect, useContext } from 'react';
import '../css/profile.css';  // CSS 파일을 임포트합니다
import { LoginContext } from '../contexts/LoginContextProvider'; // 로그인 상태를 가져오기 위해

const BlogPost = ({ title, content }) => (
  <div className="blog-post">
    <h3 className="blog-title">{title}</h3>
    <p className="blog-content">{content}</p>
  </div>
);

const BlogCategory = ({ 
  categories, 
  onDelete, 
  onRefresh, 
  onEditClick, 
  isEditing, 
  newCategory, 
  setNewCategory, 
  handleAddCategory,
  isLogin // 추가된 prop
}) => (
  <div className="blog-category">
    <div className="category-header">
      <h3 className="category-title">게시글 카테고리</h3>
      {isLogin && (
        <>
          <button className="edit-button" onClick={onEditClick}>
            <i className={`fas fa-${isEditing ? 'times' : 'edit'}`}></i>
          </button>
          <button className="refresh-button" onClick={onRefresh}>
            <i className="fas fa-sync-alt"></i>
          </button>
        </>
      )}
    </div>
    {categories.length > 0 ? (
      <ul className="category-list">
        {categories.map(category => (
          <li key={category.id} className="category-item">
            {category.name}
            {isEditing && isLogin && (
              <button 
                className="delete-category-button" 
                onClick={() => onDelete(category.id)}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            )}
          </li>
        ))}
      </ul>
    ) : (
      <p className="no-category-message">카테고리가 존재하지 않습니다</p>
    )}
    {isEditing && isLogin && (
      <div className="add-category">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="새 카테고리 추가"
        />
        <button onClick={handleAddCategory}>추가</button>
      </div>
    )}
  </div>
);

const Profile = () => {
  const { isLogin } = useContext(LoginContext); // 로그인 상태 가져오기
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // 블로그 게시물 로드
    fetch('https://api.example.com/blog-posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('블로그 게시물 로드 오류:', error));

    // 블로그 카테고리 로드
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch('http://localhost:8080/board/category')  // Spring Boot 서버 URL
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCategories(data);
        } else if (data && Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          console.error('Received data is not in the expected format:', data);
        }
      })
      .catch(error => console.error('게시글 카테고리 로드 오류:', error));
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      fetch('http://localhost:8080/board/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newCategory, description: '' }) // description 추가
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('네트워크 응답이 올바르지 않습니다');
          }
          return response.json();
        })
        .then(() => {
          // 카테고리 추가 후 상태 업데이트
          fetchCategories();
          setNewCategory('');
          setIsEditing(false);
        })
        .catch(error => console.error('카테고리 추가 오류:', error));
    }
  };

  const handleDeleteCategory = (id) => {
    fetch(`http://localhost:8080/board/category/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        // 카테고리 삭제 후 상태 업데이트
        fetchCategories();
      })
      .catch(error => console.error('카테고리 삭제 오류:', error));
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

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
                  개발자를 꿈꾸고 있는 JTNewY입니다.
                  <br />환영합니다.
                  <hr />
                  <h5>Skill</h5>
                  - <b>FrontEnd</b> : HTML, CSS, JavaScript, React, Flutter
                  <br />
                  - <b>BackEnd</b> : JAVA, JSP, Spring, SpringBoot<br />&nbsp;Node.js, MySQL, Oracle
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="blog-section">
              <BlogCategory 
                categories={categories} 
                onDelete={isLogin ? handleDeleteCategory : null} 
                onRefresh={fetchCategories}
                onEditClick={handleEditClick}
                isEditing={isEditing}
                newCategory={newCategory}
                setNewCategory={setNewCategory}
                handleAddCategory={handleAddCategory}
                isLogin={isLogin} // 추가된 prop
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
