import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getFilePath, replaceDt } from '../../../../../../api/utils';
import { useDelReview } from '../../../../../../hooks/hooks';
import { IReviewResponse } from './MyReviews';
import ReviewModal from './ReviewModal';

const Wrapper = styled.div`
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

interface IReviewRowProps{
    review : IReviewResponse,
}

const ReviewRow = ({review}:IReviewRowProps) => {
    const [showing,setShowing]= useState(false);

    const {mutate:delReviewMutate} = useDelReview();
    const clickedDelReview = (reviewNo:number)=>{
        delReviewMutate.mutate(reviewNo);
    }


    return (
        <Wrapper>
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
                    {
                        review.reviewNo ?
                        <>
                            <button style={{borderRight:"1px solid #d2d2d2",padding:"0px 3px"}} onClick={()=>setShowing(true)}>
                                수정
                            </button>
                            <button style={{padding:"0px 3px"}} onClick={()=>clickedDelReview(review.reviewNo)}>
                                삭제
                            </button>
                        </>
                        :
                        <button style={{padding:"0px 3px"}} onClick={()=>setShowing(true)}>
                            작성
                        </button>
                    } 
                </BtnWrapper>

                {review.reviewContent}
            </ReviewContentWrapper>
            
            <ReviewRegDate>
                {replaceDt(review.regDt)}
            </ReviewRegDate>
            {
                showing
                ?
                <ReviewModal review={review} setShowing={setShowing} />

                :                
                null
                // <ModifyModal  review={review} setShowing={setShowing} />

            }
        </Wrapper>
    );
};

export default ReviewRow;