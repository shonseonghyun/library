import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SubTitle from "../../../../../component/header/SubTitle";
import OurError from "../../../../../error/OurError";
import BookInfo from "./info/BookInfo";
import BookReview from "./info/review/BookReview";

const Wrapper = styled.div`
    
`;

const BookInfoWrapper =styled.div`
    width: 80%;
    margin: 0 auto;
`;

const BookReviewWrapper =styled.div`
    width: 80%;
    margin: 0 auto;
`;


function Book(){
    const {bookNo} = useParams() as unknown  as { bookNo: number };

    return (
        <Wrapper>
            <SubTitle title="상세 정보"/>

            <BookInfoWrapper>
                <QueryErrorResetBoundary>
                    {({ reset }) => (
                        <ErrorBoundary onReset={reset}  FallbackComponent={OurError}>
                        <BookInfo bookNo={bookNo}/>

                        </ErrorBoundary>
                    )}
                </QueryErrorResetBoundary>
            </BookInfoWrapper>

            <BookReviewWrapper>
                <BookReview bookNo={bookNo}/>
            </BookReviewWrapper>
        </Wrapper>
    )
}

export default Book;