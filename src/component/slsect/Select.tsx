import styled from 'styled-components';

const SelectInput = styled.select`
    font-size: 13.55px;
    box-sizing: border-box;
    padding-left: 9px;
    color: #5a5a5a;
    background-color: #e8e8e8;
    border: none;
    height: 25px;
    margin-right: 3px;
    padding-right: 24px;
`;

interface ISelectProps{
    id:string,
    name:string,
    optionList:  {[key: string]: string} //object
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}



const Select = ({id,name,optionList,onChange}:ISelectProps) => {
    return (
        <SelectInput id={id} name={name} onChange={onChange}>
            {
                Object.keys(optionList).map((value,index)=>{
                    return (
                            <option key={index} value={value}>
                                {optionList[value]}
                            </option>
                        )
                })
            }
        </SelectInput>
    );
};

export default Select;