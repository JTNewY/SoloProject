-- 게시판 카테고리 테이블 생성
CREATE TABLE category (
  id          INT             NOT NULL AUTO_INCREMENT COMMENT '카테고리 ID',
  name        VARCHAR(100)    NOT NULL COMMENT '카테고리 이름',
  description TEXT            NULL COMMENT '카테고리 설명',
  PRIMARY KEY (id)
) COMMENT '게시판 카테고리';

-- 게시판 테이블에 카테고리 ID 외래 키 추가
ALTER TABLE board
ADD COLUMN category_id INT NULL COMMENT '게시판 카테고리 ID',
ADD CONSTRAINT fk_category
  FOREIGN KEY (category_id) REFERENCES category(id)
  ON DELETE SET NULL;