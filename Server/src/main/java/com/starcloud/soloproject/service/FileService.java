package com.starcloud.soloproject.service;
 
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.MultipartFile;

import com.starcloud.soloproject.dto.Files;

public interface FileService {
  
  public List<Files> list() throws Exception;
  public Files select(int no) throws Exception;
  public int update(Files file) throws Exception;
  public int insert(Files file) throws Exception;
  public int delete(int no) throws Exception;

  // ⬆ 파일 업로드
  public Files upload(Files file) throws Exception;
  // 📄 여러 파일 업로드
  public List<Files> uploadFiles(Files file, List<MultipartFile> fileList) throws Exception;

  // 파일 목록 - 부모 기준
  public List<Files> listByParent(Files file) throws Exception;

  // ⬇ 파일 다운로드
  public int download(int no, HttpServletResponse response) throws Exception;

  // 파일 선택 삭제 
  public int deleteFiles(String no) throws Exception;
  
  // 파일 목록 삭제 - 부모 테이블 기준
  public int deleteByParent(Files file) throws Exception;
  
}
