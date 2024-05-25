import { useParams } from "react-router-dom";
import styled from "styled-components";
import BookReview from "./info/review/BookReview";
import BookInfo from "./info/BookInfo";

const Wrapper = styled.div`
    
`;

const SubSearchWrapper =styled.div`
    background:linear-gradient(to right, rgba(72, 52, 212,1.0), white); 
`;

const SearchWrapper =styled.div`
    width: 80%;
    font-size: 28px;
    padding: 15px 0px;
    margin:0 auto;
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
            <SubSearchWrapper>
                <SearchWrapper>
                    상세 정보
                </SearchWrapper>
            </SubSearchWrapper>

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