import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../apis/format';

const List = ({ boardList, isLoading, isLogin }) => {
  console.log(boardList);

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      textAlign: 'center' // 가운데 정렬
    }}>
      <h1>게시글 목록</h1>
      
      {isLogin && (
        <Link to="/boards/insert" style={{
          display: 'inline-block',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          marginBottom: '20px',
          fontSize: '16px',
          cursor: 'pointer',
          textAlign: 'center'
        }}>
          글쓰기
        </Link>
      )}

      {
        isLoading &&
        <div>
          <img src="/img/loading.webp" alt="loading" style={{ width: '100%' }} />
        </div>
      }
      {
        !isLoading && boardList && (
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            margin: '0 auto',
            border: '1px solid #ddd'
          }}>
            <thead>
              <tr>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>번호</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>제목</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>작성자</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>등록일자</th>
              </tr>
            </thead>
            <tbody>
              {boardList.map((board) => (
                <tr key={board.no}>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{board.no}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                    <Link to={`/boards/${board.no}`} style={{ color: '#007bff', textDecoration: 'none' }}>
                      {board.title}
                    </Link>
                  </td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{board.writer}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{formatDate(board.regDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </div>
  );
};

export default List;
