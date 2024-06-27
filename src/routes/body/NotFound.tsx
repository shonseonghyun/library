import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  width:80%;  
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size  : 30px;
  font-weight: 800;
  margin: 50px 0 0 0 ;
`;

const Content = styled.div`
  font-size  : 25px;
  margin: 20px 0 20px 0;
`;

const NotFound = () => {
    const navigate = useNavigate();
    
    const goMain = useCallback(()=>{
        navigate("/");
    },[]);

    return (
        <Wrapper>
            <Title>NotFound</Title>
            <Content>존재하지 않는 페이지 입니다.</Content>
            <button onClick={goMain}>메인페이지로 가기</button>
        </Wrapper>
    );
};

export default NotFound;