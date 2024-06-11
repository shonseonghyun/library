import { useCallback, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getFilePath } from "../../../../../../api/utils";
import { AuthUserInfoAtom, isLoginSelector } from "../../../../../../atoms/AuthUserInfo";
import LoginModal from "../../../../../../component/login/LoginModal";
import { useDelBook, useGetBook, useRegHeartBook, useRentBook } from "../../../../../../hooks/hooks";
import Content from "./Content";

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

const Button = styled.button<{$bookState?:string}>`   
    margin-right: 5px;
    height: 40px;
    padding: 0px 10px;
    background-color: ${props=> props.$bookState==="RENT_UNAVAILABLE" ? props.theme.disableBtnColor : props.theme.btnColor};
    cursor: ${props=>props.$bookState==="RENT_UNAVAILABLE" ? "not-allowed" : "pointer"};
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
    const queryClient= useQueryClient();
    const isLogin = useRecoilValue(isLoginSelector);
    const authUserInfo = useRecoilValue(AuthUserInfoAtom);
    const navigate = useNavigate();

    const onSuccessGetBook= (data:any)=>{
        if(data.code!="S00"){
            navigate(-1);
        }
    }
    const {data,isLoading} = useGetBook(bookNo,onSuccessGetBook);
    const {mutate:regHeartMutate} = useRegHeartBook();
    const {mutate:rentBookMutate} = useRentBook();

    const onSuccess=(data:any)=>{
        if(data.code === "S00"){
            alert("삭제 완료하였습니다.");
            navigate(-1); //바로 이전 페이지로 이동
        }else{
            alert(data.msg);
        }
    }
    const {mutate:delBookMutate} = useDelBook(onSuccess);
    
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

    const clckedDel = useCallback((e:React.MouseEvent<HTMLButtonElement>)=>{
        if(isLogin){
            const bookNo = parseInt(e.currentTarget.value);
            delBookMutate.mutate(bookNo);
        }else{
            setShowing(true);
        }
    },[]
    );

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
                                $bookState={data?.data.bookState}
                                disabled={data?.data.bookState==="RENT_UNAVAILABLE" ? true : false} 
                            >
                                대출하기
                            </Button>
                            <Button value={data?.data.bookNo} onClick={clickedHeart}>찜하기</Button>
                            <Button value={data?.data.bookNo} onClick={clckedDel}>삭제하기</Button>
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