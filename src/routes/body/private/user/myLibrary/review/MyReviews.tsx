import styled from "styled-components";
import MyLibraryTitle from "../../../../../../component/header/MyLibraryTitle";
import ReviewRows from "./ReviewRows";
import { ErrorBoundary } from "react-error-boundary";
import OurError from "../../../../../../error/OurError";

const Wrapper = styled.div`
    width: 100%;
    /* margin: 0 auto; */
    /* height: 100px; */
    /* background-color: aliceblue; */
`;

export interface IReviewResponse{
    reviewNo:number
    bookNo:number,
    bookName:string,
    regDt: string,
    regTm:string,
    reviewContent:string,
    uploadFilePath:string,
    uploadFileName:string
}



const MyReviews = () => {
    return (
        <Wrapper>
            <MyLibraryTitle title="내 리뷰" />
            <ErrorBoundary FallbackComponent={OurError}>
                <ReviewRows /> 
            </ErrorBoundary>
        </Wrapper>
    );
};

export default MyReviews;