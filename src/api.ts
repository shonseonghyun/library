
// const navigate = useNavigate();
// const authUserInfo = useRecoilValue(AuthUserInfoAtom);
// const resetAuthUserInfo = useResetRecoilState(AuthUserInfoAtom);
// const currentLocation = useLocation();

// https://velog.io/@rlaebqebq/220525


const BaseUrl = "http://localhost:8000";

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


export const deleteHeartBookFetch = (userNo:number,bookNo:number,accessToken:string)=>{
    return  fetch(
        `${BaseUrl}/heart/${userNo}/book/${bookNo}`,
        {
            method:"DELETE",
            headers:{
                Authorization: `Bearer ${accessToken}`, 
                "Content-Type": "application/json",
            }
        }
    ).then((response)=>response.json());
}

export const getBookInfoByBookNoFetch = async (bookNo:string)=>{
    return await fetch(
        `${BaseUrl}/book/${bookNo}`,
    )
    .then(response=>response.json())
}


export const getHeartBooksFetch = async  (heartNo:number,userNo:number,accessToken:string,pageSize:number)=>{
    const url = heartNo 
    ? `${BaseUrl}/hearts/${userNo}?heartNo=${heartNo}&pageSize=${pageSize}`
    : `${BaseUrl}/hearts/${userNo}?pageSize=${pageSize}`
    
    const response = await fetch(
        url,
        // `${BaseUrl}/hearts/${userNo}?pageSize=${pageSize}`,
        {
            method:"GET",
            headers:{
                Authorization: `Bearer ${accessToken}`, 
                "Content-Type": "application/json",
            }
        }
    );

    const data = await response.json();

    return {
        data:data,
        isLast: data.data.heartList?.length!=pageSize
    };
}

export const getReviewsOfBookFetch = async(bookNo:string)=>{
    return await fetch(
        `${BaseUrl}/review/book/${bookNo}`,
        {
            method:"GET",
            headers:{
                "Content-Type": "application/json",
            },
        }
    ).then(response=>response.json());
}

export  const postReviewOfBookFetch = async(bookNo:string,userNo:number,reviewContent:string,accessToken:string)=>{
    return await fetch(
        `http://localhost:8000/review/user/${userNo}/book/${bookNo}`,
        {
            method:"POST",
            headers:{
                Authorization: `Bearer ${accessToken}`, 
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                reviewContent:`${reviewContent}`
            })
        }
    ).then(response=>response.json())
}
    

export const checkExistUserIdFetch= async (userId:string)=>{
    return await fetch(
        `${BaseUrl}/user/userId/${userId}/exist`,
        {
            method:"GET",
            headers:{
                "Content-Type": "application/json",
            },
            
        }
    ).then(response=>response.json());
}

export const joinUserFetch= async (requsetParam: IRequestField)=>{
    return await fetch(
        `${BaseUrl}/user/join`,
        {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requsetParam)
            
        }
    ).then(response=>response.json());
}