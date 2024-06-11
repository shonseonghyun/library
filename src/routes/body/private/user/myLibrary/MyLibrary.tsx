import { Link, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom";
import styled from "styled-components"
import SubTitle from "../../../../../component/header/SubTitle";


const Wrapper = styled.div`
    /* text-align:center; */

`;

const ItemLink = styled(Link)`
    font-size: 20px;

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
                        <ItemLink to="rentStatus">대출 현황</ItemLink>
                    </Item>
                    <Item>
                        <ItemLink to="rentHistory">대출 이력</ItemLink>
                    </Item>
                    <Item>
                        <ItemLink to="myBookcase">내 책장</ItemLink>
                    </Item>
                    <Item>
                        <ItemLink to="review">내 리뷰</ItemLink>
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