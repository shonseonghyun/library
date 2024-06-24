
import { useCallback, useMemo, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { UseFormGetValues } from "react-hook-form";
import { LoginFormValue } from "./LoginModal";


function useRememberId(initValue:boolean,getValues:UseFormGetValues<LoginFormValue>):[boolean,()=>void,React.RefObject<HTMLInputElement>,()=>void,string] {
  console.log("useRememberId 랜더링");
  const [isRememberId, setIsRememberId] = useState<boolean>(initValue);
  const [cookies,setCookie,removeCookie] = useCookies(["rememberId"]);
  const checkboxRef= useRef<HTMLInputElement>(null);

  /* 리랜더링 최소화 */
  //방법 1. 마운트 시 useEffect 사용
  // useEffect(()=>{
    //     console.log("마운트  ");
    //     if(cookies.rememberId != undefined){
    //         setIsRememberId(true);
    //     };
    // },[]);

    // 방법2. useMemo 사용
    useMemo(()=>{
      if(cookies.rememberId != undefined){
        setIsRememberId(true);
      };
    },[])

  const onToggle = useCallback(()=>{
    setIsRememberId((prev)=>!prev);
  },[]);
  
  const doRememberId= ()=>{
    if(checkboxRef.current){
      if(checkboxRef.current.checked){
          setCookie("rememberId",getValues("userId"),{
              path:"/"
          })
      }
      else{
          removeCookie("rememberId",{
              path:"/"
          })
      }
  }
  }

  return [isRememberId,onToggle,checkboxRef,doRememberId,cookies.rememberId];
}

export default useRememberId;