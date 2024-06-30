import { FallbackProps } from 'react-error-boundary';
import styled from 'styled-components';

const Wrapper =styled.div`
    width:80%;
    margin: 0 auto;
  `;

const ErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center ;
  flex-direction: column;
`;

const ErrorTitle = styled.div`
  margin: 50px 0 0 0;
  font-size: 30px;
  font-weight: 900;
`;

const ErrorContent = styled.div`
  font-size: 25px;
  margin: 10px 0 50px 0;
`;

const OurError = ({error,resetErrorBoundary}:FallbackProps) => {
  
    return (
      <Wrapper>
        <ErrorWrapper className="inner">
          <ErrorTitle>
            서비스에 접속할 수 없습니다.
          </ErrorTitle>
          <ErrorContent>
            새로고침을 하거나 잠시 후 다시 접속 바랍니다.
          </ErrorContent>
          <button type="button" onClick={resetErrorBoundary}>
            새로고침
          </button>
        </ErrorWrapper>
      </Wrapper>
    );
};

export default OurError;