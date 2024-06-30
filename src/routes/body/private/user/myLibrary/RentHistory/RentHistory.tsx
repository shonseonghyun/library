import styled from "styled-components";
import MyLibraryTitle from "../../../../../../component/header/MyLibraryTitle";
import RentHistoryRows from "./RentHistoryRows";
import { ErrorBoundary } from "react-error-boundary";
import OurError from "../../../../../../error/OurError";
import { QueryErrorResetBoundary } from "react-query";


const Wrapper = styled.div`
    width:100%;
`;

export interface IRentHistoryBookInfo {
    historyNo:number,
    bookNo:number,
    bookName:string,
    rentDt:string,
    haveToReturnDt:string,
    returnDt:string,
    rentState:string,
    // status:string,
    extensionFlg:boolean
}

function RentHistory(){
    

    return (
        <Wrapper>
            <MyLibraryTitle title="대출 이력" />
            <QueryErrorResetBoundary>
                {({ reset }) => (
                    <ErrorBoundary onReset={reset}  FallbackComponent={OurError}>
                        <RentHistoryRows />
                    </ErrorBoundary>
                )}
            </QueryErrorResetBoundary>
        </Wrapper>
    )
}

export default RentHistory;