import React from 'react';
import { RadioContext } from './RadioContext';

interface IRadioGroupProps{
    children: React.ReactNode,
    [key: string]: any
}

const RadioGroup = ({children,...rest}:IRadioGroupProps) => {
    return (
        <RadioContext.Provider value={rest}>
            {children}
        </RadioContext.Provider>
    );
};

export default RadioGroup;