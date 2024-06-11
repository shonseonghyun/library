import { Link, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom";
import styled from "styled-components"
import SubTitle from "../../../../../component/header/SubTitle";
import PrivateLink from "../../../../../component/Link/PrivateLink";

const fontSize = "18px";

const Wrapper = styled.div`

`;

const OutletWrapper = styled.div`
  text-align:center;
  /* background-color:red; */
  width: 80%;
  margin: 0 auto;
`;

const ListWrapper = styled.div`
    text-align: center;
    width: 80%;
    margin: 10px auto;
`;

const List = styled.ul`
    width: 100%;
`;

const Item = styled.li`
    display:inline-block;
    border: 1px solid #d2d2d2;
    margin-right:5px;
    padding: 10px;
    height: 40px;
    text-align: center;
`;


function MyLibrary(){
    return (
        <Wrapper>
            <SubTitle title="내 서재" />

            <ListWrapper>
                <List>
                    <Item>
                        <PrivateLink to="rentStatus" fontSize={fontSize}>대출 현황</PrivateLink>
                    </Item>
                    <Item>
                        <PrivateLink to="rentHistory" fontSize={fontSize}>대출 이력</PrivateLink>
                    </Item>
                    <Item>
                        <PrivateLink to="myBookcase" fontSize={fontSize}>내 책장</PrivateLink>
                    </Item>
                    <Item>
                        <PrivateLink to="review" fontSize={fontSize}>내 리뷰</PrivateLink>
                    </Item>
                </List>
            </ListWrapper>
           
            <OutletWrapper>
                <Outlet />
            </OutletWrapper>

        </Wrapper>
    )
}

export default MyLibrary;