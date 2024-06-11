import styled from "styled-components";
import { useDelReview, useGetReviewHistory } from "../../../../../../hooks/hooks";
import { useRecoilValue } from "recoil";
import { AuthUserInfoAtom } from "../../../../../../atoms/AuthUserInfo";
import { useEffect, useState } from "react";
import { getFilePath, replaceDt, replaceTm } from "../../../../../../api/utils";
import Pagination from "../../../../../../component/page/Pagination";
import { Link } from "react-router-dom";
import ModifyModal from "./ModifyModal";
import MyLibraryTitle from "../../../../../../component/header/MyLibraryTitle";
import Loading from "../../../../../../component/loading/Loading";

export interface IReviewsResponse{
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
const ReviewItem=styled.div`
    height: 90px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #d2d2d2;
`;

const BookInfoWrapper =styled.div`
    width: 24%;
    float: left;
`;

const ReviewContentWrapper = styled.div`
    float: left;
    width: 54%;
    text-align: left;
    /* height: 60px; */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const ImgWrapper = styled.div`
    float:left;
    width: 70px;
    height: 86px;
    border-radius: 0;
    flex: 0 0 80px;
`;

const BookTitleWrapper =styled.div`
    float: left;
    margin-left: 10px;
`;

const Img = styled.img`
    height: 100%;
    width: 100%;
`;

const ReviewRegDate = styled.div`
    width: 22%;
    float: left;
    height: 100%;
    line-height: 86px;
`;

const BtnWrapper = styled.div`
    text-align: left;
    margin-bottom: 10px;
`;

const MyReviews = () => {
    const [reviews,setReviews] = useState<IReviewsResponse[]>([]);
    const [totalCount,setTotalCount] = useState(-1);
    const [currentPage,setCurrentPage] = useState(1);
    const [sizePerPage,setSizePerPage] = useState(1);
    const [showing,setShowing]= useState(false);

    const authInfo = useRecoilValue(AuthUserInfoAtom);
    const userNo = authInfo.userNo;

    const onSuccess=(data:any)=>{
        setReviews(data.data.reviewList);
        setTotalCount(data.data.totalCnt);
    }
    const {isLoading,data} = useGetReviewHistory({userNo,currentPage,sizePerPage,totalCount,onSuccess});
    const {mutate:delReviewMutate} = useDelReview();
    const clickedDelReview = (reviewNo:number)=>{
        delReviewMutate.mutate(reviewNo);
    }

    useEffect(()=>{
        console.log(totalCount);
    },[totalCount]);

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
                    <ReviewItem key={index}>
                        <BookInfoWrapper>
                            <Link to={`/book/${review.bookNo}`}>
                                <ImgWrapper>
                                    <Img src={`${process.env.PUBLIC_URL}/`+ getFilePath(review.uploadFilePath ,review.uploadFileName)} />
                                </ImgWrapper>
                                <BookTitleWrapper>
                                    {review.bookName}
                                </BookTitleWrapper>
                            </Link>
                        </BookInfoWrapper>

                        <ReviewContentWrapper>
                            <BtnWrapper>
                                <button style={{borderRight:"1px solid #d2d2d2",padding:"0px 3px"}} onClick={()=>setShowing(true)}>수정</button>
                                    {/* &nbsp; */}
                                    {/* &nbsp; */}
                                <button style={{padding:"0px 3px"}} onClick={()=>clickedDelReview(review.reviewNo)}>
                                    삭제
                                </button>
                            </BtnWrapper>

                            {review.reviewContent}
                        </ReviewContentWrapper>
                    
                        <ReviewRegDate>
                            {replaceDt(review.regDt)}
                            {/* &nbsp;
                            {replaceTm(review.regTm)} */}
                        </ReviewRegDate>
                        {
                            showing
                            ?
                                <ModifyModal review={review} setShowing={setShowing} />
                            :                
                                null
                        }
                    </ReviewItem>
                ))
            }
            <div style={{clear:"both"}} /> 
            {
                totalCount ==0 ? null :
                <Pagination totalCount={totalCount} sizePerPage={sizePerPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            }
        </Wrapper>
    );
};

export default MyReviews;