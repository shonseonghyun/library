import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "react-query";
import styled from "styled-components";
import MyLibraryTitle from "../../../../../../component/header/MyLibraryTitle";
import OurError from "../../../../../../error/OurError";
import RentRuleExplainComponent from "./RentRuleExplainComponent";
import RentstatuRows from "./RentstatuRows";

const Wrapper = styled.div`
    
`;


// const Select = styled.select`
//     font-size: 13.55px;
//     box-sizing: border-box;
//     padding-left: 9px;
//     color: #5a5a5a;
//     background-color: #e8e8e8;
//     border: none;
//     height: 25px;
//     margin-right: 3px;
//     padding-right: 24px;
// `;

export interface IRentStatusBookInfo {
    bookNo:number,
    bookName:string,
    rentDt:string,
    haveToReturnDt:string,
    extensionFlg:boolean
}
  
function RentStatus(){

    

    
    return (
        <Wrapper>
            <MyLibraryTitle title="대출 현황" />
            
            <RentRuleExplainComponent />
            
            <QueryErrorResetBoundary>
                {({ reset }) => (
                    <ErrorBoundary onReset={reset}  FallbackComponent={OurError}>
                        <RentstatuRows />
                    </ErrorBoundary>
                )}
            </QueryErrorResetBoundary>
        </Wrapper>
    );
}


export default RentStatus;