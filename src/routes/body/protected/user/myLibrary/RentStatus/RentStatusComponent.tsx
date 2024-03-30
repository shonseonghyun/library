import React, {  useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { AuthUserInfoAtom } from "../../../../../../atoms/AuthUserInfo";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
    const [datas,setDatas]= useState<IBookInfo[]>([]);
    const [checkItems,setCheckItems] = useState<number[]>([]);
    const [authUserInfo,setAuthUserInfo] = useRecoilState(AuthUserInfoAtom);
    const navigate = useNavigate();
    const currentLocation = useLocation();
    const resetAuthUserInfo = useResetRecoilState(AuthUserInfoAtom);
    const [updateFlg,setUpdateFlg] = useState(false);
   
    useEffect(()=>{
        console.log("랜더링");
        console.log(updateFlg);
        getRentStatusApi();
    },[updateFlg])
    ;

    //대여 현황 도서목록 가져오기 api
    const getRentStatusApi = async () =>{
        const response = await fetch(
            `http://localhost:8000/user/rentStatus/${authUserInfo.userNo}`,
            {
                method:"GET",
                headers:{
                    Authorization: `Bearer ${authUserInfo.accessToken}`, 
                    "Content-Type": "application/json",
                }
            }
        )
        // .catch(error => {alert("잠시 후 다시 시도해주세요")});
        const datas = await response.json();
        if(datas.code=="T01"){
            resetAuthUserInfo();
            navigate("/login",{state:{redirectedFrom: currentLocation}})
        }
        setDatas(datas.data);
    }


    //전체 선택 핸들러
    const handleAllCheckItems = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const isChecked = e.currentTarget.checked;
        if(isChecked){
            const checkedItemsArray: number[] =[];
            datas.forEach(el=>checkedItemsArray.push(el.bookNo));
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
            setDatas( [...datas].sort(function(a:IBookInfo,b:IBookInfo){
                return Number.parseInt(b.rentDt).valueOf() - Number.parseInt(a.rentDt).valueOf();
            }));  
        }
        else if(selectValue=="returnDt"){
            setDatas( [...datas].sort(function(a:IBookInfo,b:IBookInfo){
                return Number.parseInt(b.haveToReturnDt).valueOf() - Number.parseInt(a.haveToReturnDt).valueOf();
            }));  
        }
    }

    const extendRequestAllHandler = ()=>{ 
        alert("선택 연장 신청 핸들러");
        console.log(checkItems);
    }

    //연장 신청 개별 신청 api 핸들러
    const extendRequestIndividualHandler = async (bookNo:number)=>{
        const response = await fetch(
            `http://localhost:8000/rent/${authUserInfo.userNo}/book/${bookNo}`,
            {
                method:"PUT",
                headers:{
                    Authorization: `Bearer ${authUserInfo.accessToken}`, 
                    "Content-Type": "application/json",
                }
            }
        );

        const data = await response.json();
        if(data.code == "S00"){
            alert("연장 신청 성공하였습니다.");
        }else{
            alert(data.msg);
        }
        setUpdateFlg(true);
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
                                    checked={datas?.length == checkItems.length}
                                />
                            </Th>
                            <Th>번호</Th>
                            <Th>도서정보</Th>
                            <Th>대출일</Th>
                            <Th>반납예정일</Th>
                            <Th>상태</Th>
                            <Th>반납 연장</Th>
                        </tr>  
                    </Thead>
                    <Tbody>
                        {
                            datas?.map(data=>{
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
                                        <button onClick={()=>extendRequestIndividualHandler(data.bookNo)} disabled={ data.extensionFlg }>연장</button>
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