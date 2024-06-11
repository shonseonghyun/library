import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getFilePath } from '../../api/utils';
import { IHeartInfo } from '../../routes/body/private/user/myLibrary/heart/MyBookCase';
import { IBookInfo } from '../../routes/body/public/book/simple/Books';

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
    margin-right: 5px;
    height: 40px;
    padding: 0px 10px;
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
    book?:IBookInfo,
    heart?:IHeartInfo
    regHeart ?:(e: React.MouseEvent<HTMLButtonElement>) => void,
    delHeart ?:(e: React.MouseEvent<HTMLButtonElement>) => void,
}

const ImgTypeContent = ({book,heart,delHeart,regHeart}:IImgTypeContentProps) => {
    const navigate = useNavigate();

    return (
        <ImgWrapper>
        {
            book && 
            <>
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
            </>
        }

        {
            heart && 
            <>
                <Img src={`${process.env.PUBLIC_URL}/`+ getFilePath(heart.bookImage.filePath ,heart.bookImage.newFileName)} />

                <OverlayContent onClick={()=>navigate(`/book/${heart.bookCode}`)}>
                    <Text>
                        {heart.bookName}
                    </Text>
                    <Text>
                        {heart.bookAuthor}
                    </Text>
                </OverlayContent>
                <BtnWrapper>
                    <Button value={heart.heartNo} onClick={delHeart}>찜 해제</Button>
                </BtnWrapper>
            </>
        }
    </ImgWrapper>
    );
};

export default ImgTypeContent;