import { Link, Outlet, Route, Routes } from "react-router-dom";
import styled from "styled-components"

const ContentContainer = styled.div`
    width:1000px;
    margin:0 auto;
    text-align:center;
    background-color : yellow;
`;

const Wrapper = styled.div`
    width:1000px;
    margin:0 auto;
    text-align:center;
    background-color : yellow;
`;

const OutletWrapper = styled.div`
    width:100%;
    height:300px;
    background-color: yellow;
`;



const List = styled.li`
    display:inline-block;
    border: 1px solid #d2d2d2;
    margin-right:10px;
    `;
    // background-color: ${props=>props.isSelected? "gray":"white"}

const Lists = styled.ul`

`;

function MyLibrary(){
    return (
        <Wrapper>
            <h1>
                내서재
            </h1>

            <Lists>
                <List>
                    <Link to="LoanHistoryCurrent">대출 현황</Link>
                </List>
                <List>
                    <Link to="LoanHistoryPast">대출 이력</Link>
                </List>
                <List>
                    <Link to="myBookcase">내 책장</Link>
                </List>
            </Lists>
           
            <OutletWrapper>
                <Outlet />
            </OutletWrapper>

        </Wrapper>
    )
}

export default MyLibrary;