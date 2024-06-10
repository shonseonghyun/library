import styled from "styled-components";
import SubTitle from "../../../../../component/header/SubTitle";
import BookResults from "./BookResults";

const Wrapper = styled.div`
`;


export interface IHeartBookProps{
    bookNo:number,
    userNo:number
}


export interface IBookProps{
    bookNo:number,
    bookName:string,
    bookAuthor:string,
    pubDt:string,
    bookState:string,
    bookImage:{
        originalFileName:string,
        fileSize:number,
        filePath:string,
        newFileName:string
    }
}

function Books(){
    return (
        <Wrapper>
            <SubTitle title="도서 검색 결과" />
            <BookResults />
        </Wrapper>
    );
}

export default Books;