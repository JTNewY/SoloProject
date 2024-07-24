import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../css/board.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as filesApi from '../../apis/files';

const InsertForm = ({ onInsert }) => {
  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);

  const handleChangeTitle = (e) => setTitle(e.target.value);
  const handleChangeWriter = (e) => setWriter(e.target.value);
  const handleChangeContent = (e) => setContent(e.target.value);
  const handleChangeFile = (e) => setFiles(e.target.files);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('writer', writer);
    formData.append('content', content);

    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }

    const headers = {
      'Content-Type': 'multipart/form-data'
    };

    onInsert(formData, headers);
  };

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }

  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          loader.file.then(async (file) => {
            formData.append("parentTable", 'editor');
            formData.append("file", file);

            const headers = {
              'Content-Type': 'multipart/form-data'
            };

            let response = await filesApi.upload(formData, headers);
            let data = await response.data;
            let newFileNo = data.no;

            await resolve({
              default: `http://localhost:8080/files/img/${newFileNo}`
            });
          });
        });
      }
    };
  };

  return (
    <div className='container' style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '20px'
  }}>
      <h1 className='title'>게시글 등록</h1>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td>제목</td>
            <td>
              <input
                type="text"
                className={styles['form-input']}
                value={title}
                onChange={handleChangeTitle}
              />
            </td>
          </tr>
          <tr>
            <td>작성자</td>
            <td>
              <input
                type="text"
                className={styles['form-input']}
                value={writer}
                onChange={handleChangeWriter}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>내용</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <div className={styles['ckeditor-container']}>
                <div className={styles['ckeditor-wrapper']}>
                  <CKEditor
                    editor={ClassicEditor}
                    config={{
                      placeholder: "내용을 입력하세요.",
                      toolbar: {
                        items: [
                          'undo', 'redo',
                          '|', 'heading',
                          '|', 'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
                          '|', 'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code',
                          '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent',
                          '|', 'link', 'uploadImage', 'blockQuote', 'codeBlock',
                          '|', 'mediaEmbed',
                        ],
                        shouldNotGroupWhenFull: false
                      },
                      editorConfig: {
                        height: 600, // CKEditor의 높이 조정
                      },
                      alignment: {
                        options: ['left', 'center', 'right', 'justify'],
                      },
                      extraPlugins: [uploadPlugin]
                    }}
                    data=""
                    onReady={editor => console.log('Editor is ready to use!', editor)}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setContent(data);
                    }}
                    onBlur={(event, editor) => console.log('Blur.', editor)}
                    onFocus={(event, editor) => console.log('Focus.', editor)}
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>파일</td>
            <td>
              <input
                type="file"
                onChange={handleChangeFile}
                multiple
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="btn-box" style={{
        display: 'flex',
        justifyContent: 'center', // 가운데 정렬
        marginTop: '20px' // 여백 추가
      }}>
        <Link to="/boards" className='btn' style={{
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: '#007bff',
          color: 'white',
          cursor: 'pointer',
          textDecoration: 'none',
          textAlign: 'center',
          marginRight: '400px' // 버튼 사이 여백 추가
        }}>목록</Link>
        <button className='btn' onClick={onSubmit} style={{
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: '#007bff',
          color: 'white',
          cursor: 'pointer',
          textDecoration: 'none',
          textAlign: 'center'
        }}>등록</button>
      </div>
    </div>
  );
};

export default InsertForm;
