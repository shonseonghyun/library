import { useParams } from "react-router-dom";
import styled from "styled-components";
import BookReview from "./info/review/BookReview";
import BookInfo from "./info/BookInfo";
import SubTitle from "../../../../../component/header/SubTitle";

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
                <BookInfo bookNo={bookNo}/>
            </BookInfoWrapper>

            <BookReviewWrapper className="hio">
                <BookReview bookNo={bookNo}/>
            </BookReviewWrapper>
        </Wrapper>
    )
}

export default Book;