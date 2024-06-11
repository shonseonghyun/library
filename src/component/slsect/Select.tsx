import styled from 'styled-components';

const SelectInput = styled.select`
    font-size: 13.55px;
    box-sizing: border-box;
    padding-left: 9px;
    border: none;
    height: 25px;
    margin-right: 3px;
    padding-right: 24px;
`;

interface ISelectProps{
    id:string,
    name:string,
    sizepPerPage?: string,
    optionList:  {[key: string]: string} //object
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}



const Select = ({id,name,optionList,sizepPerPage,onChange}:ISelectProps) => {
    console.log(sizepPerPage);

    return (
        <SelectInput id={id} name={name} onChange={onChange}>
            {
                Object.keys(optionList).map((value,index)=>{
                    return (
                            <option key={index} value={value} 
                                selected={sizepPerPage==undefined ? false : sizepPerPage==value ? true : false}
                            >
                                {optionList[value]}
                            </option>
                        )
                })
            }
        </SelectInput>
    );
};

export default Select;