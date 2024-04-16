import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { AuthUserInfoAtom } from "../../../../../atoms/AuthUserInfo";
import { PrivateAPI } from "../../../../../api/instance/axiosInstance";
import { baseUrl } from "../../../../../api/api";



function TokenRefresher(){
    const [authUserInfo,setAuthUserInfo] = useRecoilState(AuthUserInfoAtom);
    const resetAuthUserInfo = useResetRecoilState(AuthUserInfoAtom);
    const navigate = useNavigate();
    const currentLocation = useLocation();
    
    
    useEffect(()=>{
        const refreshAPI = axios.create({
            baseURL:`${baseUrl}`,
            headers:{
                "Content-Type":"application/json",
            },
        })

        //요청 인터셉터
        PrivateAPI.interceptors.request.use(
            (config) => {
                console.log(localStorage);
                console.log("요청 인터셉터 헤더 세팅");
                let accessToken = authUserInfo.accessToken; //여기서 안되네? 로그인 후 요청 인터셉터 들어올 때, 그 전 accessToken 세팅이 된다..? 
                console.log("세팅한 accessToken");
                console.log(accessToken);
                config.headers['Content-Type'] = 'application/json';
                config.headers['Authorization'] = `Bearer ${authUserInfo.accessToken}`;            
                return config;
            },
            (error) => {
              console.log(error);
              return Promise.reject(error);
            }
          );

        //응답 인터셉터
        const interceptor = PrivateAPI.interceptors.response.use(
            //정상응답인경우
            (response)=>{return response;},

            //200 외 응답인 경우
            async (error)=>{
                const originalConfig = error.config;
                const code = error.response.data.code;
                const msg = error.response.data.msg;
                console.log(error);

                if(code =="T01"){
                    if(authUserInfo.refreshToken){
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
                                 refreshToken: authUserInfo.refreshToken
                        });

                        //새로 발급 받은 accessToken
                        const reissueAccessToken = response.data.data;
                        
                        //accessToken 설정
                        setAuthUserInfo({
                            accessToken:reissueAccessToken,
                            refreshToken:authUserInfo.refreshToken,
                            userId:authUserInfo.userId,
                            userNo:authUserInfo.userNo
                        });

                        //재요청 시 header 세팅
                        originalConfig.headers["Authorization"] = "Bearer " + reissueAccessToken;
                        //재요청
                        const originalResponse = await refreshAPI(originalConfig); //재요청 시 await 추가
                        return originalResponse;
                    }
                    else{
                        console.log("자동 로그인하지 않음");
                        alert(msg);
                        resetAuthUserInfo();
                        navigate("/login");
                        // navigate("/login",{state:{redirectedFrom: currentLocation}});
                    }
                }
            }
        );

        return ()=>{
            axios.interceptors.response.eject(interceptor);
        };
    },[]);

    return (
        <></>
    );
}

export default TokenRefresher;