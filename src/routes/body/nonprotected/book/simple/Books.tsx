import { useQuery } from "react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import { inquiryBooksFetch } from "../../../../../api/api";
import { useEffect, useState } from "react";
import Pagination from "./page/Pagination";
import { getFilePath } from "../../../../../function/functions";

type InquriyBooksParams={
    cateogry: string,
    inquiryWord:string
}

export interface IInquriyBooksReponse{
    bookNo:number,
    bookName:string,
    bookAuthor: string,
    bookState:string,
    pubDt:string,
    bookImage: IInquriyBooksImageReponse,
}

export interface IInquriyBooksImageReponse{
    originalFileName:string,
    fileSize:number,
    filePath:string,
    newFileName:string
}

let getParameter = (key:string) =>{
    return new URLSearchParams(window.location.search).get(key);
};

function Books(){
    const {cateogry,inquiryWord} = useParams() as InquriyBooksParams ;
    // const [books,setBooks] = useState<IInquriyBooksReponse[]>([]);
    const [totalCount,setTotalCount] = useState(-1);

    //현재 페이지
    const currentPage = Number.parseInt(getParameter("page")||"1"); 
    //페이지 당 개수
    const sizePerPage = Number.parseInt(getParameter("size")||"10"); 

    const {data,isLoading} = useQuery(
        ["inquiryBooksFetch",cateogry+"/"+inquiryWord+"/"+currentPage+"/"+sizePerPage], //쿼리키 , 쿼리키로 구분해서 data fetching
        ()=>inquiryBooksFetch(cateogry,inquiryWord,currentPage,sizePerPage,totalCount),
        {
            onSuccess(data) {
                setTotalCount(data.data.totalCount);
            },
            // cacheTime:5000 //default 5분
            staleTime: 6000 *10 , //default 0초
            // refetchInterval:2000,
            // enabled:false,
            // select : data=>{
            //     console.log("select")
            //     const books = data.data;
            //     return data.data;
            //     // return data;
            // }
        }
    );

    useEffect(()=>{
        console.log("useEffect");
    },[])

    return (
        <>
            <h1>도서 조회 결과</h1>
            <div>
                {
                    isLoading
                    ? 
                        <p>isLoading</p>
                    :
                    data?.data?.bookList.map((book:IInquriyBooksReponse) =>{
                        return (
                            <div key={book.bookNo}>
                                <Link to={`/book/${book.bookNo}`}>
                                    {book.bookName}
                                </Link>
                                {book.bookAuthor}
                                {book.bookState}
                                {book.pubDt}
                                <img src={`${process.env.PUBLIC_URL}/`+ getFilePath(book.bookImage.filePath ,book.bookImage.newFileName)} />
                            </div>
                        )
                    })
                }
            </div>
            <Pagination totalCount={totalCount} sizePerPage={sizePerPage} currentPage={currentPage} />
        </>
    );
}

export default Books;