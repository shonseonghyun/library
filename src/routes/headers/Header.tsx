import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useLocation, useMatch, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import UtilMenu from "./component/util-menu/UtilMenu";
import { useForm } from "react-hook-form";

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
    cursor: pointer;
`;

const SearchFormWrapper = styled.div`
    width:50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Select = styled.select`
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
    fill: ${props=>props.theme.textColor};

`;

interface IFormProps{
    inquiryWord:string,
    selectOption: string
}


function Header(){
    console.log("Header 랜더링");
    const match = useMatch("/book/inquiry/:cateogry/:inquiryWord") ;
    const {register,handleSubmit,getValues} = useForm<IFormProps>();
    const location = useLocation();
    const word = location.pathname.substring(location.pathname.lastIndexOf("/")+1);

    const onSubmit = (data :IFormProps) =>{
        if(getValues("inquiryWord").trim().length==0){
            alert("검색명을 입력해주세요.");
            return;
        }
        window.location.href=`/book/inquiry/${data.selectOption}/${data.inquiryWord}`;
    }   

    return (
        <Wrapper>
            <UtilMenu />

            <Nav>
                <ImgWrapper>
                    <Link to={"/"}>
                        <Logo strokeWidth="1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21V7C12 5.89543 12.8954 5 14 5H21.4C21.7314 5 22 5.26863 22 5.6V18.7143" strokeWidth="1.5" strokeLinecap="round"></path>
                            <path d="M12 21V7C12 5.89543 11.1046 5 10 5H2.6C2.26863 5 2 5.26863 2 5.6V18.7143" strokeWidth="1.5" strokeLinecap="round"></path>
                            <path d="M14 19L22 19" strokeLinecap="round"></path>
                            <path d="M10 19L2 19" strokeLinecap="round"></path>
                            <path d="M12 21C12 19.8954 12.8954 19 14 19" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M12 21C12 19.8954 11.1046 19 10 19" strokeLinecap="round" strokeLinejoin="round"></path>
                        </Logo>
                    </Link>
                </ImgWrapper>

                <SearchFormWrapper>
                    <SearchForm onSubmit={handleSubmit(onSubmit)}>
                        <Select {...register("selectOption")}>
                            <option value="bookName">도서 제목</option>
                            <option value="bookAuthor">저자</option>
                        </Select>
                        <Input type="text" placeholder="도서 검색" {...register("inquiryWord")} defaultValue={match ? (word ? decodeURI(word) : ""): ""}/>
                        <SearchBtn type="submit">
                            <Svg strokeWidth="1" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path stroke="white" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                            </Svg>
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