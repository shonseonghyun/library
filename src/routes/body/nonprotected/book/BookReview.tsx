import { useQuery } from "react-query";
import { getReviewsOfBookFetch } from "../../../../api";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { AuthUserInfoAtom } from "../../../../atoms/AuthUserInfo";
import BookRegReview from "./BookRegReview";
import axios from "axios";
import { PrivateAPI } from "../../../../axiosInstance";

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

    const onclick= async ()=>{
        const response = await PrivateAPI.post('user/get/mypage',{
            "userNo": authUserInfo.userNo
        });
        console.log("onClick성공");
        console.log(response);
    }





    return (
        <>
        <h1>Review</h1>
        <button onClick={onclick}>x </button>
        
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