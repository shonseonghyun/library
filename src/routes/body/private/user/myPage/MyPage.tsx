import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from 'react-query';
import styled from 'styled-components';
import SubTitle from '../../../../../component/header/SubTitle';
import OurError from '../../../../../error/OurError';
import MypageForm from './MypageForm';

const Wrapper = styled.div`
`;



export interface IUserInfo{
    userNo:number
    userId:string,
    userName:string,
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
    
   

    return (
        <Wrapper>
            <SubTitle title="마이 페이지"/>
            <QueryErrorResetBoundary>
                {({ reset }) => (
                    <ErrorBoundary onReset={reset}  FallbackComponent={OurError}>
                        <MypageForm />
                    </ErrorBoundary>
                )}
            </QueryErrorResetBoundary>
        </Wrapper>    
    );
};

export default MyPage;