import { Link } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import {  AuthUserInfoAtom, isLoginSelector } from "../../atoms/AuthUserInfo";
import MenuForUser from "./List/MenuForUser";
import MenuForGuest from "./List/MenuForGuest";

const SearchBtn = styled.button`
    border: 0;
    background-color: transparent;
    cursor:pointer;
    &:hover {
        background: black;
        color: black;
        transition: 2s;
      }
`;

const Wrapper = styled.div`

`
;

const ImgWrapper = styled.div`

`;

const MainImg = styled.img`
`;

const SearchFormWrapper = styled.div`
`;


const SearchForm = styled.form`
`;

const UtilMenuWrapper = styled.div`
`;


function Header(){
    const isLogin = useRecoilValue(isLoginSelector);

    return (
        <Wrapper>
            <ImgWrapper>
            <Link to={"/"}>
                <MainImg src={`${process.env.PUBLIC_URL}/img/libraryImg.PNG`} />
            </Link>
            </ImgWrapper>

            <SearchFormWrapper>
                <SearchForm>
                    <select name="selectOptions" id="selectOptions">
                        <option value="저자">저자</option>
                        <option value="도서제목">도서 제목</option>
                    </select>
                    <input type="text" name="searchParam" id="searchParam" placeholder="도서검색" />
                    <SearchBtn type="button">
                        <img src={`${process.env.PUBLIC_URL}/img/button/searchBtn.png`} />
                    </SearchBtn>
                </SearchForm>
            </SearchFormWrapper>

            <UtilMenuWrapper>
                {isLogin?<MenuForUser />:<MenuForGuest />}
            </UtilMenuWrapper>
        </Wrapper>
    )
}

export default Header;