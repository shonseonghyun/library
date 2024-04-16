import { useQuery } from "react-query";
import { getReviewsOfBookFetch } from "../../../../../api/api";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { AuthUserInfoAtom } from "../../../../../atoms/AuthUserInfo";
import BookRegReview from "./BookRegReview";

export interface IBookReview{
    bookNo:string
}

interface IReviewInfo{
    reviewNo:number,
    userNo:number ,
    userId:string,
    reviewContent:string,
    regDt:string,
    regTm:string,
    modifiedDt:string,
    modifiedTm:string
}

function BookReview({bookNo}:IBookReview){
    const authUserInfo = useRecoilValue(AuthUserInfoAtom);
    const [reviews,setReveiws] = useState<IReviewInfo[]>([]);
    const {data} = useQuery(
        ['getReviewsOfBookFetch',bookNo],
        ()=>getReviewsOfBookFetch(bookNo),
        {
            onSuccess(data) {
                setReveiws(data.data);
            },
        }
    )
    ;

    return (
        <>
        <h1>Review</h1>
        
        <BookRegReview bookNo={bookNo} />

        <table>
            <thead>
                <tr>
                    <th>작성자</th>
                    <th>내용</th>
                    <th>작성일자</th>
                </tr>
            </thead>
            <tbody>
                {
                    reviews.map(review=>{
                        return (
                            <tr key={review.reviewNo}>
                                <td>{review.userId}</td>
                                <td>{review.reviewContent}</td>
                                <td>{review.regDt}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </>
    )
   

}

export default BookReview;