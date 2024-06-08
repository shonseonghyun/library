import styled from "styled-components";
import { FadeLoader } from "react-spinners";

const LoadingWrap = styled.div`
  display:flex; 
  width: 100%;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const LoadingBox = styled.div`
  margin-top: 100px;
`;

const TextBox = styled.div`
margin-top: 30px;
`;


const Loading = () => {
  return (
    <LoadingWrap className="LoadingWrap">
      <LoadingBox>
        <FadeLoader color="#4D607B" />
      </LoadingBox>
      <TextBox>
        <div>Loading...</div>
      </TextBox>
    </LoadingWrap>
  );
};

export default Loading;