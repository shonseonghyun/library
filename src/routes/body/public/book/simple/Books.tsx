import { motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { regHeartBook, rentBook } from "../../../../../api/api";
import { AuthUserInfoAtom, isLoginSelector } from "../../../../../atoms/AuthUserInfo";
import LoginModal from "../../../../../component/login/LoginModal";
import Pagination from "../../../../../component/page/Pagination";
import { useInquiryBooks, useRegHeartBook } from "../../../../../hooks/hooks";
import { getFilePath } from "../../../../../api/utils";

enum GridType  {
    ListType="listType",
    ImgType = "imgType"
}

const Wrapper = styled.div`
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

const InquriyResultWrapper = styled.div`
    width: 80%;
    margin: 0 auto;
    margin-top: 10px;
`;

const InquriyCategory = styled.div`
`;

const InquriyCountWrapper =styled.div`
  display  : inline-block ;
  margin-right: 10px;
  font-size: 15px;
`;

const InquriyWordWrapper = styled.div`
  display  : inline-block ;
  font-size: 15px;
`;

const HighLightWord = styled.span`
    font-size  :15px ;
    color:red;
    display: inline-block;
`;


const InquriyOptionsWrapper=  styled.div`
    display: flex;
    justify-content: end;
    padding-bottom: 5px;
    border-bottom: 1px solid #d2d2d2;
`;


const Select = styled.select`
    font-size: 13.55px;
    box-sizing: border-box;
    padding-left: 9px;
    color: #5a5a5a;
    background-color: #e8e8e8;
    border: none;
    height: 25px;
    margin-right: 3px;
    padding-right: 24px;
`;

const GridTypeWrapper = styled.div`

`;

const GridTypeImg = styled.img`
    width: 23px;
    height: 23px;
    margin-right: 2px;
    cursor: pointer;
`;

const InquriyResult =styled.div<{gridType:GridType}>`
    display: grid;
    gap : ${props=> (props.gridType === GridType.ImgType) ? "40px" : "0px"} ;
    grid-template-columns: repeat(${props=>props.gridType === GridType.ListType ? 1 : 5},1fr);
`;


const Row = styled.div`
    position: relative;
    margin-top: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #d2d2d2;
`;

const IndexWrapper = styled.div`
    margin-bottom: 10px;
    span{
        font-size: 15px;
        display: block;
    }
`;

const BookImgWrapper = styled.div`
    width:13%;
    float: left;
    height: 170px;
`;

const BookContentsWrapper = styled.div`
    width: 50%;
    height: 140px;
    float: left;
    margin-left: 10px;
    position: relative;
`;

const BookTitle = styled.div`
    height: 55px;
`;

const Info = styled.ul`
    display: block;
    height: 20px;
    span{
        font-size: 12px;

        &:first-child{
            border-right: 1px solid #d2d2d2;
            padding-right: 5px;
        }
        &:nth-child(2){
            border-right: 1px solid #d2d2d2;
            padding-right: 5px;
            padding-left: 5px;
        }
        &:last-child{
            padding-left: 5px;
        }
    }
`;

const ButtonWrapper = styled.div`
    height: 45px;
    width: 100%;
    float:left;
`;

const Button = styled.button`   
    background-color:rgba(52, 152, 219,1.0);  
    margin-right: 5px;
    height: 40px;
    padding: 0px 10px;
    color: #fff!important;
`;

const Img = styled.img`
    width:100%;
    height:inherit;
`;

const HiddenContentWrapper = styled.div`
    float: left;
    width: 100%;
    height: 20px;
    position: relative;
`;

const HiddenContent = styled(motion.div)`
    position: absolute;
    width: 100%;
    height: 100px;
    background-color: yellow;
`;

const TextForHidden = styled.div`
    font-size: 15px;
    cursor: pointer;
    font-weight: 700;
`;

type InquriyBooksParams={
    category: string,
    inquiryWord:string
}

export interface IHeartBookProps{
    bookNo:number,
    userNo:number
}
const OverlayContent= styled.div`
    position: absolute;
    background-color: rgba(0,0,0,0.5);
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    color:white;
    opacity: 0;
    cursor: pointer;
`;

const BtnWrapper = styled.div`
  position  :relative ;
  margin-top: 30px;
  color: white;
  text-align: center;
    top:-100px; 
    opacity: 0;
`;

const ImgWrapper = styled.div`
    width: 100%;
    height: 308px;
    position: relative;
    &:hover{
        ${OverlayContent},${BtnWrapper}{
            opacity: 1;
        }
    }
`;

interface IBookProps{
    bookNo:number,
    bookName:string,
    bookAuthor:string,
    pubDt:string,
    bookState:string,
    bookImage:{
        originalFileName:string,
        fileSize:number,
        filePath:string,
        newFileName:string
    }
}

function Books(){
    console.log("books 랜더링");
    const navigate = useNavigate();
    const [books,setBooks] = useState<IBookProps[]>([]);
    const [showing,setShowing] = useState(false); 
    const isLogin = useRecoilValue(isLoginSelector);
    const authUserInfo = useRecoilValue(AuthUserInfoAtom);
    const [gridType,setGridType] = useState<GridType>(GridType.ListType);
    const {category,inquiryWord} = useParams() as InquriyBooksParams ;
    const [totalCount,setTotalCount] = useState(-1);
    const [currentPage,setCurrentPage] = useState(1);
    const [sizePerPage,setSizePerPage] = useState(10);

    
    const onSuccess = (data:any)=>{
        setBooks(data.data.bookList);
        setTotalCount(data.data.totalCount);
    }
    const {isLoading} = useInquiryBooks({category,inquiryWord,currentPage,sizePerPage,totalCount,onSuccess});
    const {mutate:regHeartMutate} = useRegHeartBook();
    
    const changeNum = useCallback((e:React.ChangeEvent<HTMLSelectElement>)=>{
        setSizePerPage(parseInt(e.currentTarget.value));
    },[]);

    const clickedHeart = useCallback((e:React.MouseEvent<HTMLButtonElement>)=>{
        if(isLogin){
            regHeartMutate.mutate({bookNo:parseInt(e.currentTarget.value),userNo:authUserInfo.userNo});
        }else{
            setShowing(true);
        }
    },[isLogin]);

    const changeOrder = useCallback((e:React.ChangeEvent<HTMLSelectElement>)=>{
        const orderVal = e.currentTarget.value;
        
        if(orderVal === "recent"){
            setBooks(
                [...books].sort(function(a,b){
                    return b.bookNo-a.bookNo
                })
            )
        }
        else if(orderVal==="author"){
            setBooks(
                [...books].sort(function(a,b){
                    return b.bookAuthor < a.bookAuthor ? -1 : b.bookAuthor > a.bookAuthor ? 1 : 0;
                })
            )
        }else if(orderVal==="pubDt"){
            setBooks(
                [...books].sort(function(a,b){
                    return parseInt(b.pubDt)-parseInt(a.pubDt)
                })
        )
        }
    },[books]);

    const rent = useMutation(({userNo, bookNo}:IHeartBookProps)=>rentBook(userNo,bookNo),{
        onSuccess(data) {
            if(data.code === "S00"){
                alert("대출 완료하였습니다.");
            }else{
                alert(data.msg);
            }
        },
    })

    const clickedImgType = ()=>{
        setGridType(GridType.ImgType);
        setSizePerPage(20);
    }

    const clickedListType = ()=>{
        setGridType(GridType.ListType);
        setSizePerPage(10);
    }

    const clickedRent = useCallback((e:React.MouseEvent<HTMLButtonElement>)=>{
        if(isLogin){
            rent.mutate({bookNo:parseInt(e.currentTarget.value),userNo:authUserInfo.userNo});
        }else{
            setShowing(true);
        }
    },[isLogin]);

    return (
        <Wrapper>
           <SubSearchWrapper>
                <SearchWrapper>
                    도서 조회 결과
                </SearchWrapper>
            </SubSearchWrapper>
            
            <InquriyResultWrapper>
                <InquriyCategory>
                   <InquriyCountWrapper>
                    검색결과 총  
                        <HighLightWord style={{color:"red",display:"inline-block",fontSize:"15px"}}>
                            &nbsp; 
                            {totalCount}
                            &nbsp; 
                        </HighLightWord> 
                        건
                    </InquriyCountWrapper>
                    <InquriyWordWrapper>
                        검색어 
                        <HighLightWord style={{color:"red",display:"inline-block",fontSize:"15px"}}>
                            &nbsp; 
                            [키워드 : {inquiryWord}]
                            &nbsp; 
                        </HighLightWord> 
                    </InquriyWordWrapper>
                </InquriyCategory>

                <InquriyOptionsWrapper>
                    <Select name="orderCategory" id="orderCategory" onChange={changeOrder}>
                        <option value="recent">최신 등록순</option>
                        <option value="author">저자</option>
                        <option value="pubDt">발행년도</option>
                    </Select>
                    {
                        gridType === GridType.ListType
                        ?
                        <Select name="num" id="num" onChange={changeNum}>
                            <option value="1">10건</option>
                            <option value="2">20건</option>
                            <option value="30">30건</option>
                            <option value="50">50건</option>
                        </Select>
                        :
                        <Select name="num" id="num" onChange={changeNum}>
                            <option value="20">20건</option>
                            <option value="30">30건</option>
                            <option value="40">40건</option>
                            <option value="50">50건</option>
                        </Select>
                    }

                    <GridTypeWrapper>
                        {
                            gridType===GridType.ListType ?
                            <GridTypeImg src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAALklEQVQ4jWMMSGn6z4AENsypY4Tx0OXwASZiFQ49g4YxGI3+EQ1Go58AYGBgAABnjxK143yskQAAAABJRU5ErkJggg==" alt="list" />
                            :
                            <GridTypeImg onClick={clickedListType} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAALUlEQVQ4jWOMiopqYEACy5Ytg/PR5fABJmIVDj2DhjEYjf4RDUajnwBgYGAAAGKsEMDZ8KuOAAAAAElFTkSuQmCC" alt="cover" />
                        }
                        {
                            gridType===GridType.ImgType ?
                            <GridTypeImg src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAOElEQVQ4jWMMSGn6z4AfMEJl8apjImAI0WDUoKFoEAtSOiEEsKpbP7sWTFPNRaMpe9QgigEDAwMAakIIWPzMgWUAAAAASUVORK5CYII=" alt="list" />                    
                            :
                            <GridTypeImg onClick={clickedImgType} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAQUlEQVRIiWM8ePDgfwbiACOaKqL0MRFpONlg1IJRC0YtYGBgwZJDiQVE6RuNA4KAhdhScbQ0HbVg1ILBagEDAwMAxp4Gd/tw/dEAAAAASUVORK5CYII=" alt="cover" />
                        }
                    </GridTypeWrapper>
                </InquriyOptionsWrapper>

                <InquriyResult gridType={gridType}>
                    {
                        isLoading ? 
                        <p>
                            Loading
                        </p>
                        :
                        books?.map((book,index: any) =>{
                            return (
                                <Row key={book.bookNo}>
                                    {
                                        gridType === GridType.ListType
                                        ?
                                        <>
                                            <IndexWrapper>
                                                <span>{index+1}.</span>
                                            </IndexWrapper>
                                            <BookImgWrapper>
                                                <Img 
                                                    src={`${process.env.PUBLIC_URL}/`+ getFilePath(book.bookImage.filePath ,book.bookImage.newFileName)} 
                                                />
                                            </BookImgWrapper>

                                            <BookContentsWrapper>
                                                    <BookTitle>
                                                        <Link style={{ fontSize:"20px"}}to={`/book/${book.bookNo}`}> 
                                                                {book.bookName}
                                                        </Link>
                                                    </BookTitle>
                                                <Info>
                                                    <span>{book.bookAuthor}</span>
                                                    <span>출판사</span>
                                                    <span>{book.pubDt}</span>
                                                </Info>
                                                <Info>
                                                    <span>{book.bookState==="RENT_AVAILABLE" ? "대출 가능" : "대출 불가" }</span>
                                                    <span>위치</span>
                                                    <span>부록없음</span>
                                                </Info>
                                                <ButtonWrapper>
                                                    <Button 
                                                        onClick={clickedRent}
                                                        value={book.bookNo}
                                                        style={{ 
                                                            backgroundColor: book.bookState==="RENT_UNAVAILABLE" ? "#a99e9e9c" : "rgba(52, 152, 219,1.0)",
                                                            cursor: book.bookState==="RENT_UNAVAILABLE" ? "not-allowed" : "pointer"}} 
                                                            disabled={book.bookState==="RENT_UNAVAILABLE"? true : false} 
                                                            >
                                                            대출하기
                                                    </Button>
                                                    <Button value={book.bookNo}>예약하기</Button>
                                                    <Button value={book.bookNo} onClick={clickedHeart}>찜하기</Button>
                                                </ButtonWrapper>
                                                <HiddenContentWrapper>
                                                    <TextForHidden>
                                                        도서정보
                                                    </TextForHidden>
                                                </HiddenContentWrapper>
                                            </BookContentsWrapper>
                                        </>
                                        :
                                        <>
                                            <ImgWrapper>
                                                <Img src={`${process.env.PUBLIC_URL}/`+ getFilePath(book.bookImage.filePath ,book.bookImage.newFileName)} />
                                                <OverlayContent onClick={()=>navigate(`/book/${book.bookNo}`)}>
                                                    <div className="title" style={{marginTop : "30px",color:"white",textAlign:"center" , fontSize:"20px"}}>
                                                            {book.bookName}
                                                    </div>
                                                    <div className="title" style={{marginTop : "30px",color:"white",textAlign:"center" , fontSize:"20px"}}>
                                                            {book.bookAuthor}
                                                    </div>
                                                </OverlayContent>
                                                <BtnWrapper>
                                                        <Button value={book.bookNo} onClick={clickedHeart}>찜하기</Button>
                                                </BtnWrapper>
                                            </ImgWrapper>
                                        </>
                                    }
                                </Row>
                            )
                        })
                    }
                </InquriyResult>
            </InquriyResultWrapper>

            <LoginModal showing={showing} setShowing={setShowing} />
            <Pagination totalCount={totalCount} sizePerPage={sizePerPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </Wrapper>
    );
}

export default Books;