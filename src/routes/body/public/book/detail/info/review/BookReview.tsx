import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getReviewsOfBookFetch } from "../../../../../../../api/api";
import BookRegReview from "./BookRegReview";

export interface IBookReview{
    bookNo:number
}

const Wrapper = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    font-size: 15px;    
`;

interface IReviewInfo{
    reviewNo:number,
    userNo:number ,
    userId:string,
    reviewContent:string,
    regDt:string,
    regTm:string,
    modifiedDt:string,
    modifiedTm:string
}

const Table =styled.table`
  width  : 100% ;
`;

const Th = styled.th`
  font-size  : 20px ;
`;

const Tr = styled.tr`
    text-align: center;
`;

const Td = styled.td`
    text-align: center;
`;
const HideWrapper = styled.div<{$showing:boolean}>`
    width: 100%;
    display: ${props=>props.$showing ? "block" : "none"};
    p{
        font-size: 15px;
    }
`;

const Tbody = styled.tbody`
`;
    
const Button =styled.button`
  background-color  : transparent;
  color:${props=>props.theme.textColor};
`;

function BookReview({bookNo}:IBookReview){
    console.log("BookReview 랜더링");
    const [clickedReview ,setClickedReview] = useState(false);
    const [showing,setShowing]  = useState(false);
    const [reviews,setReveiws] = useState<IReviewInfo[]>([]);
    const Reviews = useQuery(
        ['getReviewsOfBookFetch',bookNo],
        ()=>getReviewsOfBookFetch(bookNo),
        {
            onSuccess(data) {
                setReveiws(data.data);
            },
            enabled:clickedReview
            // ,refetchOnWindowFocus: false
        }
    )
    ;

    const clickedBtn = ()=>{
        setShowing(!showing);
        setClickedReview(true);
        if(!clickedReview){
            Reviews.refetch();
        }
    }

    return (
        <Wrapper>
            <div style={{borderBottom:"1px solid black",display:"flex",justifyContent:"space-between"}}>
                <div style={{fontSize:"20px"}}>
                    리뷰
                </div>
                <div>
                    <Button onClick={clickedBtn}>
                        {
                            showing ? "접기" : "열기"
                        }
                    </Button>
                </div>
            </div>
            <HideWrapper $showing={showing}>
                <Table >
                    <thead>
                        <Tr>
                            <Th>번호</Th>
                            <Th>작성자</Th>
                            <Th>내용</Th>
                            <Th>작성일자</Th>
                        </Tr>
                    </thead>
                    <Tbody>
                        {
                            reviews.map((review,index)=>{
                                return (
                                    <tr key={review.reviewNo}>
                                        <Td>{index+1}</Td>
                                        <Td>{review.userId}</Td>
                                        <Td>{review.reviewContent}</Td>
                                        <Td>{review.regDt}</Td>
                                    </tr>
                                )
                            })
                        }
                    </Tbody>
                </Table>
            </HideWrapper>
        </Wrapper>
        

    )
   

}

export default BookReview;