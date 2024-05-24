import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getReviewsOfBookFetch } from "../../../../../../../api/api";
import BookRegReview from "./BookRegReview";

export interface IBookReview{
    bookNo:string
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
const HideWrapper = styled.div<{showing:boolean}>`
    width: 100%;
    display: ${props=>props.showing ? "block" : "none"};
    p{
        font-size: 15px;
    }
`;

const Tbody = styled.tbody`
`;


function BookReview({bookNo}:IBookReview){
    const [showing,setShowing]  = useState(false);
    const [reviews,setReveiws] = useState<IReviewInfo[]>([]);
    const {data} = useQuery(
        ['getReviewsOfBookFetch',bookNo],
        ()=>getReviewsOfBookFetch(bookNo),
        {
            onSuccess(data) {
                setReveiws(data.data);
            },
        }
    )
    ;

    const clickedBtn = ()=>{
        setShowing(!showing);
    }

    return (
        <Wrapper>
            <div style={{borderBottom:"1px solid black",display:"flex",justifyContent:"space-between"}}>
                <div style={{fontSize:"20px"}}>
                    리뷰
                </div>
                <div>
                    <button onClick={clickedBtn}>
                        {
                            showing ? "접기" : "열기"
                        }
                    </button>
                </div>
            </div>
            <HideWrapper showing={showing}>
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
            {/* <BookRegReview bookNo={bookNo} /> */}
        </Wrapper>
        

    )
   

}

export default BookReview;