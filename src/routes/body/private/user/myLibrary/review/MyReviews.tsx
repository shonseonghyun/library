import React, { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { AuthUserInfoAtom } from "../../../../../../atoms/AuthUserInfo";
import MyLibraryTitle from "../../../../../../component/header/MyLibraryTitle";
import Loading from "../../../../../../component/loading/Loading";
import Pagination from "../../../../../../component/page/Pagination";
import Select from "../../../../../../component/slsect/Select";
import { useGetReviewHistory } from "../../../../../../hooks/hooks";
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

const SelectGroup = styled.div`
    /* position:relative;
    right: -10px; */
    display: flex;
    justify-content: end;
`;


const ORDER_OPTIONS = {
    recent:"작성일자",
    bookTitle:"제목",
}

enum OrderCategory  {
    BookTitle = "bookTitle",
    Recent="recent"
}


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


    const changeOrder = useCallback((e:React.ChangeEvent<HTMLSelectElement>)=>{
        const orderVal = e.currentTarget.value;
        
        if(orderVal ===OrderCategory.Recent){
            setReviews(
                [...reviews].sort(function(a,b){
                    return b.reviewNo-a.reviewNo
                })
            )
        }
        else if(orderVal===OrderCategory.BookTitle){
            setReviews(
                [...reviews].sort(function(a,b){
                    return b.bookName < a.bookName ? -1 : b.bookName > a.bookName ? 1 : 0;
                })
            )
        }
    },[reviews]);

    return (
        <Wrapper>
            <MyLibraryTitle title="내 리뷰" />
            
            <SelectGroup>
                <Select id='orderCategory' name='orderCategory' onChange={changeOrder} optionList={ORDER_OPTIONS} />
            </SelectGroup>

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
                    <React.Fragment key={index}>
                        <ReviewRow review={review} />
                    </React.Fragment>
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