import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { getBookInfoByBookNoFetch, regHeartBook, rentBook } from "../../../../../../api/api";
import { AuthUserInfoAtom, isLoginSelector } from "../../../../../../atoms/AuthUserInfo";
import { getFilePath } from "../../../../../../function/functions";
import Content from "./Content";
import { IHeartBookProps } from "../../simple/Books";
import { useCallback, useState } from "react";
import LoginModal from "../../../../../../component/login/LoginModal";
import { useGetBook, useRegHeartBook, useRentBook } from "../../../../../../hooks/hooks";

const Wrapper = styled.div`
    margin-top: 10px;
`;

const ImgWrapper = styled.div`
  float  : left ;
`;


const BookTitleWrapper = styled.div`
    font-size: 24px;
    padding-bottom: 10px;
    border-bottom: 1px solid #d2d2d2;
`;

const Info = styled.div`
    display: block;
    margin-top: 5px;

    span{
        font-size: 16px;

        &:first-child{
            border-right: 1px solid #d2d2d2;
            padding-right: 5px;
        }
        &:nth-child(2){
            border-right: 1px solid #d2d2d2;
            padding-right: 5px;
            padding-left: 5px;
        }
        &:last-child{
            padding-left: 5px;
        }
    }
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const Button = styled.button`   
    background-color:rgba(52, 152, 219,1.0);  
    margin-right: 5px;
    height: 40px;
    padding: 0px 10px;
    color: #fff!important;
`;

const InfoWrapper = styled.div`
    float: left;
    margin-left: 10px;
`;


const BookImg = styled.img`
    width:200px;
    height:240px;
`;


interface IBookInfo{
    bookNo:number
}


function BookInfo({bookNo}:IBookInfo){
    const [showing,setShowing] = useState(false); 
    const isLogin = useRecoilValue(isLoginSelector);
    const authUserInfo = useRecoilValue(AuthUserInfoAtom);

    const {data,isLoading} = useGetBook(bookNo);
    const {mutate:regHeartMutate} = useRegHeartBook();
    const {mutate:rentBookMutate} = useRentBook();
    
    const clickedHeart = useCallback((e:React.MouseEvent<HTMLButtonElement>)=>{
        if(isLogin){
            const bookNo = parseInt(e.currentTarget.value);
            regHeartMutate.mutate({userNo:authUserInfo.userNo,bookNo:bookNo})
        }else{
            setShowing(true);
        }
    },[isLogin]);

    const clickedRent = useCallback((e:React.MouseEvent<HTMLButtonElement>)=>{
        if(isLogin){
            const bookNo = parseInt(e.currentTarget.value);
            rentBookMutate.mutate({bookNo:bookNo,userNo:authUserInfo.userNo});
        }else{
            setShowing(true);
        }
    },[isLogin]);

    return (
        <Wrapper>
            {
                isLoading
                ?
                <p>isLoading</p>
                :
                <>
                    <input type="hidden" name="bookNo" value={bookNo} />
                    <ImgWrapper>
                        <BookImg src={`${process.env.PUBLIC_URL}/`+ getFilePath(data?.data.bookImage.filePath ,data?.data.bookImage.newFileName )} />
                    </ImgWrapper>
                    <InfoWrapper>
                        <BookTitleWrapper>
                            {data?.data.bookName}
                        </BookTitleWrapper>
                        <Info>
                            <span>{data?.data.bookAuthor}</span>
                            <span>{data?.data.bookPublisher}</span>
                            <span>{data?.data.pubDt}</span>
                        </Info>
                        <Info>
                            <span>{data?.data.bookState==="RENT_AVAILABLE" ? "대출 가능" : "대출 불가"}</span>
                            <span>{data?.data.bookLocation}</span>
                            <span>부록없음</span>
                        </Info>
                        <div style={{height:"100px"}}>

                        </div>

                        <ButtonWrapper>
                            <Button 
                                onClick={clickedRent}
                                value={data?.data.bookNo}
                                style={{ 
                                    backgroundColor: data?.data.bookState==="RENT_UNAVAILABLE" ? "#a99e9e9c" : "rgba(52, 152, 219,1.0)",
                                    cursor: data?.data.bookState==="RENT_UNAVAILABLE" ? "not-allowed" : "pointer"}
                                } 
                                disabled={data?.data.bookState==="RENT_UNAVAILABLE" ? true : false} 
                            >
                                대출하기
                            </Button>
                            <Button value={data?.data.bookNo} onClick={clickedHeart}>찜하기</Button>
                        </ButtonWrapper>
                    </InfoWrapper>
                    <div style={{clear:"both"}} />
                    
                    <Content content={data?.data.bookContent}/>
                </>
            }
            <LoginModal showing={showing} setShowing={setShowing} />
        </Wrapper>
    )
}

export default BookInfo;