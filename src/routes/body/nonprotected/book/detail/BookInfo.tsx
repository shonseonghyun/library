import { useQuery, useQueryClient } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getBookInfoByBookNoFetch } from "../../../../../api/api";
import { useState } from "react";
import styled from "styled-components";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { AuthUserInfoAtom } from "../../../../../atoms/AuthUserInfo";

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

interface IBookDataInfo{
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
}

interface IBookInfo{
    bookNo:string
}


function BookInfo({bookNo}:IBookInfo){
    const authUserInfo = useRecoilValue(AuthUserInfoAtom);
    const resetAuthUserInfo = useResetRecoilState(AuthUserInfoAtom);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [book,setBook] = useState<IBookDataInfo>();
    const currentLocation = useLocation();
    const {data} = useQuery(
        ["getBookInfoByBookNoFetch",bookNo],
        ()=>getBookInfoByBookNoFetch(bookNo),
        {
            onSuccess(data) {
                console.log(data);
                if(data.code!="S00"){
                    alert(data.msg);
                    navigate("/")

                }else{
                    setBook(data.data);
                }
            },
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
                <input type="hidden" name="bookNo" value={bookNo} />
                <img src={book?.bookImage} />
                <p>{book?.bookName}</p>
                <p>{book?.bookAuthor}</p>
                <p>{book?.pubDate}</p>
                <p>{book?.bookPublisher}</p>
                <p>{book?.bookLocation}</p>
                <div>
                    {
                        book?.bookState=="RENT_AVAILABLE" 
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
                {book?.bookContent}
            </div>
        </>
    )
}

export default BookInfo;