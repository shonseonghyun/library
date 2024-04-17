import { useRecoilValue } from "recoil";
import { AuthUserInfoAtom, isLoginSelector } from "../../../../../../atoms/AuthUserInfo";
import { IBookReview } from "./BookReview";
import { useState } from "react";
import { postReviewOfBookFetch } from "../../../../../../api/api";

function BookRegReview({bookNo}:IBookReview){
    const isLogin = useRecoilValue(isLoginSelector);
    const authUserInfo = useRecoilValue(AuthUserInfoAtom);
    const [reviewContent,setReviewContent] = useState<string>("");
    
    const postReview = ()=>{
        const response = postReviewOfBookFetch(bookNo,authUserInfo.userNo,reviewContent);
        response.then((data)=>{
            if(data.code != "S00"){
                alert(data.msg);
            }else{
                alert("리뷰 등록 완료하였습니다.");
            }
        })
    }

    const writeReviewContent=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setReviewContent(e.currentTarget.value);
    }

    return (
            isLogin 
            ? 
            <div>
                <input type="text" onBlur={writeReviewContent}/>
                <button onClick={postReview}>등록</button>
            </div>
            :
            null
    );
}

export default BookRegReview;