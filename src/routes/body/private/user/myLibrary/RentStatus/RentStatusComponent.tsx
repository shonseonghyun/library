import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { AuthUserInfoAtom } from "../../../../../../atoms/AuthUserInfo";
import { useExtendBook, useGetRentStatus, useReturnBook } from "../../../../../../hooks/hooks";
import RentRuleExplainComponent from "./RentRuleExplainComponent";



const Table = styled.table`
    border-spacing: 0;
    border-collapse: collapse;
    width:100%;
`;

const Thead = styled.thead`
    vertical-align: middle;
`;

const Th = styled.th`
    padding: 10px 0 11px;
    border-bottom: 1px solid #dedede;
    // text-align: center;
    font-weight: 700;
    color: #666;
    display: table-cell;
`;

const TableContainer = styled.div`
    margin-top: 10px;
`;

const Tbody = styled.tbody`
`;

const ArrangeSelectWrapper = styled.div`
`;

export interface IBookInfo {
    bookNo:number,
    bookName:string,
    rentDt:string,
    haveToReturnDt:string,
    // status:string,
    extensionFlg:boolean
}

function RentStatus(){
    const [rentStatus,setRentStatus]= useState<IBookInfo[]>([]);
    const [checkItems,setCheckItems] = useState<number[]>([]);
    const authUserInfo = useRecoilValue(AuthUserInfoAtom);
   
    const onSuccess =(data:any)=>{
        setRentStatus(data.data);
    }
    const {isLoading} = useGetRentStatus({userNo:authUserInfo.userNo,onSuccess});

    //연장 신청 개별 신청 api 핸들러
    const {mutate:extendBookMutate} = useExtendBook();
    const clickedExtendBook = (bookNo:number)=>{
        extendBookMutate.mutate({userNo:authUserInfo.userNo,bookNo:bookNo})
    }


    //전체 선택 핸들러
    const handleAllCheckItems = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const isChecked = e.currentTarget.checked;
        if(isChecked){
            const checkedItemsArray: number[] =[];
            rentStatus.forEach(el=>checkedItemsArray.push(el.bookNo));
            setCheckItems(checkedItemsArray);
        }else{
            setCheckItems([]);
        }
    }

    //개별 선택 핸들러
    const handleSingleCheckItem= (e:React.ChangeEvent<HTMLInputElement>)=>{
        const isChecked=e.currentTarget.checked;
        const checkedItemNum = Number.parseInt(e.currentTarget.value);

        if(isChecked){
            setCheckItems([checkedItemNum,...checkItems])
        }else{
            setCheckItems(checkItems.filter(bookId=> bookId !== checkedItemNum))
        }
    }

    //정렬 핸들러
    const arrangeHandler = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        const selectValue = e.currentTarget.value;
        if(selectValue=="rentDt"){
            setRentStatus( [...rentStatus].sort(function(a:IBookInfo,b:IBookInfo){
                return Number.parseInt(b.rentDt).valueOf() - Number.parseInt(a.rentDt).valueOf();
            }));  
        }
        else if(selectValue=="returnDt"){
            setRentStatus( [...rentStatus].sort(function(a:IBookInfo,b:IBookInfo){
                return Number.parseInt(b.haveToReturnDt).valueOf() - Number.parseInt(a.haveToReturnDt).valueOf();
            }));  
        }
    }

    const extendRequestAllHandler = ()=>{ 
        alert("선택 연장 신청 핸들러");
        console.log(checkItems);
    }

    const {mutate:returnMutate} = useReturnBook();
    const clickedReturnBook = (bookNo:number)=>{
        returnMutate.mutate({userNo:authUserInfo.userNo,bookNo:bookNo});
    }

    
    return (
        <>
        <h1>
            대출 현황
        </h1>
        <RentRuleExplainComponent />
            <ArrangeSelectWrapper>
                <select name="Arrange" id="Arrange" onChange={arrangeHandler}>
                    <option value="rentDt">대출일</option>
                    <option value="returnDt">반납 예정일</option>
                </select>
            </ArrangeSelectWrapper>

            <div>
                <button name="returnAllBtn" onClick={extendRequestAllHandler}>선택반납연기</button>
            </div>

           <TableContainer>
                <Table>
                    <Thead>
                        <tr>
                            <Th>
                                <input 
                                    type="checkbox" 
                                    name="select-all"
                                    onChange={handleAllCheckItems}
                                    checked={rentStatus?.length == checkItems.length}
                                />
                            </Th>
                            <Th>번호</Th>
                            <Th>도서정보</Th>
                            <Th>대출일</Th>
                            <Th>반납예정일</Th>
                            <Th>상태</Th>
                            <Th>반납</Th>
                            <Th>반납 연장</Th>
                        </tr>  
                    </Thead>
                    <Tbody>
                        {
                            rentStatus?.map(data=>{
                                return (
                                <tr key={data.bookNo}>
                                    <td>
                                        <input 
                                            value={data.bookNo}
                                            type="checkbox"
                                            checked={checkItems.includes(data.bookNo)}
                                            onChange={handleSingleCheckItem}
                                        />
                                    </td>
                                    <td>
                                        {data.bookNo}
                                    </td>
                                    <td>
                                        <Link to={`/book/${data.bookNo}`} style={{textDecoration:"none"}}>
                                            {data.bookName}
                                        </Link>
                                    </td>
                                    <td>
                                        {data.rentDt}
                                    </td>
                                    <td>
                                        {data.haveToReturnDt}
                                    </td>
                                    <td>
                                        "개발안함"
                                    </td>
                                    <td>
                                        <button onClick={()=>clickedReturnBook(data.bookNo)}>반납</button>
                                    </td>
                                    <td>
                                        <button onClick={()=>clickedExtendBook(data.bookNo)} disabled={ data.extensionFlg }>연장</button>
                                    </td>
                                </tr>)
                            })
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}


export default RentStatus;