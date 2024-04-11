import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { AuthUserInfoAtom, isLoginSelector } from "../../../../atoms/AuthUserInfo";
import BookReview from "./BookReview";
import { useQuery, useQueryClient } from "react-query";
import { getBookInfoByBookNoFetch } from "../../../../api";
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

interface IBookInfo{
    bookAuthor: string, 
    bookCode:number,
    bookContent:string,
    bookImage:string,
    bookLocation:string,
    bookName:string
    bookPublisher:string,
    bookState:string,
    createdDt:string,
    createdTm:string,
    isbn:string,
    modifiedDt:string,
    modifiedTm:string,
    pubDate:string
}



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