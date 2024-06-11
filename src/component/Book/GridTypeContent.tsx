import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getFilePath } from '../../api/utils';
import { IBookInfo } from '../../routes/body/public/book/simple/Books';


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

const TextForHidden = styled.div`
    font-size: 15px;
    cursor: pointer;
    font-weight: 700;
`;

interface IGridTypeContentProps{
    index:number,
    book:IBookInfo,
    regHeart ?:(e: React.MouseEvent<HTMLButtonElement>) => void,
    rentBook ?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const GridTypeContent = ({index,book,regHeart,rentBook}:IGridTypeContentProps) => {
    return (
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
                    <Link style={{ fontSize:"20px"}} to={`/book/${book.bookNo}`}> 
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
                        onClick={rentBook}
                        value={book.bookNo}
                        style={{ 
                            backgroundColor: book.bookState==="RENT_UNAVAILABLE" ? "#a99e9e9c" : "rgba(52, 152, 219,1.0)",
                            cursor: book.bookState==="RENT_UNAVAILABLE" ? "not-allowed" : "pointer"}} 
                            disabled={book.bookState==="RENT_UNAVAILABLE"? true : false
                            }
                        
                    >
                        대출하기
                    </Button>
                    <Button value={book.bookNo}>예약하기</Button>
                    <Button value={book.bookNo} 
                    onClick={regHeart}
                    >
                        찜하기</Button>
                </ButtonWrapper>
                <HiddenContentWrapper>
                    <TextForHidden>
                        도서정보
                    </TextForHidden>
                </HiddenContentWrapper>
            </BookContentsWrapper>
        </>
    );
};

export default GridTypeContent;