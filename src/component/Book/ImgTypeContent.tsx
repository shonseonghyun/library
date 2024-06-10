import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getFilePath } from '../../api/utils';
import { IBookProps } from '../../routes/body/public/book/simple/Books';

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

const Text = styled.div`
    margin-top: 30px;
    color: white;
    text-align: center;
    font-size: 20px;
`;

interface IImgTypeContentProps{
    book:IBookProps,
    regHeart ?:(e: React.MouseEvent<HTMLButtonElement>) => void,
}

const ImgTypeContent = ({book,regHeart}:IImgTypeContentProps) => {
    const navigate = useNavigate();

    return (
        <ImgWrapper>
            <Img src={`${process.env.PUBLIC_URL}/`+ getFilePath(book.bookImage.filePath ,book.bookImage.newFileName)} />

            <OverlayContent onClick={()=>navigate(`/book/${book.bookNo}`)}>
                <Text>
                    {book.bookName}
                </Text>
                <Text>
                    {book.bookAuthor}
                </Text>
            </OverlayContent>
            <BtnWrapper>
                <Button value={book.bookNo} onClick={regHeart}>찜하기</Button>
            </BtnWrapper>
        </ImgWrapper>
    );
};

export default ImgTypeContent;