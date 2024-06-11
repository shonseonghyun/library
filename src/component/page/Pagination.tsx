import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 80%;
    margin: 50px auto;
    padding-bottom: 10px;
`;

const PageUl = styled.ul`
  list-style: none;
  text-align: center;
`;

const PageLi = styled.li<{$currentPage?:number,$page?:number}>`
  display: inline-block;
  font-size: 17px;
  padding-bottom: 5px;
  border-radius: 5px;
  width: 25px;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #646464;
  }
  background-color: ${props=>props.$currentPage && props.$currentPage===props.$page ? "#646464" : "transparent"};
  color: ${props=>props.$currentPage&& props.$currentPage===props.$page ? "white" : "black"};
`;

const PageSpan = styled.span`
    height: 100%;
    width: 100%;
    &:hover::after,
    &:focus::after {
        border-radius: 100%;
        color: white;
        background-color: #263a6c;
  }
`;

interface IPagination{
    totalCount:number,
    sizePerPage:number,
    currentPage:number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

function Pagination({totalCount,sizePerPage,currentPage,setCurrentPage}:IPagination){
    const [backPage,setBackPage] = useState(0);
    const [frontPage,setFrontPage] = useState(0);
    const MaxSizeInPage = 5 ;
    const a = Math.ceil(currentPage/MaxSizeInPage); //올림
    const pageNumbers = [];
    const totalPage = Math.ceil(totalCount / sizePerPage);

    for (let i = 1; i <= totalPage; i++) {
        if(currentPage<=MaxSizeInPage*1){
            if(i<=MaxSizeInPage*a){
                pageNumbers.push(i)
            }
        }
        else if(currentPage<=MaxSizeInPage*a && currentPage>MaxSizeInPage*(a-1)){
            if(i<=MaxSizeInPage*a && i >MaxSizeInPage*(a-1)){
                pageNumbers.push(i)
            }
        }
    }

    const moveBackPage = useCallback(()=>{
        let movePage = 0;
        if(currentPage<6 && currentPage>0){
            movePage= 1
        }
        else if(currentPage<=MaxSizeInPage*a && currentPage>MaxSizeInPage*(a-1)){
            movePage=  MaxSizeInPage*(a-1);
        }
        return movePage
    },[currentPage]);

    const moveFrontPage = useCallback(()=>{
        let movePage = 0;

        if(currentPage<=MaxSizeInPage*a && currentPage>MaxSizeInPage*(a-1)){
            movePage=  MaxSizeInPage*a + 1;
            //총페이지수>movePage -> 이동
            //총페이지수 < movePage-> 가장 마지막 총페이지수로 이동
            if(totalPage>movePage){
                return movePage;
            }
            else{
                return totalPage;
            }
        }
        else if(currentPage<6 && currentPage>0){
            movePage= 6
        }
        return movePage;
    },[currentPage]);

    useEffect(()=>{
        const backPage = moveBackPage();
        const frontPage =moveFrontPage();
        setBackPage(backPage);
        setFrontPage(frontPage);
    })

    return (
    <Wrapper>
        <PageUl className="pagination">
            <PageLi onClick={currentPage==1 ? ()=>alert("첫번째 페이지입니다.") :()=>setCurrentPage(backPage) }>
                <span>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </span>
            </PageLi>

          {pageNumbers.map((number) => (
            <PageLi key={number} onClick={()=>setCurrentPage(number)} $currentPage={currentPage} $page={number} className="page-item">
                <PageSpan className="page-link" >
                    {number}
                </PageSpan>
            </PageLi>
          ))}

            <PageLi onClick={totalPage==currentPage ? ()=>alert("마지막 페이지입니다.") : ()=>setCurrentPage(frontPage)}>
                <span>
                    <FontAwesomeIcon icon={faArrowRight} />
                </span>
            </PageLi>
        </PageUl>
    </Wrapper>
    );
}

export default Pagination;