import { Link } from "react-router-dom";
import styled from "styled-components";
import UtilMenuForUser from "./List/UtilMenuForUser";
import UtilMenuForGuest from "./List/UtilMenuForGuest";
import { useRecoilState, useRecoilValue } from "recoil";
import { accessTokenAtom, isLoginSelector } from "../../atoms/AcessToken";

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
    const accessToken = useRecoilState(accessTokenAtom);

    const isLogin = useRecoilValue(isLoginSelector);

    return (
        <Wrapper>
            <ImgWrapper>
            <Link to={"/"}>
                <MainImg src="./libraryImg.PNG" sizes="" />
            </Link>
            </ImgWrapper>

            <SearchFormWrapper>
                <SearchForm>
                    <select name="selectOptions" id="">
                        <option value="저자">저자</option>
                        <option value="도서제목">도서 제목</option>
                    </select>
                    <input type="text" name="searchParam" id="searchParam" placeholder="도서검색" />
                    <button type="button">
                        <img src="./SearchBtn.PNG" alt="" />
                    </button>
                </SearchForm>
            </SearchFormWrapper>

            <UtilMenuWrapper>
                {isLogin?<UtilMenuForUser />:<UtilMenuForGuest />}
            </UtilMenuWrapper>
        </Wrapper>
    )
}

export default Header;