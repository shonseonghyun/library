import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { AuthUserInfoAtom, isLoginSelector } from '../../../../../atoms/AuthUserInfo';
import ImgTypeContent from '../../../../../component/Book/ImgTypeContent';
import GridTypeContent from '../../../../../component/Book/ListTypeContent';
import Loading from '../../../../../component/loading/Loading';
import LoginModal from '../../../../../component/login/LoginModal';
import Pagination from '../../../../../component/page/Pagination';
import Select from '../../../../../component/slsect/Select';
import { useInquiryBooks, useRegHeartBook, useRentBook } from '../../../../../hooks/hooks';
import { IBookInfo } from './Books';

// const LIST_TYPE_SIZE_OPTIONS = ['1', '2', '3', '5'];
// const IMG_TYPE_SIZE_OPTIONS = ['2', '3', '4', '5'];
// const ORDER_OPTIONS = ['recent', 'author', 'pubDt'];

const LIST_TYPE_SIZE_OPTIONS = {
    1:"1건",
    2:"2건",
    3:"3건",
    5:"5건"
}

const IMG_TYPE_SIZE_OPTIONS = {
    2:"2건",
    3:"3건",
    4:"4건",
    5:"5건"
}

const ORDER_OPTIONS = {
    recent:"최신순",
    author:"저자",
    pubDt:"발행년도",
}


enum GridType  {
    ListType="listType",
    ImgType = "imgType"
}

enum OrderCategory  {
    Author="author",
    PubDt = "pubDt",
    Recent="recent"
}

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


const GridTypeWrapper = styled.div`

`;

const GridTypeImg = styled.img`
    width: 23px;
    height: 23px;
    margin-right: 2px;
    cursor: pointer;
`;

const InquriyResult =styled.div<{$gridType:GridType,$isLoading:boolean}>`
    display: grid;
    gap : ${props=> (props.$gridType === GridType.ImgType) ? "40px" : "0px"} ;
    grid-template-columns: repeat(${props=>props.$gridType === GridType.ListType || props.$isLoading ? 1 : 5},1fr);
`;

const SelectGroup = styled.div`
    
`;

const Row = styled.div<{$gridType:GridType}>`
    position: relative;
    margin-top: 20px;
    padding-bottom: 10px;
    border-bottom: ${props=>props.$gridType===GridType.ImgType ? "none" : "2px solid #d2d2d2"};
`;

type InquriyBooksParams={
    category: string,
    inquiryWord:string
}

export interface IHeartBookProps{
    bookNo:number,
    userNo:number
}

const BookResults = () => {
    const [books,setBooks] = useState<IBookInfo[]>([]);
    const [showing,setShowing] = useState(false); 
    const isLogin = useRecoilValue(isLoginSelector);
    const authUserInfo = useRecoilValue(AuthUserInfoAtom);
    const [gridType,setGridType] = useState<GridType>(GridType.ListType);
    const {category,inquiryWord} = useParams() as InquriyBooksParams ;
    const [totalCount,setTotalCount] = useState(-1);
    const [currentPage,setCurrentPage] = useState(1);
    const [sizePerPage,setSizePerPage] = useState(1);

    
    const onSuccess = (data:any)=>{
        setBooks(data.data.bookList);
        setTotalCount(data.data.totalCount);
    }
    const {isLoading} = useInquiryBooks({category,inquiryWord,currentPage,sizePerPage,totalCount,onSuccess});
    const {mutate:regHeartMutate} = useRegHeartBook();
    const {mutate:rentBookMutate} = useRentBook();


    const changeNum = useCallback((e:React.ChangeEvent<HTMLSelectElement>)=>{
        setSizePerPage(parseInt(e.currentTarget.value));
        setCurrentPage(1);
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
        
        if(orderVal ===OrderCategory.Recent){
            setBooks(
                [...books].sort(function(a,b){
                    return b.bookNo-a.bookNo
                })
            )
        }
        else if(orderVal===OrderCategory.Author){
            setBooks(
                [...books].sort(function(a,b){
                    return b.bookAuthor < a.bookAuthor ? -1 : b.bookAuthor > a.bookAuthor ? 1 : 0;
                })
            )
        }else if(orderVal===OrderCategory.PubDt){
            setBooks(
                [...books].sort(function(a,b){
                    return parseInt(b.pubDt)-parseInt(a.pubDt)
                })
        )
        }
    },[books]);

    const clickedListType = ()=>{
        setGridType(GridType.ListType);
        setSizePerPage(1);
        setCurrentPage(1);
    }

    const clickedImgType = ()=>{
        setGridType(GridType.ImgType);
        setSizePerPage(2);
        setCurrentPage(1);
    }

    const clickedRent = useCallback((e:React.MouseEvent<HTMLButtonElement>)=>{
        if(isLogin){
            const bookNo = parseInt(e.currentTarget.value);
            rentBookMutate.mutate({bookNo:bookNo,userNo:authUserInfo.userNo});
        }else{
            setShowing(true);
        }
    },[isLogin]);

    return (
        <>
        <InquriyResultWrapper>
                <InquriyCategory>
                   <InquriyCountWrapper>
                    검색결과 총  
                        <HighLightWord style={{color:"red",display:"inline-block",fontSize:"15px"}}>
                            &nbsp; 
                            {totalCount==-1 ? 0 : totalCount}
                            &nbsp; 
                        </HighLightWord> 
                        건
                    </InquriyCountWrapper>
                    <InquriyWordWrapper>
                        검색어 
                        <HighLightWord>
                            &nbsp; 
                            [키워드 : {inquiryWord}]
                            &nbsp;
                        </HighLightWord> 
                    </InquriyWordWrapper>
                </InquriyCategory>

                <InquriyOptionsWrapper>
                    <SelectGroup>
                        <Select id='orderCategory' name='orderCategory' onChange={changeOrder} optionList={ORDER_OPTIONS} />
                        <Select id='num' name='num' onChange={changeNum} sizepPerPage={sizePerPage+""} optionList={gridType === GridType.ListType ? LIST_TYPE_SIZE_OPTIONS : IMG_TYPE_SIZE_OPTIONS} />
                    </SelectGroup>

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

                <InquriyResult $gridType={gridType} $isLoading={isLoading}>
                    {
                        isLoading ? 
                            <Loading /> 
                        :
                        books?.map((book,index: any) =>{
                            return (
                                <Row key={book.bookNo} $gridType={gridType}>
                                    {
                                        gridType === GridType.ListType
                                        ?
                                        <GridTypeContent index={index} book={book} regHeart={clickedHeart} rentBook={clickedRent} />
                                        :
                                        <ImgTypeContent book={book}  regHeart={clickedHeart} />
                                    }
                                </Row>
                            )
                        })
                    }
                </InquriyResult>
            </InquriyResultWrapper>

            <LoginModal showing={showing} setShowing={setShowing} />
            <Pagination totalCount={totalCount} sizePerPage={sizePerPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>

            </>
    );
};

export default BookResults;