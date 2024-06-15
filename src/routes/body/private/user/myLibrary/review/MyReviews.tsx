import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { AuthUserInfoAtom } from "../../../../../../atoms/AuthUserInfo";
import MyLibraryTitle from "../../../../../../component/header/MyLibraryTitle";
import Loading from "../../../../../../component/loading/Loading";
import Pagination from "../../../../../../component/page/Pagination";
import { useDelReview, useGetReviewHistory } from "../../../../../../hooks/hooks";
import ReviewRow from "./ReviewRow";

export interface IReviewResponse{
    reviewNo:number
    bookNo:number,
    bookName:string,
    regDt: string,
    regTm:string,
    reviewContent:string,
    uploadFilePath:string,
    uploadFileName:string
}

const Wrapper = styled.div`
    width: 100%;
    /* margin: 0 auto; */
    /* height: 100px; */
    /* background-color: aliceblue; */
`;

const ReivewsListHeader = styled.div`
    border-bottom: 1px solid #dedede;
    height: 53px;
    margin-bottom: 10px;

    span{
        font-size: 16px;
        height: 100%;
        line-height: 53px;
        font-weight: 700;
        color:#666;
    }

    span:first-child{
        float: left;
        width: 24%;
    }
    span:nth-child(2){
        float: left;
        width: 54%;
    }
    span:nth-child(3){
        float: left;
        width: 22%;
    }
`;

const MyReviews = () => {
    const [reviews,setReviews] = useState<IReviewResponse[]>([]);
    const [totalCount,setTotalCount] = useState(-1);
    const [currentPage,setCurrentPage] = useState(1);
    const [sizePerPage,setSizePerPage] = useState(5);

    const authInfo = useRecoilValue(AuthUserInfoAtom);
    const userNo = authInfo.userNo;

    const onSuccess=(data:any)=>{
        setReviews(data.data.reviewList);
        setTotalCount(data.data.totalCount);
    }
    const {isLoading} = useGetReviewHistory({userNo,currentPage,sizePerPage,totalCount,onSuccess});


    return (
        <Wrapper>
            <MyLibraryTitle title="내 리뷰" />

            <ReivewsListHeader>
                <span>도서 정보</span>
                <span>내용</span>
                <span>작성일</span>
            </ReivewsListHeader>
            {
                isLoading ? 
                <Loading />
                :
                reviews.map((review,index)=>(
                    <ReviewRow key={index} review={review} />
                ))
            }
            <div style={{clear:"both"}} /> 
            {
                totalCount == 0 ? null :
                <Pagination totalCount={totalCount} sizePerPage={sizePerPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            }
        </Wrapper>
    );
};

export default MyReviews;