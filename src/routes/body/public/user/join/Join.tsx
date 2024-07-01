import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IRequestField, joinUserFetch } from "../../../../../api/api";
import { getAuthNumber } from "../../../../../component/emailAuth/GetAuthNumber";
import { ISendEmailHandlerProps, sendEmailAuthNumber } from "../../../../../component/emailAuth/sendEmailAuthNumber";
import Timer from "../../../../../component/timer/Timer";
import { useCheckIdExist } from "../../../../../hooks/hooks";
import Radio from "../../../private/user/myPage/Radio";
import RadioGroup from "../../../private/user/myPage/RadioGroup";

const Wrapper = styled.div`
    width  : 80% ;
    margin: 0 auto;
    display: flex;
    justify-content: center;
`; 

const Input = styled.input`
    border: 0.5px solid rgb(219, 219, 219);
    padding: 10px;
    margin-top: 5px;
    border-radius:30px;
`;

const ErrMsg =styled.p`
    color:red;
`;

const Form = styled.form`
    background-color: ${props=>props.theme.bgColor};
    width: 350px;
    border: 2px solid black;
    padding: 10px 30px 30px;
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const Btn = styled.button`
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
`;

interface IInputField{
    userId:string,
    userName:string,
    userPwd:string,
    passwordCheck:string,
    email:string,
    authNumber:string;
    tel:string,
    gender:string
}

const emailAuthExpiredTime = 60;
const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

function Join(){
    const [gender,setGender] = useState("");
    //아이디 중복체크여부
    const [isIdChecked,setIsIdChecked] = useState(false);
    //이메일 인증 요청 유효시간
    const [isExpired,setIsExpired] = useState(true);
    //이메일 인증완료 여부
    const [isEmailAuth,setIsEmailAuth] = useState(false);
    //인증번호
    const [authNumber,setAuthNumber] = useState("");
    //타이머
    const time = emailAuthExpiredTime;
    const [timeLeft,setTimeLeft] = useState(time);

    const navigate = useNavigate();
    
    const {
        getValues,
        clearErrors,
        watch,
        register,
        handleSubmit,
        formState:{
            submitCount,//submit한 카운트
            errors,
            isValid,//유효성 검증 통과여부
            isDirty,//폼 접근여부
        },
       setError
    } = useForm<IInputField>(
            {mode:"onChange",},
    );

    const convertRequestParam = useCallback((data:IInputField)=>{
        const requestParam =
        {
            userId:data.userId,
            userName:data.userName,
            userPwd:data.userPwd,
            email:data.email,
            tel:data.tel,
            gender:data.gender,
            useFlg: 0
        }
        return requestParam;       
    },[]);

    //form submit
    const onValid= useCallback((data:IInputField)=>{
        //앞서서 모든 유효성 검증(ex.이메일 형식,비밀번호 자릿수 등)이 완료된 후 해당 onSubmit으로 들어오게 된다.
        //따라서 해당 부분에선 errors에 대한 처리가 불가하다.
        const requestParam = convertRequestParam(data);

        // console.log(requestParam);
        const response = joinUserFetch(requestParam as IRequestField)
        response.then((response)=>{
            if(response.code=="S00"){
                alert("회원가입 완료되었습니다. 로그인 바랍니다.");
                navigate("/");
            }
            else{
                alert(response.msg);
            }
        })
    },[]);

    //아이디 체크
    const [doIdCheck,setDoIdCheck] = useState(false);
    const onSuccess=useCallback((data:any)=>{
        const idExistFlg = data.data ;

        if(idExistFlg){
            setError("userId",{message:"중복 아이디 입니다."});
            setIsIdChecked(false);
        }else{
            clearErrors("userId");
            alert("사용 가능한 아이디입니다.");
            setIsIdChecked(true);
        }
        setDoIdCheck(false);
    },[]);
    useCheckIdExist(getValues("userId"),doIdCheck,setDoIdCheck,onSuccess);
    const handleCheckValidId= useCallback(()=>{
        const userInputId = getValues("userId");
        if(userInputId==null || userInputId.trim().length==0){
            alert("아이디를 입력해주세요.")
            return ;
        }
        setDoIdCheck(true);
    },[]);

    //이메일 형식 체크
    const emailCheck = useCallback((email:string)=>{
        return emailRegEx.test(email);
    },[]);

    const sendEmailAuthNumberHandler=useCallback(()=>{
        console.log(getValues("email"));
        if(!emailCheck(getValues("email"))){
            alert("메일 형식이 유효하지 않습니다.");
            return ;
        }

        setIsEmailAuth(false);
        const authNumber = getAuthNumber();
        setAuthNumber(authNumber);
        const params:ISendEmailHandlerProps ={
            email : getValues("email"),
            name : getValues("userName"),
            authNumber: authNumber
        } 
        setIsExpired(false);
        setTimeLeft(emailAuthExpiredTime);
        sendEmailAuthNumber(params);
    },[]);

    const checkEmailAuthNumber=useCallback(()=>{
        if(!isExpired){ //해당 조건식에서 isExpired state값을 사용하기 떄문에 useCallback의존성배열에 포함
            //인증번호 유효한 경우
            if(authNumber==getValues("authNumber")){ //해당 조건식에서 authNumber state값을 사용하기 떄문에 useCallback의존성배열에 포함
                //인증번호 통과
                clearErrors("authNumber");
                setIsEmailAuth(true);
                alert("올바른 인증번호 입니다.")
            }else{
                setError("authNumber",{message:"올바르지 않은 인증번호 입니다."})
            }
        }else{
            //인증번호 유효하지 않은 경우
            setError("authNumber",{message:"인증번호 유효시간이 초과하였습니다. 재인증 바랍니다."})
        }
    },[isExpired,authNumber]);

    //이메일 및 아이디 중복 인증 체크
    const ValidAll=useCallback((e:React.MouseEvent<HTMLButtonElement>)=>{
        if(!isIdChecked){
            alert("아이디 중복 체크 부탁드립니다.");
            e.preventDefault();
        }
        else if(!isEmailAuth){
            alert("이메일 인증 부탁드립니다.");
            e.preventDefault();
        }
    },[isIdChecked,isEmailAuth]);

    return (
        <Wrapper>

        <Form onSubmit={handleSubmit(onValid)}>
            <Input type="text" {...register("userName",{
                required:{value:true,message:'이름을 입력하세요'}
                })} placeholder="이름" />
            <ErrMsg>{errors.userName?.message}</ErrMsg>

            <Input type="text" {...register("userId",{
                required:{value:true,message:'아이디를 입력하세요'}
                })} placeholder="아이디" />
            <Btn type="button" onClick={handleCheckValidId}>중복 확인</Btn>
            <ErrMsg>{errors.userId?.message}</ErrMsg>

            <Input type="password" {...register("userPwd",{
                minLength:{
                    value:4,
                    message:"비밀번호 4자리 이상 입력하세요."
                }
            })} placeholder="비밀번호" />
            <ErrMsg>{errors.userPwd?.message}</ErrMsg>

            <Input type="password" {...register("passwordCheck",{
                validate:{
                    checkPwd:fieldValue =>{
                        return (fieldValue==getValues("userPwd")||'비밀번호가 일치하지 않습니다.')
                    }
                }
            })} placeholder="비밀번호 확인" />
            <ErrMsg>{!errors.userPwd?.message&& errors.passwordCheck?.message}</ErrMsg>
            <Input type="text" {...register("email",{
                pattern:{
                    value:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message:"이메일 형식이 유효하지 않습니다."
                },
                })} placeholder="이메일" />
                <Btn disabled={isEmailAuth} type="button" onClick={sendEmailAuthNumberHandler}>인증 요청</Btn>
                {(!isExpired && !isEmailAuth) ? <Timer setIsExpired={setIsExpired} timeLeft={timeLeft} setTimeLeft={setTimeLeft}/> : null}
            <ErrMsg>{errors.email?.message}</ErrMsg>

            {authNumber.length>0 && 
                <>
                    <Input type="text" {...register("authNumber")} placeholder="인증번호" readOnly={isEmailAuth} />
                    {isEmailAuth
                        ?<span>확인 완료</span>
                        :<button 
                        // disabled={!watch("authNumber")} 
                        type="button" onClick={checkEmailAuthNumber}>인증 하기</button>
                    }
                </>
            }
            <ErrMsg>{errors.authNumber?.message}</ErrMsg>
            <Input type="text" {...register("tel",{
                required:{value:true,message:"휴대폰 번호를 입력하세요."},
                pattern:{
                    value:/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
                    message:"휴대폰번호 형식이 유효하지 않습니다."
                },
                })} placeholder="휴대폰 번호" />
            <ErrMsg>{errors.tel?.message}</ErrMsg>

            <div>
                <RadioGroup value={gender} onChange={setGender}>
                        <Radio register={register("gender")} value="M">남성</Radio>
                        <Radio register={register("gender")} value="W">여성</Radio>
                </RadioGroup>
                {/* <label>남성</label>
                <Input  id="male" type="radio"  value="M"  {...register("gender")} />
                <label>여성</label>
                <Input id="female" type="radio" checked value="W"  {...register("gender")} /> */}
            </div>

            <Btn onClick={ValidAll}>회원가입</Btn>
        </Form>
        </Wrapper>
    );
}

export default Join;