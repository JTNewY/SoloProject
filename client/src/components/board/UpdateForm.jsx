import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as format from '../../apis/format';
// ckeditor5
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as filesApi from '../../apis/files';

const UpdateForm = ({
  no, board, fileList,
  onUpdate, onDelete, isLoading,
  onDownload, onDeleteFile, deleteCheckedFiles
}) => {
  // 🧊 state
  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [fileNoList, setFileNoList] = useState([]); // ✅ 파일 선택 삭제
  const [checkAll, setCheckAll] = useState(false);

  // 🌞 함수
  const handleChangeTitle = (e) => setTitle(e.target.value);
  const handleChangeWriter = (e) => setWriter(e.target.value);
  const handleChangeContent = (e) => setContent(e.target.value);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append('no', no);
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

    onUpdate(formData, headers);
  };

  const handleDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      onDelete(no);
    }
  };

  const handleDownload = (no, fileName) => onDownload(no, fileName);
  const handleDeleteFile = (no) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      onDeleteFile(no);
    }
  };

  const checkFileNo = (no) => {
    setFileNoList(prevFileNoList => {
      if (prevFileNoList.includes(no)) {
        return prevFileNoList.filter(fileNo => fileNo !== no);
      } else {
        return [...prevFileNoList, no];
      }
    });
  };

  const handleDeleteFiles = () => {
    if (window.confirm("정말로 삭제하시겠습니까? \n" + fileNoList)) {
      deleteCheckedFiles(fileNoList);
      setFileNoList([]); // 파일번호 체크박스 초기화
    }
  };

  const fileCheckAll = () => {
    setCheckAll(prevCheckAll => {
      const checkList = document.getElementsByClassName('check-file');
      for (let i = 0; i < checkList.length; i++) {
        const check = checkList[i];
        if (!prevCheckAll) {
          checkFileNo(check.value);
          check.checked = true;
        } else {
          checkFileNo(check.value);
          check.checked = false;
        }
      }
      return !prevCheckAll;
    });
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

            let newFile = data;
            let newFileNo = newFile.no;

            await resolve({
              default: `http://localhost:8080/files/img/${newFileNo}`
            });
          });
        });
      },
    };
  };

  const handleChangeFile = (e) => setFiles(e.target.files);

  useEffect(() => {
    if (board) {
      setTitle(board.title);
      setWriter(board.writer);
      setContent(board.content);
    }
  }, [board]);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>게시글 수정</h1>

      {isLoading && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src="/img/loading.webp" alt="loading" width="100%" />
        </div>
      )}

      {!isLoading && board && (
        <div>
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
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>제목</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <input type="text"
                         value={title}
                         onChange={handleChangeTitle}
                         style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>작성자</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <input type="text"
                         value={writer}
                         onChange={handleChangeWriter}
                         style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>내용</td>
              </tr>
              <tr>
                <td colSpan={2} style={{ padding: '10px' }}>
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
                        height: 500,
                      },
                      alignment: {
                        options: ['left', 'center', 'right', 'justify'],
                      },
                      extraPlugins: [uploadPlugin] // 업로드 플러그인
                    }}
                    data={content}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setContent(data);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>파일</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>파일</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <input type="file" onChange={handleChangeFile} multiple />
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            onClick={fileCheckAll}>전체선택</button>
                    <button style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            onClick={handleDeleteFiles}>선택삭제</button>
                  </div>
                </td>
              </tr>
              {fileList.map((file) => (
                <tr key={file.no}>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                    <input type="checkbox"
                           className='check-file'
                           onChange={() => checkFileNo(file.no)}
                           checked={fileNoList.includes(file.no)}
                           value={file.no} />
                    <img src={`/files/img/${file.no}`} alt={file.fileName} style={{ maxWidth: '100px', marginRight: '10px' }} />
                  </td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span>{file.originName} ({format.byteToUnit(file.fileSize)})</span>
                      </div>
                      <div>
                        <button style={{ padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                onClick={() => handleDownload(file.no, file.originName)}>다운로드</button>
                        <button style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px' }}
                                onClick={() => handleDeleteFile(file.no)}>삭제</button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to="/boards" style={{ marginRight: '10px', padding: '10px 20px', textDecoration: 'none', color: '#fff', backgroundColor: '#007bff', borderRadius: '4px' }}>목록</Link>
            <button style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px' }}
                    onClick={handleDelete}>삭제</button>
            <button style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px' }}
                    onClick={onSubmit}>수정</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateForm;
