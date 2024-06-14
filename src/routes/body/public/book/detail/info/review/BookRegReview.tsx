import { useRecoilValue } from "recoil";
import { IBookReview } from "./BookReview";
import { HTMLInputTypeAttribute, useRef, useState } from "react";
import { AuthUserInfoAtom, isLoginSelector } from "../../../../../../../atoms/AuthUserInfo";
import { useRegReview } from "../../../../../../../hooks/hooks";

function BookRegReview({bookNo}:IBookReview){
    const isLogin = useRecoilValue(isLoginSelector);
    const authUserInfo = useRecoilValue(AuthUserInfoAtom);
    // const [reviewContent,setReviewContent] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const onSuccess = (data:any) =>{    
        if(data.code === "S00"){
            alert("리뷰 등록하였습니다.");
            if(inputRef.current){
                inputRef.current.value="";
            }
        }else{
            alert(data.msg);
        }
        
    }
    const {mutate:regReviewMutate} = useRegReview(onSuccess);

    const clickedReviewReg = (e:React.MouseEvent<HTMLButtonElement>)=>{
        console.log("zmffr");
        if(inputRef.current){
            if(inputRef.current.value.trim().length==0){
                alert("리뷰 내용을 입력해주세요.");
            }else{
                regReviewMutate.mutate({userNo:authUserInfo.userNo,bookNo:bookNo,reviewContent:inputRef.current.value});
            }
        }
    }

   
    return (
            isLogin 
            ? 
            <div>
                <input ref={inputRef} type="text" placeholder="리뷰 내용"/>
                <button onClick={clickedReviewReg}>등록</button>
            </div>
            :
            null
    );
}

export default BookRegReview;