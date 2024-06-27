import React, { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { AuthUserInfoAtom } from "../../../../../../atoms/AuthUserInfo";
import MyLibraryTitle from "../../../../../../component/header/MyLibraryTitle";
import Loading from "../../../../../../component/loading/Loading";
import Select from "../../../../../../component/slsect/Select";
import { useExtendBook, useGetRentStatus, useReturnBook } from "../../../../../../hooks/hooks";
import RentRuleExplainComponent from "./RentRuleExplainComponent";
import RentStatusRow from "./RentStatusRow";
import RentstatuRows from "./RentstatuRows";
import { ErrorBoundary } from "react-error-boundary";
import OurError from "../../../../../../error/OurError";

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
            
            <ErrorBoundary FallbackComponent={OurError}>
                <RentstatuRows />
            </ErrorBoundary>

        </Wrapper>
    );
}


export default RentStatus;