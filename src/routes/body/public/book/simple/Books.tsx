import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "react-query";
import styled from "styled-components";
import SubTitle from "../../../../../component/header/SubTitle";
import OurError from "../../../../../error/OurError";
import BookResults from "./BookResults";

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
            <QueryErrorResetBoundary>
                {({ reset }) => (
                    <ErrorBoundary onReset={reset}  FallbackComponent={OurError}>
                        <BookResults />
                    </ErrorBoundary>
                )}
            </QueryErrorResetBoundary>
        </Wrapper>
    );
}

export default Books;