
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