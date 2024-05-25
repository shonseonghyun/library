import { Link, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom";
import styled from "styled-components"


const Wrapper = styled.div`
    /* text-align:center; */

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

const ItemLink = styled(Link)`
    font-size: 20px;

`;
const OutletWrapper = styled.div`
  text-align:center;
  background-color:red;
  width: 80%;
  margin: 0 auto;
`;

const ListWrapper = styled.div`
    text-align: center;
    width: 80%;
    margin: 0 auto;
    margin-top: 10px;
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
            <SubSearchWrapper>
                <SearchWrapper>
                    내 서재
                </SearchWrapper>
            </SubSearchWrapper>

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