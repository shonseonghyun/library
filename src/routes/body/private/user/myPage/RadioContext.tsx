import { createContext } from "react";

interface Props{
    [key:string]: any
}

export const RadioContext = createContext<Props>({});