import styled from "styled-components";
import { FadeLoader } from "react-spinners";

const Loading = () => {
  return (
    <LoadingWrap>
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

const LoadingWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 100px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: relative;

  img {
    width: 100%;
    height: auto;
  }
`;

const LoadingBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 130px;
`;

const TextBox = styled.div`
  width: 240px;
  position: absolute;
  top: 50%;
  left: 48.5%;
  /* transform: translate(-50%, -50%); */
`;