import React, { useState } from 'react';
import styled from 'styled-components';
import { useModifyReview, useRegReview } from '../../../../../../hooks/hooks';
import { IReviewResponse } from './MyReviews';
import { AuthUserInfoAtom } from '../../../../../../atoms/AuthUserInfo';
import { useRecoilValue } from 'recoil';

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

const ReviewModifyModal=styled.div`
    position: fixed;
    z-index: 99;
    top: 40%;
    left: 50%;
    width : 90% ;
    /* height : 20vh ; */

    max-width: 500px;
    min-width: 300px;
    min-height: 150px;
    transform: translate(-50%, -50%);
    background-color: white;
`;

interface IModifyReviewProps{
    // type:string,
    review:IReviewResponse,
    setShowing:  React.Dispatch<React.SetStateAction<boolean>>
}

const ReviewModal = ({review,setShowing}:IModifyReviewProps) => {
    const [value,setValue] = useState(review.reviewContent);
    const authUserInfo =useRecoilValue(AuthUserInfoAtom);
    const {mutate:modifyReviewMutate}=useModifyReview();
    
    const onSuccess = (data:any) =>{    
        if(data.code === "S00"){
            alert("리뷰 등록하였습니다.");
            setShowing(false);
        }else{
            alert(data.msg);
        }
        
    }
    const {mutate:regReviewMutate} = useRegReview(onSuccess);

    const changeModifyReview = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setValue(e.currentTarget.value);
    }

    const clickedModifyReview = ()=>{
        if(!(value.trim().length>0)){
            alert("리뷰 내용을 작성해주세요.");
            return ;
        }
        
        //리뷰 수정
        if(review.reviewNo){
            if(review.reviewContent != value){
                modifyReviewMutate.mutate({reviewNo:review.reviewNo,reviewContent:value});
                setShowing(false);
                return;
            }
            else{
                alert("변경 완료하였습니다.");
                setShowing(false);
            }
        }
        //리뷰 작성
        else{
            regReviewMutate.mutate({userNo:authUserInfo.userNo,bookNo:review.bookNo,reviewContent:value});
            setShowing(false);
        }
    }


    return (
        <Wrapper>
            <ReviewOverlay onClick={()=>setShowing(false)}/>
            <ReviewModifyModal>
                <div style={{margin: "10px"}}>
                    <Label style={{fontSize:"20px",fontWeight:"800"}}>내용</Label>
                </div>
                <div style={{marginBottom:"10px"}}>
                    <input onChange={changeModifyReview} style={{width:"300px",height:"80px",textAlign:"start",paddingTop:"-10px"}} type="text" defaultValue={review.reviewContent}/>
                </div>
                <div style={{marginBottom:"10px"}}>
                    <button style={{border:"1px solid black",borderRadius:"5px",padding:"5px"}} onClick={clickedModifyReview}>수정</button>
                </div>
            </ReviewModifyModal>
        </Wrapper>
    );
};

export default ReviewModal;