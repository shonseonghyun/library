import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { AuthUserInfoAtom } from '../../../../../atoms/AuthUserInfo';
import { useGetMyPage, useModifyUser } from '../../../../../hooks/hooks';
import { useEffect, useState } from 'react';
import { replaceDt, replaceTel, replaceTm } from '../../../../../api/utils';
import { useQueryClient } from 'react-query';
import Loading from '../../../../headers/component/loading/Loading';

const Wrapper = styled.div`
`;

const SubSearchWrapper =styled.div`
    background:linear-gradient(to right, rgba(72, 52, 212,1.0), white); 
`;

const SearchWrapper =styled.div`
    width: 80%;
    font-size: 28px;
    padding: 15px 0px;
    margin:0 auto;
`;

const FormWrapper =styled.div`
    width: 80%;
    font-size: 28px;
    padding: 15px 0px;
    margin:0 auto;
`;

const Table = styled.table`
    border:  1px solid #d2d2d2;
    border-collapse: collapse ;
`;

const Tbody = styled.tbody`
    display: table-row-group;
    vertical-align: middle;
    unicode-bidi: isolate;
    border-color: inherit;


`;

const Th = styled.th`
    border:  1px solid #d2d2d2;
    background-color: #6ab2cb;
    color:white;
    padding:10px 20px;
    text-align: left;
    white-space: nowrap;
`;

const Td = styled.td`
    border:  1px solid #d2d2d2;
    width: 90%;
    padding-left: 10px;
    text-align: left;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

interface IModifyProps{
    userPwd:string,
    passwordCheck:string,
    tel:string,
    gender:string,
}

export interface IUserInfo{
    userNo:number
    userId:string,
    userName:string,
    // userPwd: string,
    gender:string,
    provider:string,
    tel:string,
    userEmail:string,
    useFlg:number,
    userGrade:string
    createdDt:string,
    createdTm:string,
    modifiedDt:string,
    modifiedTm:string
}

const MyPage = () => {
    const authInfo = useRecoilValue(AuthUserInfoAtom);
    const {register,handleSubmit,getValues,reset} = useForm<IModifyProps>();
    const {mutate:modifyUserMutate} = useModifyUser(authInfo.userNo);
    const [userInfo,setUserInfo] = useState<IUserInfo>();
    const queryClient = useQueryClient();
    const onSuccess= (data:any)=>{
        setUserInfo(data.data);
    }
    const {isLoading} = useGetMyPage({userNo:authInfo.userNo,onSuccess:onSuccess});

    const onValid = (data:IModifyProps)=>{
        if(getValues("passwordCheck")==getValues("userPwd")){
            modifyUserMutate.mutate(data);
            reset();
            queryClient.removeQueries();
        }
        else{
            alert("패스워드가 일치하지 않습니다. 확인 바랍니다.");
        }
    }

    useEffect(()=>{
        console.log(userInfo);
    },[userInfo]);

    const onInValid = (data:any)=>{
        if(data.userPwd){
            alert(data.userPwd.message);
        }
        else if(data.passwordCheck){
            alert(data.passwordCheck.message);
        }
    }

    return (
        <Wrapper>
            <SubSearchWrapper>
                <SearchWrapper>
                    마이 페이지
                </SearchWrapper>
            </SubSearchWrapper>

            <FormWrapper>
                {
                    isLoading ? <Loading/> 
                    :
                    <form onSubmit={handleSubmit(onValid,onInValid)}>
                        <Table>
                            <Tbody>
                                <tr>
                                    <Th>회원구분</Th>
                                    <Td>
                                        {userInfo?.userGrade}
                                    </Td>
                                </tr>
                                <tr>
                                    <Th>성명</Th>
                                    <Td>
                                        {userInfo?.userName}
                                    </Td>
                                </tr>
                                <tr>
                                    <Th>아이디</Th>
                                    <Td>
                                        {userInfo?.userId}
                                    </Td>
                                </tr>
                                {
                                    userInfo?.provider !="NONE"  ? null
                                    :
                                    <>
                                        <tr>
                                            <Th>변경 비밀번호</Th>
                                            <Td>
                                                <input type="password" {...register("userPwd"
                                                // ,{
                                                //     required:"비밀번호는 필수 입력 값입니다.",
                                                //     minLength:{
                                                //         value:4,
                                                //         message:"비밀번호 4자리 이상 입력하세요."
                                                //     }
                                                // }
                                                )}/>
                                            </Td>
                                            </tr>
                                            <tr>
                                            <Th>변경 비밀번호 확인</Th>
                                            <Td>
                                                <input type="password" {...register("passwordCheck"
                                                // ,{
                                                //         validate:{
                                                //             checkPwd:fieldValue => {
                                                //             return (fieldValue==getValues("userPwd")|| '비밀번호가 일치하지 않습니다.')
                                                //         }
                                                //     }
                                                //     }
                                                )}/>
                                            </Td>
                                        </tr>
                                    </>
                                }
                                
                                {
                                    userInfo?.provider!="NONE" &&
                                    <>
                                    <tr>
                                        <Th>
                                            소셜 로그인 플랫폼
                                        </Th>
                                        <Td>
                                            {userInfo?.provider}
                                        </Td>
                                    </tr>
                                    </>
                                }
                                
                                <tr>
                                    <Th>성별</Th>
                                    <Td>
                                        <label>남성</label>
                                        <input type="radio" id="male" value="M"  
                                        // checked={true}
                                        checked={userInfo?.gender =="M" ? true : undefined} 
                                        // onClick={()=>console.log("s")} 
                                        {...register("gender")} />
                                        
                                        <label>여성</label>
                                        <input type="radio" id="female" value="W" 
                                        // checked={false}
                                        checked={userInfo?.gender =="W" ? true : undefined}
                                        {...register("gender")} />
                                    </Td>
                                </tr>
                                <tr>
                                    <Th>이메일</Th>
                                    <Td>
                                        {userInfo?.userEmail}
                                    </Td>
                                </tr>
                                <tr>
                                    <Th>휴대폰 번호</Th>
                                    <Td>
                                        <input type="text" {...register("tel"
                                        // ,{
                                        //     pattern:{
                                        //         value:/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
                                        //         message:"휴대폰번호 형식이 유효하지 않습니다."
                                        //     }}
                                        )} defaultValue={userInfo?.tel}/>
                                        {/* {userInfo?.tel && replaceTel(userInfo.tel)} */}
                                    </Td>
                                </tr>
                                <tr>
                                    <Th>가입일</Th>
                                    <Td>
                                        {replaceDt(userInfo?.createdDt!)} 
                                            &nbsp;
                                        {replaceTm(userInfo?.createdTm!)}
                                    </Td>
                                </tr>
                                <tr>
                                    <Th>정보 수정일</Th>
                                    <Td>
                                        {replaceDt(userInfo?.modifiedDt!)} 
                                            &nbsp;
                                        {replaceTm(userInfo?.createdTm!)}
                                    </Td>
                                </tr>
                                
                            </Tbody>
                        </Table>

                        <ButtonWrapper>
                            <button>수정</button>
                        </ButtonWrapper>
                    </form>
                }
            </FormWrapper>


        </Wrapper>    
    );
};

export default MyPage;