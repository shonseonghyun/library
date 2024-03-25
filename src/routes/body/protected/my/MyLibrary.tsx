import { Link, Outlet, Route, Routes } from "react-router-dom";
import styled from "styled-components"
import LoanHistoryCurrent from "./LoanHistoryCurrent";
import LoanHistoryPast from "./LoanHistoryPast";

const Wrapper = styled.div`
    width:100%;
    height:300px;
    background-color: red;
`;

const OutletWrapper = styled.div`
    width:100%;
    height:300px;
    background-color: yellow;
`;

function MyLibrary(){
    return (
        <Wrapper>
            <h1>
                MyLibrary
            </h1>
            <Link to="LoanHistoryCurrent">대출 현황</Link>
            <Link to="LoanHistoryPast">대출 현황</Link>
            <OutletWrapper>
                <Outlet />
            </OutletWrapper>
        </Wrapper>
    )
}

export default MyLibrary;