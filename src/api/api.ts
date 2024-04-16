import axios from "axios";
import { PrivateAPI, PublicAPI } from "./instance/axiosInstance";

export const baseUrl="http://localhost:8000";

export interface IReponse{
    code:string,
    msg:string
}

export interface IRequestField{
    userId:string,
    userName:string,
    userPwd:string,
    email:string,
    tel:string,
    gender:string,
    useFlg:number
}


/* 소셜로그인 */
//네이버
export const loginNaver = async ()=>{
    const client_id = "4K91ISX8JLsw4Hq8JTKe";
    const state= "sunghyun"
    const redirect_uri = "http://localhost:8000/api/user/login/oauth2/code/naver"
    const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}`;
    
    const response = await axios.get(url);
    console.log(response);
}


/* 찜 */
export const getHeartBooksFetch = async (heartNo:number,userNo:number,accessToken:string,pageSize:number)=>{
    const apiUrl = heartNo 
        ? `/hearts/${userNo}?heartNo=${heartNo}&pageSize=${pageSize}`
        : `/hearts/${userNo}?pageSize=${pageSize}`
    ;
    const response = await PrivateAPI.get(apiUrl)
        .then(response=>response.data);

    return {
        data:response,
        isLast: response.data.heartList?.length!=pageSize
    };
}

export const deleteHeartBookFetch = async (userNo:number,bookNo:number)=>{
    return await PrivateAPI.delete(`/heart/${userNo}/book/${bookNo}`)
           .then(response=>response.data);
     
}

/* 도서 */
export const getBookInfoByBookNoFetch = async (bookNo:string)=>{
    return await PublicAPI.get(`/book/${bookNo}`)
            .then(response=>response.data);
}

/*대여 히스토리 */
export const getRentHistory = async (userNo:number)=>{
    console.log("getRentHistory api 들어옴"); //2
    return await PrivateAPI.get(`/user/rentStatus/${userNo}`)
            .then(response=>response?.data);
}

/* 리뷰 */
export const getReviewsOfBookFetch = async (bookNo:string)=>{
    return await PublicAPI.get(`/review/book/${bookNo}`)
            .then(response=>response.data);
}

export  const postReviewOfBookFetch = async(bookNo:string,userNo:number,reviewContent:string)=>{
    return await PrivateAPI.post(
            `/review/user/${userNo}/book/${bookNo}` //url
            ,{ reviewContent: reviewContent} //body
        )
        .then(response=>response.data);
}
    

/* 회원가입 */
export const checkExistUserIdFetch= async (userId:string)=>{
    return await PrivateAPI.get(`/user/userId/${userId}/exist`)
       .then(response=>response.data);
}

export const joinUserFetch= async (requsetParam: IRequestField)=>{
    return await PublicAPI.post(
            `/user/join` //url
            ,{requsetParam} //body
        )
        .then(response=>response.data);
}