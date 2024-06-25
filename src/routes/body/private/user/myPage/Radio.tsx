import React, { useContext } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { RadioContext } from './RadioContext';

interface IRadioProps{
    children:React.ReactNode;
    value:string,
    defaultChecked?:boolean,
    disabled?:boolean,
    register?: UseFormRegisterReturn,

}
const Radio = ({children,register,value,defaultChecked,disabled}:IRadioProps) => {
    const group = useContext(RadioContext);

    return (
        <label>
            <input 
                type="radio" 
                {...register} 
                value={value} 
                defaultChecked={defaultChecked} 
                disabled={disabled || group.disabled}
                checked={group.value !== undefined ? value=== group.value : undefined}
                onChange={e=>group.onChange && group.onChange(e.currentTarget.value)}
            />            
            {children}
        </label>
    );
};

export default Radio;