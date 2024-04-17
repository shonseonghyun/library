import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { AuthUserInfoAtom  } from "../../../../../atoms/AuthUserInfo";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {  doLoginFetch } from "../../../../../api/api";


export interface LoginFormValue{
    userId     :   string,
    userPwd    :   string,
    autoLogin  :   boolean
}

export interface ResponseIF{
    code    :   string,
    msg     :   string,
    data    :   ResponseDataIF
}

export interface ResponseDataIF{
    accessToken: string , 
    gender : string ,
    provider:string,
    providerId:string,
    tel:string,
    useFlg:number,
    userEmail:string,
    userGrade:string,
    userId:string,
    userName:string,
    userNo:number 
}

const Wrapper = styled.div`
`;

/* 요구사항 */ //https://jeonghwan-kim.github.io/dev/2022/03/29/react-form-and-formik.html//
//1.값을 필드에 바인딩
//2.폼제출 처리
//3.제출 전 필드값을 검증 
//4.검증 실패 부분에 대한 오류메시지 노출
//=>폼과 로그인 두 객체 관심사로 분리!!

// https://devbksheen.tistory.com/entry/Context-API-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0 - ContextApi 사용 가능


function Login(){
    const {register,handleSubmit,getValues,formState:{errors}} = useForm<LoginFormValue>();
    const [isLoading,setIsLoading] = useState(false);
    const [authUserInfo,setAuthUserInfo] = useRecoilState(AuthUserInfoAtom);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.redirectedFrom?.pathname||'/';

    const onSubmit = async (value:LoginFormValue) =>{
        setIsLoading(true);
        const loginParams : LoginFormValue = {
            userId: getValues("userId"),
            userPwd: getValues("userPwd"),
            autoLogin:getValues("autoLogin") ? true :false
        }
        
        doLoginFetch(loginParams)
        .then((data)=>{
         if(data.code=="S00"){
            alert("로그인 성공");            
            console.log("아래는 로그인 후 응답받은 new 토큰");
            console.log(data.data.accessToken);
            setAuthUserInfo({
                accessToken:data.data.accessToken,
                refreshToken:data.data.refreshToken,
                userId:data.data.userId,
                userNo:data.data.userNo
            });
            navigate(from);
         }else{
             alert(data.msg);
         }
         setIsLoading(false);
     })
     .catch((err)=>{
         alert("Fialed to fetch User: "+ err);
     })
     ;

    }

    //https://sambalim.tistory.com/152
    //https://muna76.tistory.com/243
    
    //Q. state의 변화(!!devtool에서 확인)로 랜더링 시 handleChange함수가 새로 생성되는지 기존껄 쓰는지 보고 싶은데..?
    //useEffect 의존성배열 안의 값이 변경된다면 useEffect 내 콜백 함수 수행 -> 즉, handleChange의 주소값이 변경된다면 useEffect 내 콜백함수 실행


   
    const naverLogin=  () =>{
        const url = "http://localhost:8000/api/user/oauth2/authorize/naver"
        window.location.href=url;
    }

    const naverGoogle=  () =>{
        const url = "http://localhost:8000/api/user/oauth2/authorize/google"
        window.location.href=url;
    }


    return (
        <Wrapper>
            {/* <div>
                {isLoading? "Loading..." : "Ready"}
            </div> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" id="userIdId"  placeholder="id" {...register("userId", /*해당 값이 name속성의 밸류 */
                    {
                        required: "아이디는 필수 입력입니다." , 
                        minLength:{
                            value:1,
                            message: "1자리 이상 아이디를 입력해주세요."
                        }
                    }
                )} />
                {errors.userId && <p>{errors.userId.message}</p>}

                <input type="password" id="userPwdId"  placeholder="pwd" {...register("userPwd", /*해당 값이 name속성의 밸류 */
                    {
                        required: "패스워드는 필수 입력입니다." ,
                        minLength:{
                            value:1,
                            message: "1자리 이상 패스워드를 입력해주세요."
                        }
                    }
                )} />
                {errors.userPwd && <p>{errors.userPwd.message}</p>}
                <div>
                    <label>자동로그인</label>
                    <input id="autoLoginFlg" type="checkbox" value="doAutoLogin" {...register("autoLogin")} />
                </div>
                <button type="submit">로그인</button>
            </form>
            <button onClick={naverLogin}>네이버</button>
            <button onClick={naverGoogle}>구글</button>
        </Wrapper>
    )
}

export default Login;