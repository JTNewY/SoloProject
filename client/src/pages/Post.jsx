import React from 'react';
import '../css/styles.css';

const Post = () => {
  return (
    <article className="mb-4">
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">

          <h2 className="section-heading">저를 소개합니다.</h2>
            <p>
              안녕하세요 웹개발자를 꿈꾸는 JTNEWY이라고 합니다.
            </p>
            
            <p>
                저는 웹개발에 대한 열정을 가지고 있으며, 새로운 기술을 배울때마다 흥미를 느끼고있습니다.
                특히 백엔드를 개발할때 재미를 느끼고있습니다.
            </p>
            <p>
                안되던것을 제가 직접 코드를 수정해서 해결하였을때의 뿌듯함은 말로 표현할 수 없습니다.
            </p>
            <p>
                애완견 프로젝트를 하였을 때, 팀원이 막혀서 쩔쩔매고 있었는데 제가 맡아서 코드를 수정하였습니다.
            </p>
            <p>
                왜 안될까를 생각하면서 수업시간에 적었던 개념노트를 확인하면서 오류를 수정하였습니다.
                팀원들도 좋아하는 모습을 보면서 엄청 뿌듯하였습니다.
            </p>
            <p>
                이처럼 문제가 생긴다면 열심히 해결하고자 하겠습니다. 
            </p>
            <p> 그리고 더 나은 개발자가 되기위해 노력하겠습니다.</p>
            <p>
            감사합니다.

            </p>

          </div>
        </div>
      </div>
    </article>
  );
};

export default Post;
