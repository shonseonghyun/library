import { useQuery, useQueryClient } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getBookInfoByBookNoFetch } from "../../../../../api/api";
import { useState } from "react";
import styled from "styled-components";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { AuthUserInfoAtom } from "../../../../../atoms/AuthUserInfo";
import { IInquriyBooksImageReponse } from "../simple/Books";
import { getFilePath } from "../../../../../function/functions";

const HeartBtn = styled.button`
    border: 0;
    background-color: transparent;
    cursor:pointer;
    &:hover {
        background: yellow;
        color: black;
        transition: 2s;
      }
`;

const RentBtn = styled.button`
    border: 0;
    background-color: black;
    color:pink;
    cursor:pointer;
    &:hover {
        background: yellow;
        color: black;
        transition: 2s;
      }
`;

const BtnImg = styled.img`
    width:40px;
    height:40px;
`;

const BookImg = styled.img`
    width:100px;
    height:100px;
`;


interface IBookInfo{
    bookNo:string
}


function BookInfo({bookNo}:IBookInfo){
    const authUserInfo = useRecoilValue(AuthUserInfoAtom);
    const resetAuthUserInfo = useResetRecoilState(AuthUserInfoAtom);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const currentLocation = useLocation();
    const {data,isLoading} = useQuery(
        ["getBookInfoByBookNoFetch",bookNo],
        ()=>getBookInfoByBookNoFetch(bookNo),
        {
            refetchOnWindowFocus: false,
        }
    )

    const requestRentBook = async ()=>{
        const response = await fetch(
            `http://localhost:8000/rent/${authUserInfo.userNo}/book/${bookNo}`,
            {
                method:"POST",
                headers:{
                    Authorization: `Bearer ${authUserInfo.accessToken}`, 
                    "Content-Type": "application/json",
                }
            }
        )
        .then(response=>response.json())
        .then(data=>{
            if(data.code=="S00"){
                alert("대여 완료하였습니다.");
                queryClient.invalidateQueries(["getBookInfoByBookNoFetch",bookNo]);
            }else{
                alert(data.msg);
                if(data.code=="T01"|| data.code=="A01"){
                    resetAuthUserInfo();
                    navigate("/login",{state:{redirectedFrom: currentLocation}})
                }
            }
        })
    }

    const requestHeartBook = async ()=>{
        const response = await fetch(
            `http://localhost:8000/heart/${authUserInfo.userNo}/book/${bookNo}`,
            {
                method:"POST",
                headers:{
                    Authorization: `Bearer ${authUserInfo.accessToken}`, 
                    "Content-Type": "application/json",
                }
            }
        )
        .then(response=>response.json())
        .then(data=>{
            if(data.code=="S00"){
                alert("찜 신청 완료하였습니다.");
            }else{
                alert(data.msg);
                if(data.code=="T01" || data.code=="A01"){
                    resetAuthUserInfo();
                    navigate("/login",{state:{redirectedFrom: currentLocation}})
                }
            }
        })
    }

    const RentBtnClick = ()=>{
        requestRentBook();
    }

    const HeartBtnClick=()=>{
        requestHeartBook();
    }

    return (
        <>
        <div>
            {
                isLoading
                ?
                <p>isLoading</p>
                :
                <>
                    <input type="hidden" name="bookNo" value={bookNo} />
                    <BookImg src={`${process.env.PUBLIC_URL}/`+ getFilePath(data?.data.bookImage.filePath ,data?.data.bookImage.newFileName )} />
                    <p>{data?.data.bookName}</p>
                    <p>{data?.data.bookAuthor}</p>
                    <p>{data?.data.pubDate}</p>
                    <p>{data?.data.bookPublisher}</p>
                    <p>{data?.data.bookLocation}</p>
                    <div>
                        {
                            data?.bookState=="RENT_AVAILABLE" 
                            ?
                            <RentBtn onClick={RentBtnClick}>
                                대여
                            </RentBtn>
                            :
                            <RentBtn disabled>
                                대여 불가
                            </RentBtn>
                        }

                        <HeartBtn onClick={HeartBtnClick}>
                            <BtnImg src={`${process.env.PUBLIC_URL}/img/button/heartButton.png`} />
                        </HeartBtn>
                    </div>
                </>
            }
                
            </div>
            <div>
                <h1>책소개</h1>
                <hr />
                {data?.bookContent}
            </div>
        </>
    )
}

export default BookInfo;