import { useParams } from "react-router-dom";
import styled from "styled-components";
import BookReview from "./review/BookReview";
import BookInfo from "./BookInfo";

const HeartBtn = styled.button`
    border: 0;
    background-color: transparent;
    cursor:pointer;
    &:hover {
        background: yellow;
        color: black;
        transition: 2s;
      }
`;

const RentBtn = styled.button`
    border: 0;
    background-color: black;
    color:pink;
    cursor:pointer;
    &:hover {
        background: yellow;
        color: black;
        transition: 2s;
      }
`;

const Img = styled.img`
    width:40px;
    height:40px;
`;

function Book(){
    const {bookNo} = useParams()  as { bookNo: string };

    return (
        <>
            <h1>BookDetail</h1>
            <div>
                <BookInfo bookNo={bookNo}/>
            </div>
            <div>
                <BookReview bookNo={bookNo}/>
            </div>
        </>
    )
}

export default Book;