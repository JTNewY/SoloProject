import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // React Router Link를 임포트합니다.
import { LoginContext } from '../contexts/LoginContextProvider';

const PostPreview = ({ title, subtitle, date }) => (

  <div className="post-preview">
    <Link to="/post" aria-label={`Read more about ${title}`}>
      <h2 className="post-title">{title}</h2>
      {subtitle && <h3 className="post-subtitle">{subtitle}</h3>}
    </Link>
    <p className="post-meta">
      Posted by
      <a href="#!" aria-label="Author profile">별구름</a>
      on {date}
    </p>
    <hr className="my-4" />
  </div>
);

const MainContent = () => {

  const { isLogin } = useContext(LoginContext);

  return (
    <div className="container px-4 px-lg-5">
      <div className="row gx-4 gx-lg-5 justify-content-center" style={{ padding: '30px' }}>
        <div className="col-md-10 col-lg-8 col-xl-7">
           {/* 글쓰기 버튼 (로그인한 사용자만 표시) */}
           {isLogin && (
            <div className="d-flex justify-content-end mb-4">
              <Link className="btn btn-success text-uppercase" to="/boards/insert" aria-label="Write a new post">
                Write New Post
              </Link>
            </div>
          )}
          {/* 포스트 미리보기 */}
          <PostPreview
            title="첫 게시글1"
            subtitle="Problems look mighty small from 150 miles up"
            date="September 24, 2023"
          />
          <PostPreview
            title="첫 게시글2"
            subtitle="Problems look mighty small from 150 miles up"
            date="September 24, 2023"
          />
          <PostPreview
            title="첫 게시글3"
            subtitle="Problems look mighty small from 150 miles up"
            date="September 24, 2023"
          />
          {/* 구분선 */}
          <hr className="my-4" />
          {/* 이전 글 버튼 */}
          <div className="d-flex justify-content-end mb-4">
            <Link className="btn btn-primary text-uppercase" to="/older-posts" aria-label="Older posts">
              Older Posts →
            </Link>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default MainContent;
