import { FallbackProps } from 'react-error-boundary';

const OurError = ({error,resetErrorBoundary}:FallbackProps) => {
    console.log(error.code);
    console.log(resetErrorBoundary);
    // const { status } = error.response;
    // const navigate = useNavigate();
    // // const { title, content } = getErrorMessage();
    // const isNotAuthorized = status === 401 || status === 403;
    // const buttonMessage = isNotAuthorized ? '로그인' : '새로고침';
  
    const onClickHandler = () => {
        resetErrorBoundary();
    };
  
    return (
      <div className="error-fallback-wrapper">
        <div className="inner">
          <h2 className="title">{"title"}</h2>
          <p className="content">{"content"}</p>
          <button type="button"
           onClick={onClickHandler}
        >
            {"buttonMessage"}
          </button>
        </div>
      </div>
    );
};

export default OurError;