import { useEffect, useState } from "react";

interface ITimeLeftState {
    timeLeft: number;
    setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
    setIsExpired: React.Dispatch<React.SetStateAction<boolean>>;
  }

function Timer({timeLeft,setTimeLeft,setIsExpired}:ITimeLeftState){

    const formatTime = (time:number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}`;
      };
    

    useEffect(()=>{
        const timer = setInterval(()=>{
            setTimeLeft((prevTime)=>prevTime-1);
        },1000);

        return ()=>{
            clearInterval(timer);
            setTimeLeft(timeLeft); // 시간 원복
    } //해당 effect청소 전 마지막 수행
    },[]);
    
    return (
        <>
            <span>{formatTime(timeLeft)}</span>
        </>
    );
}

export default Timer;