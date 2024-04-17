import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { inquiryBooksFetch } from "../../../../../api/api";
import { useState } from "react";

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

function Books(){
    const {cateogry,inquiryWord} = useParams() as InquriyBooksParams ;
    const [books,setBooks] = useState<IInquriyBooksReponse[]>([]);

    const {data,isLoading,isFetching,refetch} = useQuery(
        ["inquiryBooksFetch",cateogry+"/"+inquiryWord], //쿼리키 , 쿼리키로 구분해서 data fetching
        ()=>inquiryBooksFetch(cateogry,inquiryWord),
        {
            onSuccess(data) {
                setBooks(data.data);
            },
            // cacheTime:5000 //default 5분
            staleTime: 6000, //default 0초
            // refetchInterval:2000,
            enabled:false,
            // select : data=>{
            //     console.log("select")
            //     const books = data.data;
            //     return data.data;
            //     // return data;
            // }
        }
    );

   
    const getData = ()=>{
        refetch();
    }

    // const useHooksss=()=>{
    //     ReactQ(cateogry,inquiryWord);
    // }

    // console.log({ isLoading, isFetching })

    
    return (
        <>
            <h1>도서 조회 결과</h1>
            <button onClick={getData}>버튼</button>

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
        </>
    );
}

export default Books;