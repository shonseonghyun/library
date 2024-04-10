import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { AuthUserInfoAtom, isLoginSelector } from "../../../../atoms/AuthUserInfo";
import BookReview from "./BookReview";

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

const Img = styled.img`
    width:40px;
    height:40px;
`;

interface IBookInfo{
    bookAuthor: string, 
    bookCode:number,
    bookContent:string,
    bookImage:string,
    bookLocation:string,
    bookName:string
    bookPublisher:string,
    bookState:string,
    createdDt:string,
    createdTm:string,
    isbn:string,
    modifiedDt:string,
    modifiedTm:string,
    pubDate:string
    review:[]
}



function BookDetail(){
    const {bookNo} = useParams()  as { bookNo: string }; ;
    const [data,setData] = useState<IBookInfo>();
    const authUserInfo = useRecoilValue(AuthUserInfoAtom);
    const resetAuthUserInfo = useResetRecoilState(AuthUserInfoAtom);
    const isLogin = useRecoilValue(isLoginSelector);
    const navigate = useNavigate();
    const currentLocation = useLocation();

    const requestBookInfoByBookNo = async ()=>{
        const response = await fetch(
            `http://localhost:8000/book/${bookNo}`,
        )
        .then(response=>response.json())
        .then(data=>{
            setData(data.data);
        })
    }

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

    useEffect(()=>{
        requestBookInfoByBookNo();
    },[]);

    return (
        <>
            <h1>BookDetail</h1>
            <hr />
            <div>
                <input type="hidden" name="bookNo" value={bookNo} />
                <img src={data?.bookImage} />
                <p>{data?.bookName}</p>
                <p>{data?.bookAuthor}</p>
                <p>{data?.pubDate}</p>
                <p>{data?.bookState=="RENT_AVAILABLE" ? "대여가능" : "대여불가"}</p>
                <p>{data?.bookPublisher}</p>
                <p>{data?.bookLocation}</p>
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
                        <Img src={`${process.env.PUBLIC_URL}/img/button/heartButton.png`} />
                    </HeartBtn>
                </div>
            </div>
            <div>
                <h1>책소개</h1>
                <hr />
                {data?.bookContent}
            </div>

            <div>
                <BookReview bookNo={bookNo}/>
            </div>
        </>
    )
}

export default BookDetail;