import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const PageUl = styled.ul`
  float: left;
  list-style: none;
  text-align: center;
  border-radius: 3px;
  color: white;
  padding: 1px;
  border-top: 3px solid #186ead;
  border-bottom: 3px solid #186ead;
  background-color: rgba(0, 0, 0, 0.4);
`;

const PageLi = styled.li`
  display: inline-block;
  font-size: 17px;
  font-weight: 600;
  padding: 5px;
  border-radius: 5px;
  width: 25px;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #263a6c;
  }
  &:focus::after {
    color: white;
    background-color: #263a6c;
  }
`;

const PageSpan = styled.span`
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
    currentPage:number
}

function Pagination({totalCount,sizePerPage,currentPage}:IPagination){
    const [backPage,setBackPage] = useState(0);
    const [frontPage,setFrontPage] = useState(0);
    const location = useLocation();
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

    const moveBackPage = ()=>{
        let movePage = 0;
        if(currentPage<6 && currentPage>0){
            movePage= 1
        }
        else if(currentPage<=MaxSizeInPage*a && currentPage>MaxSizeInPage*(a-1)){
            movePage=  MaxSizeInPage*(a-1);
        }
        return movePage
    }

    const moveFrontPage = ()=>{
        let movePage = 0;
        if(currentPage<6 && currentPage>0){
            movePage= 6
        }
        else if(currentPage<=MaxSizeInPage*a && currentPage>MaxSizeInPage*(a-1)){
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
        return movePage
    }

    useEffect(()=>{
        const backPage = moveBackPage();
        const frontPage =moveFrontPage();
        setBackPage(backPage);
        setFrontPage(frontPage);
    })

    return (
    <div>
      <nav>
        <PageUl className="pagination">
            <PageLi>
                {
                    currentPage==1
                    ? "뒤"
                    :
                <Link to={`${location.pathname}?page=${backPage}&size=${sizePerPage}`}>
                    뒤
                </Link>
                }
            </PageLi>
          {pageNumbers.map((number) => (
            <PageLi key={number} className="page-item">
                <Link style={{ textDecoration: "none"}} to={`${location.pathname}?page=${number}&size=${sizePerPage}`}>
                    <PageSpan className="page-link">
                        {number}
                    </PageSpan>
                </Link>
            </PageLi>
          ))}
            <PageLi>
            {
                    totalPage==currentPage
                    ? 
                        "앞"
                    :
                    <Link to={`${location.pathname}?page=${frontPage}&size=${sizePerPage}`}>
                        앞
                    </Link>
            }
                
            </PageLi>
        </PageUl>
      </nav>
    </div>
    );
}

export default Pagination;