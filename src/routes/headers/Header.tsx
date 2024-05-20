import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import UtilMenu from "./component/util-menu/UtilMenu";

const SearchBtn = styled.button`
    border: 0;
    background-color: transparent;
    cursor:pointer;
`;

const Wrapper = styled.div`

`;

//부모
const Nav = styled.nav`
    height: 90px;
    width: 80%;
    /* background-color: yellow; */
    margin: 0 auto;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const ImgWrapper = styled.div`
    width:25%;
    /* background-color: red; */
`;

const Logo = styled.svg`
    width: 50px;
    height: 50px;
`;

const MenuWrapper = styled.div`
    width:25%;
    display: flex;
    justify-content: end;
    cursor: pointer;
`;

const OverlayLine = styled(motion.div)`
    position: absolute;
    width: 100%;
    padding-top: 5px;
`;

const MenuText = styled(motion.div)`
    position:relative;
    &:hover > ${OverlayLine}{
        border-top: 4px solid blue;
    }
`;

const Text = styled.p`
    font-size: 20px;
    margin-top: 10px;
`;

const SearchFormWrapper = styled.div`
    width:50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Input = styled.input`
`;

const SearchForm = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;

    ${Input},select{
        height: 30px;
    }

    select{
        width:50%;
    }

    ${Input}{
        width:100%;
    }
`;

const Svg = styled.svg`
    width:20px;
    height: 20px;
`;



function Header(){
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
            <UtilMenu />

            <Nav>
                <ImgWrapper>
                    <Link to={"/"}>
                        <Logo stroke-width="1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                            <path d="M12 21V7C12 5.89543 12.8954 5 14 5H21.4C21.7314 5 22 5.26863 22 5.6V18.7143" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path>
                            <path d="M12 21V7C12 5.89543 11.1046 5 10 5H2.6C2.26863 5 2 5.26863 2 5.6V18.7143" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path>
                            <path d="M14 19L22 19" stroke="#000000"  stroke-linecap="round"></path>
                            <path d="M10 19L2 19" stroke="#000000"  stroke-linecap="round"></path>
                            <path d="M12 21C12 19.8954 12.8954 19 14 19" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M12 21C12 19.8954 11.1046 19 10 19" stroke="#000000" stroke-linecap="round" stroke-linejoin="round">
                            </path>
                        </Logo>
                    </Link>
                </ImgWrapper>

                <SearchFormWrapper>
                    <SearchForm>
                        <select onChange={selectCategory} name="selectOptions" id="selectOptions">
                            <option value="bookAuthor">저자</option>
                            <option value="bookName">도서 제목</option>
                        </select>
                        <Input type="text" name="inquriyWord" id="inquriyWord" onBlur={inputInquiryWord} placeholder="도서검색" />
                        <SearchBtn type="button" onClick={inquiryBooks}>
                            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></Svg>
                        </SearchBtn>
                    </SearchForm>
                </SearchFormWrapper>

                <MenuWrapper>
                    <MenuText>
                        <OverlayLine/>
                        <Text>
                            메뉴
                        </Text>
                    </MenuText>
                </MenuWrapper>
            </Nav>
        </Wrapper>
    )
}

export default Header;