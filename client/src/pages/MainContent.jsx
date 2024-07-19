import React from 'react';
import { Link } from 'react-router-dom'; // React Router Link를 임포트합니다.

const PostPreview = ({ title, subtitle, date }) => (
  <div className="post-preview">
    <Link to="/post"> {/* React Router의 Link를 사용하여 페이지 전환을 구현합니다. */}
      <h2 className="ost-title">{title}</h2>
      {subtitle && <h3 className="post-subtitle">{subtitle}</h3>}
    </Link>
    <p className="post-meta">
      Posted by
      <a href="#!">Start Bootstrap</a> {/* 작성자 링크는 그대로 두었습니다. */}
      on {date}
    </p>
    <hr className="my-4" />
  </div>
);

const MainContent = () => (
  <div className="container px-4 px-lg-5">
    <div className="row gx-4 gx-lg-5 justify-content-center "style={{ padding: '30px' }}>
      <div className="col-md-10 col-lg-8 col-xl-7">
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
        <div className="d-flex justify-content-end mb-4" >
          <Link className="btn btn-primary text-uppercase" to="/older-posts">Older Posts →</Link> {/* React Router의 Link를 사용하여 페이지 전환을 구현합니다. */}
        </div>

        
      </div>
    </div>
  </div>
);

export default MainContent;
