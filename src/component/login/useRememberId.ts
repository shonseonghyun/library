
import { useCallback, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { LoginFormValue } from "./LoginModal";
import { UseFormGetValues } from "react-hook-form";


function useRememberId(initValue:boolean,getValues:UseFormGetValues<LoginFormValue>):[boolean,()=>void,React.RefObject<HTMLInputElement>,()=>void,string] {
  const [isRememberId, setIsRememberId] = useState<boolean>(initValue);
  const [cookies,setCookie,removeCookie] = useCookies(["rememberId"]);
  const checkboxRef= useRef<HTMLInputElement>(null);

  useEffect(()=>{
    setIsRememberId(cookies.rememberId);
  },[]);

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