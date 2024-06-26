import styled from "styled-components";
import SubTitle from "../../../../../component/header/SubTitle";
import BookResults from "./BookResults";
import { ErrorBoundary } from "react-error-boundary";
import OurError from "../../../../../error/OurError";

const Wrapper = styled.div`
`;


export interface IHeartBookProps{
    bookNo:number,
    userNo:number
}


export interface IBookInfo{
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
            <ErrorBoundary  FallbackComponent={OurError}>
                <BookResults />
            </ErrorBoundary>
        </Wrapper>
    );
}

export default Books;