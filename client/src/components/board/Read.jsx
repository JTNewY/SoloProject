import React from 'react';
import { Link } from 'react-router-dom';
import * as format from '../../apis/format';
// ckeditor5
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Read = ({ no, board, fileList, isLoading, onDownload }) => {

  const handleDownload = (no, fileName) => {
    onDownload(no, fileName);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>게시글 조회</h1>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>번호 : {no}</h3>
      <hr />

      {
        isLoading &&
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <img src="/img/loading.webp" alt="loading" width="100%" />
        </div>
      }
      {
        !isLoading && board && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>번호</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <input type="text" value={no} readOnly
                         style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>등록일자</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <input type="text" value={board.regDate} readOnly
                         style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>제목</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <input type="text" value={board.title} readOnly
                         style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>작성자</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <input type="text" value={board.writer} readOnly
                         style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>내용</td>
              </tr>
              <tr>
                <td colSpan={2} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <CKEditor editor={ClassicEditor}
                            data={board.content}      // 조회할 데이터 컨텐츠 
                            disabled={true}
                            config={{
                              toolbar: [],
                            }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>파일</td>
              </tr>
              <tr>
                <td colSpan={2} style={{ padding: '10px' }}>
                  {fileList.map((file) => (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }} key={file.no}>
                      <div>
                        <img src={`/files/img/${file.no}`} alt={file.fileName} style={{ maxWidth: '100px', marginRight: '10px' }} />
                        <span>{file.originName} ({format.byteToUnit(file.fileSize)})</span>
                      </div>
                      <button style={{ padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                              onClick={() => handleDownload(file.no, file.originName)}>다운로드</button>
                    </div>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        )
      }
      <hr />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/boards" style={{ marginRight: '10px', padding: '10px 20px', textDecoration: 'none', color: '#fff', backgroundColor: '#007bff', borderRadius: '4px' }}>목록</Link>
        <Link to={`/boards/update/${no}`} style={{ padding: '10px 20px', textDecoration: 'none', color: '#fff', backgroundColor: '#28a745', borderRadius: '4px' }}>수정</Link>
      </div>
    </div>
  );
};

export default Read;
