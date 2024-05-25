import { useRecoilValue } from "recoil";
import { IBookReview } from "./BookReview";
import { useState } from "react";
import { AuthUserInfoAtom, isLoginSelector } from "../../../../../../../atoms/AuthUserInfo";
import { useRegReview } from "../../../../../../../hooks/hooks";

function BookRegReview({bookNo}:IBookReview){
    const isLogin = useRecoilValue(isLoginSelector);
    const authUserInfo = useRecoilValue(AuthUserInfoAtom);
    const [reviewContent,setReviewContent] = useState<string>("");
    
    const {mutate:regReviewMutate} = useRegReview();

    const clickedReviewReg = ()=>{
        regReviewMutate.mutate({userNo:authUserInfo.userNo,bookNo:bookNo,reviewContent:reviewContent})
    }

    const writeReviewContent=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setReviewContent(e.currentTarget.value);
    }

    return (
            isLogin 
            ? 
            <div>
                <input type="text" onBlur={writeReviewContent}/>
                <button onClick={clickedReviewReg}>등록</button>
            </div>
            :
            null
    );
}

export default BookRegReview;