import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { replaceDt } from '../../../../../../api/utils';
import { IRentStatusBookInfo } from './RentStatus';

const Td = styled.td`
    font-size: 15px;
    padding: 10px 5px 10px 5px;
`;

const Button = styled.button<{$extensionFlg?:boolean}>`
    background-color: ${props=> props.$extensionFlg ? props.theme.disableBtnColor : props.theme.btnColor};
    cursor: ${props=>props.$extensionFlg ? "not-allowed" : "pointer"};
`;

interface IRentStatusRowProps{
    rentStatusBook:IRentStatusBookInfo,
    returnBook: (e: React.MouseEvent<HTMLButtonElement>) => void,
    extendBook: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const RentStatusRow = ({rentStatusBook,returnBook,extendBook}:IRentStatusRowProps) => {
    return (
        <React.Fragment>
            <tr key={rentStatusBook.bookNo}>
                <Td>
                    <input 
                        value={rentStatusBook.bookNo}
                        type="checkbox"
                        // checked={checkItems.includes(rentStatusBook.bookNo)}
                        // onChange={handleSingleCheckItem}
                    />
                </Td>
                {/* <Td>
                    index
                </Td> */}
                <Td>
                    <Link to={`/book/${rentStatusBook.bookNo}`} style={{textDecoration:"none",fontSize:"inherit"}}>
                        {rentStatusBook.bookName}
                    </Link>
                </Td>
                <Td>
                    {replaceDt(rentStatusBook.rentDt)}
                </Td>
                <Td>
                    {replaceDt(rentStatusBook.haveToReturnDt)}
                </Td>
                <Td>
                    {
                        rentStatusBook.rentDt>rentStatusBook.haveToReturnDt 
                        ? "연체"
                        : "대여"
                    }
                </Td>
                <Td>
                    <Button value={rentStatusBook.bookNo} onClick={returnBook}>반납</Button>
                </Td>
                <Td>
                    <Button $extensionFlg={rentStatusBook.extensionFlg} value={rentStatusBook.bookNo} onClick={extendBook} disabled={ rentStatusBook.extensionFlg }>연장</Button>
                </Td>
            </tr>
        </React.Fragment>
    );
};

export default React.memo(RentStatusRow);