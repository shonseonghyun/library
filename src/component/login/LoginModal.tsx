import { motion } from "framer-motion";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { doLoginFetch } from "../../api/api";
import { AuthUserInfoAtom } from "../../atoms/AuthUserInfo";
import useRememberId from "./useRememberId";

export interface LoginFormValue{
    userId     :   string,
    userPwd    :   string,
    autoLogin  :   boolean
}

const MotionWrapper = styled(motion.div)`
    position: fixed;
    z-index: 99;
    top: 40%;
    left: 50%;
    width : 90% ;
    height : 20vh ;

    max-width: 500px;
    min-width: 300px;
    min-height: 200px;
    transform: translate(-50%, -50%);
    background-color: white;
`;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${props=>props.theme.bgColor};
`;

const PopHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20%;
    color:white;
    font-size: 15px;
    font-weight: bold;
    background-color: rgba(230, 126, 34,1.0);
`;

const LeftWrapper = styled.div`
    float:left;
`;

const RightWrapper = styled.div`
    height: 80px;
`;

const LoginFormWrapper = styled.div`
    height: 40%;
    margin: 0 auto;
    width: 300px;
`; 

const Form = styled.form`
`;

const InputWrapper = styled.div`
  display  : flex ;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const Input = styled.input`
    box-sizing: border-box;
    margin: 0 0 5px 9px;
    margin-left: 5px;
    margin-top: 5px;
`;

const LoginBtn = styled.button`
    margin-top: 15px;
    height: 60px;
    padding: 10px;
    border-radius: 10px;
    color: white;
    background-color: rgba(230, 126, 34,1.0);
`;

const SocialLogins = styled.div`
    margin-top: 5px;
`;

const SocialLoginBtn = styled.button`
    background-color: transparent;
    img{
        width: 20px;
        height: 20px;
    }
`;

const SocialLoginImg = styled.img`
    border: 0.5px solid black;
    border-radius: 5px;
`;

const LoginOptions = styled.div`
    float: left;
    margin-left: 10px;
`;

const OverlayForLogin= styled(motion.div)` 
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 99;
    background-color: rgba(0,0,0,0.5);
    cursor: pointer;
`;

const overlayVariants = {
    normal:{
        opacity:0
    },
    animate:{
        opacity:1,
        transition:{
            duration:0.5
        }
    }
}

interface ILoginModalProps{
    setShowing: React.Dispatch<React.SetStateAction<boolean>>;
    loginAfterUrl ?:string //로그인 후 필요 시 로그인 후처리 페이지로 이동을 위하여 잔달받는  props
    isEnteredInPrivateRoute?: boolean //유저가 직접 privateRoute로 치고 들어오는 경우 메인페이지로 보내기 위해 전달받는 props
}


const LoginModal = ({setShowing,loginAfterUrl,isEnteredInPrivateRoute}:ILoginModalProps) => {
    console.log("LoginModal 랜더링");
    const navigate  = useNavigate();
    const setAuthUserInfo = useSetRecoilState(AuthUserInfoAtom);
    const {register,handleSubmit,setValue,getValues} = useForm<LoginFormValue>();
    const [isRememberId,onToggle,checkboxRef,doRememberId,rememberId] = useRememberId(false,getValues);
    
    const onSubmit = (loginParams:LoginFormValue)=>{
        doRememberId(); 

        doLoginFetch(loginParams)
        .then((data)=>{
            if(data.code=="S00"){
                setShowing(false);
                
                setAuthUserInfo({
                    accessToken:data.data.accessToken,
                    refreshToken:data.data.refreshToken,
                    userId:data.data.userId,
                    userNo:data.data.userNo
                    });
                    localStorage.setItem("userId",data.data.userId);
                    localStorage.setItem("userNo",data.data.userNo);
                    localStorage.setItem("accessToken",data.data.accessToken);
                    localStorage.setItem("refreshToken",data.data.refreshToken);

                    //로그인 후 필요 시 로그인 후처리 페이지로 이동 조건 추가
                    if(loginAfterUrl != "empty"){
                        navigate(loginAfterUrl!);
                    }
            }else{ 
                alert(data.msg);
            }
        })
        .catch((err)=>{
            alert("Fialed to fetch User: "+ err);
        })
        ;
    };
    
    const onInvalid = (data:any)=>{
        doRememberId(); 

        if(data.userId){
            alert(data.userId.message);
        }else{
            alert(data.userPwd.message);
        }
    };
       
    const clickedOverlay = useCallback(() =>{
        setShowing(false);
        setValue("userId","");
        setValue("userPwd","");
        if(isEnteredInPrivateRoute){
            navigate("/");
        }
    },[])

    const naverLogin=  useCallback(() =>{
        const url = "http://localhost:8000/api/user/oauth2/authorize/naver"
        window.location.href=url;
    },[])

    const naverGoogle=  useCallback(() =>{
        const url = "http://localhost:8000/api/user/oauth2/authorize/google"
        window.location.href=url;
    },[])

    return (
        <>
            {/* 오버레이 */}
            <OverlayForLogin
                variants={overlayVariants}
                initial="normal"
                animate="animate"
                onClick={clickedOverlay}
            />

            {/* 로그인 */}
            <MotionWrapper>
            <Wrapper>
                <PopHeader>
                    회원 로그인
                </PopHeader>
                <LoginFormWrapper>
                    <Form onSubmit={handleSubmit(onSubmit,onInvalid)}>
                        <LeftWrapper>
                            <InputWrapper>
                                <label style={{marginTop:"5px"}}>
                                    <img style={{width:"15px",height:"15px"}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAACWklEQVQ4ja2VPWgUQRSAv+Q0J4gEbYKImrtCzNX+YBUXlkMEI2S1UiGRYGEhgkhUSJEIKoiNRQoDoqiVjqCCog4MVmJQLM+IhIs/yDWCinjnD5Fn3oZl2N0Y8DWzM++9b97MvPe2jQwJwqgA7AP2A1uATuAzMAlcB244a36neadCgzBaD9wCNmVtCjwH9jhrZhaEBmHUpdGsA1rAJcAAH4A1QAQcAorAWzmFs6aRZCxJiWBcgZ+AqrPmRUL3BngShNFV4JHajetG6ZEGYbQRqOl0t7PmbtbZgzDqA+7otMdZ8yrWtXu2O3ScygOKqH7K80uFduv4Mg+YkNiuO7noQ1s6LvtHaGzXSi760Pg+e4MwKubRVN/r+aVC5Z6awEpgeIEoh9WuqX7zUkhO6tO176VypUMj2F4qV76UypXJ+nRtNhFhe6lcOQqc1ew546x5kOSkJX9Bd96pS6+B28BHYDXQD2xQ3X2gzy/XrDKVojgNHAOWppj8BC4AI86aX74ys6EofK3UN7AVWKVV9kz6grPmXZ7vf5fcSDVayUXpWsuBb8CMs6aZ55N1p0XtoweAbUBHQv0DeApck77qrGn5/mmvvwu46JeeNuhOb60OHHHW3EuFBmEk3+f1xUW+AhPATWnI8sqaFZuBvcAQsEJtJROOO2tm56EKvAwMqJHk5WG/+Xon6tJe2q9LV4CDAo7LdCwBHNXfRCaQudbX0HQb1aUB5dAWhFEVeKiKc86ak3mwjKilZE/otCqRyj9I5DFwarFAFfETf5EJgcox3gOD8UUvVtRv8C8HGn8A1py1P45QIK4AAAAASUVORK5CYII=" />
                                </label>
                                <Input type="text" placeholder="id" 
                                    defaultValue={rememberId || ""}
                                    {...register("userId", /*해당 값이 name속성의 밸류 */
                                        {
                                            required: "아이디는 필수 입력입니다." , 
                                            minLength:{
                                                value:1,
                                                message: "1자리 이상 아이디를 입력해주세요."
                                            }
                                        }
                                    )} 
                                />
                            </InputWrapper>

                            <InputWrapper>
                                <label style={{marginTop:"5px"}}>
                                    <img style={{width:"15px",height:"15px"}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAYCAYAAAAYl8YPAAAB5UlEQVQ4ja2VS0hWQRTHf5+GokEG4k5QN257bBJaDQwK4SZmpwZitIyoTQWtxA8SQQkXLoSQHpjCoIsK1KHZ6iZoG4Eu2vYJigaZGgeO8nm5j3yczbkz939+nDtzzrklMsxY1wm8AO4AzcAv4DMwEoP/nhaVCjPWdQMLQCOwBawDHcAVYBe4G4NfTsbVpIBagHkFSWYtMfjr4nUt+/OqO2GXUhK7DzQB0zH48tFmDP4PUDbWtQEPVPcyNzPghvrZjOOcTehyYfXqNzNgmwldLuzMdqGw49Iw1t0EHsu1A5eBw4K4HS2fiRj812OYse4RMK6Z7heAqoG1wAHwJAb/qqQFugT8Bh4Cb7UMcs1YVwfcAyaBBqBHYF/kHTAQg39/2nMy1vUD76QUpWhvA9vAhwxxO3AN+BaD30iRSNyUcOSMJN1KDH4/BTQA/AAWxRvr+pIajasIp6g0RvSQUV/OExfB/ibWubdcBBsG9vRZPuf5mWEx+DfAkC4HY/Bz58kMvelqnwuTz2gy1mWN8BWdXStpLzVO5t+e1Jn01S2d9Z+S4hi8jOnXOQlJ3FVgTTIb080Zba3/NtXPaMDYUaPL+H2qmz/1T1Rk8sdqVdFoDP5Z9Qjqle4HurRxi0wGw6pMmxj8R4B/bIyGhxDY7wQAAAAASUVORK5CYII=" />
                                </label>
                                <Input type="password" placeholder="pwd" {...register("userPwd", /*해당 값이 name속성의 밸류 */
                                    {
                                        required: "패스워드는 필수 입력입니다." ,
                                        minLength:{
                                            value:1,
                                            message: "1자리 이상 패스워드를 입력해주세요."
                                        }
                                    }
                                )} />
                            </InputWrapper>
                        </LeftWrapper>

                        <RightWrapper>
                            <LoginBtn type="submit">로그인</LoginBtn>
                        </RightWrapper>
                        <LoginOptions>
                            <label>자동로그인</label>
                            <input id="autoLoginFlg" type="checkbox" value="true" {...register("autoLogin")} />
                            
                            <label>아이디 기억</label>
                            <input 
                                ref={checkboxRef}
                                id="rememberId" type="checkbox"
                                onChange={onToggle} 
                                checked={isRememberId}
                                />
                        </LoginOptions>
                    </Form>
                    <SocialLogins>
                        <SocialLoginBtn onClick={naverLogin}>
                            <SocialLoginImg src={`${process.env.PUBLIC_URL}/img/socialLogin/naver.PNG`} />
                        </SocialLoginBtn>
                        <SocialLoginBtn onClick={naverGoogle}>
                            <SocialLoginImg src={`${process.env.PUBLIC_URL}/img/socialLogin/google.PNG`} />
                        </SocialLoginBtn>
                    </SocialLogins>
                </LoginFormWrapper>
            </Wrapper>
            </MotionWrapper>
        </>
    );
};

export default LoginModal;