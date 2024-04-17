import { useQuery } from "react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import { inquiryBooksFetch } from "../../../../../api/api";
import { useEffect, useState } from "react";
import Pagination from "./page/Pagination";

type InquriyBooksParams={
    cateogry: string,
    inquiryWord:string
}

interface IInquriyBooksReponse{
    bookNo:number,
    bookName:string,
    bookAuthor: string,
    bookState:string,
    pubDt:string,
    bookImage: string,
}

let getParameter = (key:string) =>{
    return new URLSearchParams(window.location.search).get(key);
};

function Books(){
    const {cateogry,inquiryWord} = useParams() as InquriyBooksParams ;
    const [books,setBooks] = useState<IInquriyBooksReponse[]>([]);
    const [totalCount,setTotalCount] = useState(0);

    //현재 페이지
    const currentPage = Number.parseInt(getParameter("page")||"1"); 
    //페이지 당 개수
    const sizePerPage = Number.parseInt(getParameter("size")||"10"); 

    const {data,isLoading} = useQuery(
        ["inquiryBooksFetch",cateogry+"/"+inquiryWord+"/"+currentPage+"/"+sizePerPage], //쿼리키 , 쿼리키로 구분해서 data fetching
        ()=>inquiryBooksFetch(cateogry,inquiryWord,currentPage,sizePerPage),
        {
            onSuccess(data) {
                setBooks(data.data.bookList);
                setTotalCount(data.data.totalCount);
            },
            // cacheTime:5000 //default 5분
            staleTime: 1000 , //default 0초
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
        window.scrollTo({ top: 0, behavior: 'smooth' });    
    },[books])

    return (
        <>
            <h1>도서 조회 결과</h1>
            <div>
                {
                    isLoading
                    ? 
                        <p>isLoading</p>
                    :
                    books.map(book =>{
                        return (
                            <div key={book.bookNo}>
                                <Link to={`/book/${book.bookNo}`}>
                                    {book.bookName}
                                </Link>
                                {book.bookAuthor}
                                {book.bookState}
                                {book.pubDt}
                                {book.bookImage}
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