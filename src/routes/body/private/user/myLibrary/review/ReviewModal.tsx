import React, { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { AuthUserInfoAtom } from '../../../../../../atoms/AuthUserInfo';
import { useModifyReview, useRegReview } from '../../../../../../hooks/hooks';
import { IReviewResponse } from './MyReviews';

const Wrapper = styled.div`
`;

const ReviewOverlay =styled.div`
    position: fixed;
    top: 0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
`;

const Label = styled.label`
    color:${props=>props.theme.textColor};
    font-size: 20px;
    font-weight: 800;
`;

const Input = styled.input`
    width:300px;
    height:80px;
    text-align: start;
    padding-top: -10px;
`;


const ReviewContentModal=styled.div`
    position: fixed;
    z-index: 99;
    top: 40%;
    left: 50%;
    width : 90% ;

    max-width: 500px;
    min-width: 300px;
    min-height: 150px;
    transform: translate(-50%, -50%);
    background-color: white;
`;

interface IModifyReviewProps{
    review:IReviewResponse,
    setShowing:  React.Dispatch<React.SetStateAction<boolean>>
}

const ReviewModal = ({review,setShowing}:IModifyReviewProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const authUserInfo =useRecoilValue(AuthUserInfoAtom);

    const onSuccess = (data:any) =>{    
        if(data.code === "S00"){
            alert("리뷰 등록하였습니다.");
            setShowing(false);
        }else{
            alert(data.msg);
        }
    }
    const {mutate:modifyReviewMutate}=useModifyReview();
    const {mutate:regReviewMutate} = useRegReview(onSuccess);

    

    const clickedReview = ()=>{
        if(inputRef.current){
            if(inputRef.current.value.trim().length>0){

                //리뷰 수정
                if(review.reviewNo){
                    if(review.reviewContent != inputRef.current.value){
                        modifyReviewMutate.mutate({reviewNo:review.reviewNo,reviewContent:inputRef.current.value});
                    }
                    else{ // 수정 내용이 없을 시 변경 완료 alert 출력
                        alert("변경 완료하였습니다.");
                    }
                }
                //리뷰 작성
                else{
                    regReviewMutate.mutate({userNo:authUserInfo.userNo,bookNo:review.bookNo,reviewContent:inputRef.current.value});
                }
                setShowing(false);
            }
            //리뷰 내용이 없는 경우
            else{
                alert("리뷰 내용을 작성해주세요.");
                return ;
            }

        }
    }


    return (
        <Wrapper>
            <ReviewOverlay onClick={()=>setShowing(false)}/>
            <ReviewContentModal>
                <div style={{margin: "10px"}}>
                    <Label style={{fontSize:"20px",fontWeight:"800"}}>내용</Label>
                </div>
                <div style={{marginBottom:"10px"}}>
                    <Input ref={inputRef} 
                    type="text" defaultValue={review.reviewContent}/>
                </div>
                <div style={{marginBottom:"10px"}}>
                    <button style={{border:"1px solid black",borderRadius:"5px",padding:"5px"}} onClick={clickedReview}>수정</button>
                </div>
            </ReviewContentModal>
        </Wrapper>
    );
};

export default ReviewModal;