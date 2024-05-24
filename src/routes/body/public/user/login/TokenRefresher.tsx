import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { baseUrl } from "../../../../../api/api";
import { PrivateAPI, PublicAPI } from "../../../../../api/instance/axiosInstance";
import LoginModal from "../../../../../component/login/LoginModal";
import { AuthUserInfoAtom } from "../../../../../atoms/AuthUserInfo";



function TokenRefresher(){
    const [showing,setShowing] =useState(false);
    const [authUserInfo,setAuthUserInfo] = useRecoilState(AuthUserInfoAtom);
    const resetAuthUserInfo = useResetRecoilState(AuthUserInfoAtom);

    useEffect(()=>{
        const refreshAPI = axios.create({
            baseURL:`${baseUrl}`,
            headers:{
                // "Content-Type":"application/json",
            },
        })

        // 요청 인터셉터
        // const requestInterceptor = PrivateAPI.interceptors.request.use(
        //     (config) => {
        //         console.log("요청 인터셉터 헤더 세팅");
        //         let accessToken =authUserInfo.accessToken;
        //         console.log(accessToken);
        //         console.log(authUserInfo);
        //         // config.headers['Content-Type'] = 'application/json';
        //         config.headers['Authorization'] = `Bearer ${accessToken}`;
        //         return config;
        //     },
        //     (error) => {
        //       console.log(error);
        //       return Promise.reject(error);
        //     }
        //   );

        //응답 인터셉터
        const responseInterceptor = PrivateAPI.interceptors.response.use(
            //정상응답인경우
            (response)=>{return response;},

            //200 외 응답인 경우
            async (error)=>{
                const originalConfig = error.config;
                const code = error.response.data.code;
                const msg = error.response.data.msg;

                if(code =="T01"){
                    console.log(localStorage.getItem("refreshToken"));
                    if(! (localStorage.getItem("refreshToken")=== "undefined")){
                        console.log("진입");

                        /* 기존코드 */
                        // await axios.post(`${baseUrl}/user/auth/refreshToken/reissue`,{
                        //     refreshToken: authUserInfo.refreshToken
                        // })
                        // .then(response=>{
                        //     const reissueAccessToken = response.data.data;
                        //     setAuthUserInfo({
                        //         accessToken:reissueAccessToken,
                        //         refreshToken:authUserInfo.refreshToken,
                        //         userId:authUserInfo.userId,
                        //         userNo:authUserInfo.userNo
                        //     });

                        //     originalConfig.headers["Authorization"] = "Bearer " + reissueAccessToken;
                        //     return refreshAPI(originalConfig);
                        //     }
                        // )

                        /* 개선 코드 */
                        /*
                            then에서 직접 다 처리하지 않는다.
                            이유는 refreshAPI요청에 대한 await를 사용하지 못하므로 
                         */
                        console.log("재발급 진행 요청");

                        //accessToken 재발급 요청
                        const response = await axios.post(`${baseUrl}/user/auth/refreshToken/reissue`,{
                                 refreshToken: localStorage.getItem("refreshToken")
                                 //  refreshToken: authUserInfo.refreshToken
                        });

                        //새로 발급 받은 accessToken
                        const reissueAccessToken = response.data.data;
                        
                        //accessToken 설정
                        setAuthUserInfo({
                            accessToken:reissueAccessToken,
                            refreshToken: localStorage.getItem("refreshToken")!,
                            userId:localStorage.getItem("userId")!,
                            userNo:parseInt(localStorage.getItem("userNo")!)
                        });
                        localStorage.setItem("accessToken",reissueAccessToken);
                        //재요청 시 header 세팅
                        originalConfig.headers["Authorization"] = "Bearer " + reissueAccessToken;
                        //재요청
                        const originalResponse = await refreshAPI(originalConfig); //재요청 시 await 추가
                        setShowing(false);
                        return originalResponse;
                    }
                    else{
                        console.log("자동 로그인하지 않음");
                        alert(msg);
                        // resetAuthUserInfo();
                        localStorage.clear()
                        setShowing(true);
                    }
                }
            }
        );

        return ()=>{
            console.log("TokenRefresher 리턴(인터셉터 해제)");
            PrivateAPI.interceptors.response.eject(responseInterceptor);
        };
    },[]);

    return (
        <LoginModal showing={showing} setShowing={setShowing}/>
    );
}

export default TokenRefresher;