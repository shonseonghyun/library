import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import {  AuthUserInfoAtom, isLoginSelector } from "../../atoms/AuthUserInfo";
import MenuForUser from "./List/MenuForUser";
import MenuForGuest from "./List/MenuForGuest";
import { useState } from "react";

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


const SearchWrapper = styled.div`
`;

const UtilMenuWrapper = styled.div`
`;


function Header(){
    const isLogin = useRecoilValue(isLoginSelector);
    const [cateogry,setCategory] = useState("bookAuthor");
    const [inquriyWord,setInquriyWord] = useState("");
    const navigate = useNavigate();

    const inquiryBooks = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        if(inquriyWord.trim().length==0){
            alert("검색명을 입력해주세요.");
            return;
        }
        navigate(`/book/inquiry/${cateogry}/${inquriyWord}`)
    }

    const selectCategory = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        setCategory(e.currentTarget.value);
    }

    const inputInquiryWord = (e:React.FocusEvent<HTMLInputElement>)=>{
        setInquriyWord(e.currentTarget.value);
    }

    return (
        <Wrapper>
            <ImgWrapper>
            <Link to={"/"}>
                <MainImg src={`${process.env.PUBLIC_URL}/img/libraryImg.PNG`} />
            </Link>
            </ImgWrapper>

            <SearchFormWrapper>
                <SearchWrapper>
                    <select onChange={selectCategory} name="selectOptions" id="selectOptions">
                        <option value="bookAuthor">저자</option>
                        <option value="bookName">도서 제목</option>
                    </select>
                    <input type="text" name="inquriyWord" id="inquriyWord" onBlur={inputInquiryWord} placeholder="도서검색" />
                    <SearchBtn type="button" onClick={inquiryBooks}>
                        <img src={`${process.env.PUBLIC_URL}/img/button/searchBtn.png`} />
                    </SearchBtn>
                </SearchWrapper>
            </SearchFormWrapper>

            <UtilMenuWrapper>
                {isLogin?<MenuForUser />:<MenuForGuest />}
            </UtilMenuWrapper>
        </Wrapper>
    )
}

export default Header;