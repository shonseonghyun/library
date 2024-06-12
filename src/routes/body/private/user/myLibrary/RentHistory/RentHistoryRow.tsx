import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { replaceDt } from '../../../../../../api/utils';
import { IRentHistoryBookInfo } from './RentHistoryComponent';

const Td = styled.td`
    font-size: 15px;
    padding: 10px 5px 10px 5px;
`;

interface IRentHistoryRowProps{
    rentHistoryBook:IRentHistoryBookInfo,
}


const RentHistoryRow = ({rentHistoryBook}:IRentHistoryRowProps) => {
    return (
        <React.Fragment>
            <tr>
                <Td>
                    인덱스
                </Td>
                <Td>
                        <Link to={`/book/${rentHistoryBook.bookNo}`} style={{textDecoration:"none",fontSize:"inherit"}}>
                            {rentHistoryBook.bookName}
                        </Link>
                </Td>
                <Td>
                        {replaceDt(rentHistoryBook.rentDt)}
                </Td>
                <Td>
                        {replaceDt(rentHistoryBook.returnDt)}
                </Td>
                <Td>
                    {
                        rentHistoryBook.rentState == "NORMAL_RETURN"
                        ? "정상"
                        : "연체"
                    }
                </Td>
                <Td>
                    {
                        rentHistoryBook.returnDt > rentHistoryBook.haveToReturnDt 
                        ? parseInt(rentHistoryBook.returnDt)-parseInt(rentHistoryBook.haveToReturnDt)
                        : 0
                    }
                </Td>
                <Td>
                    {
                        rentHistoryBook.extensionFlg ? "O" : "X"
                    }
                </Td>
            </tr>  
        </React.Fragment>
    );
};

export default React.memo(RentHistoryRow);