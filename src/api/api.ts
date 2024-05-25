import { LoginFormValue } from "../component/login/LoginModal";
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


/* 일반 로그인 */
export const doLoginFetch = async (loginParams:LoginFormValue)=>{
    return await PublicAPI.post(`/user/login`,loginParams)
            .then(response=>response.data);
}

/* */


/* 찜 */
export const getHeartBooks = async (heartNo:number,userNo:number,pageSize:number)=>{
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

export const regHeartBook = async (userNo: number, bookNo : number)=>{
    return await PrivateAPI.post(
        `/heart/${userNo}/book/${bookNo}`
    )
    .then(response=>response.data);
}

export const delHeartBook = async (userNo:number,bookNo:number)=>{
    return await PrivateAPI.delete(`/heart/${userNo}/book/${bookNo}`)
           .then(response=>response.data);
     
}

/* 도서 */
// 특정 도서 조회
export const getBookInfoByBookNoFetch = async (bookNo:number)=>{
    return await PublicAPI.get(`/book/${bookNo}`)
            .then(response=>response.data);
}

//도서 리뷰
export const getReviewsOfBookFetch = async (bookNo:number)=>{
    return await PublicAPI.get(`/review/book/${bookNo}`)
            .then(response=>response.data);
}

//도서 검색
export const inquiryBooks = async (category:string, inquiryWord:string,currentPage:number,size:number,totalCount:number)=>{
    const inquriyBooksUrl = totalCount>-1 
    ? `/book/inquiry/${category}/${inquiryWord}?page=${currentPage}&size=${size}&cachedCount=${totalCount}` 
    : `/book/inquiry/${category}/${inquiryWord}?page=${currentPage}&size=${size}`;
    return await PublicAPI.get(inquriyBooksUrl)
            .then(response=>response.data);
}
//도서 대여
export const rentBook = async (userNo: number, bookNo : number)=>{
    return await PrivateAPI.post(
        `/rent/${userNo}/book/${bookNo}`
    )
    .then(response=>response.data);
}

//도서 연장
export const extendBook = async (userNo: number, bookNo : number)=>{
    return await PrivateAPI.put(
        `/rent/${userNo}/book/${bookNo}`
    )
    .then(response=>response.data);
}

/*현재 대여 상황 */
export const getRentStatus = async (userNo:number)=>{
    return await PrivateAPI.get(`/user/rentStatus/${userNo}`)
            .then(response=>response?.data);
}

/*대여 히스토리 */
export const getRentHistory = async (userNo:number)=>{
    return await PrivateAPI.get(`/user/rentStatus/${userNo}`)
            .then(response=>response?.data);
}


export  const postReviewOfBook = async(userNo:number,bookNo:number,reviewContent:string)=>{
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
            `/user/join` //url,
            ,requsetParam //body
        )
        .then(response=>response.data);
}

export const regBook= async (requsetParams: FormData)=>{
    return await PrivateAPI.post(
            `/book/reg` 
            ,requsetParams //body
            ,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }
        )
        .then(response=>response.data);
}




