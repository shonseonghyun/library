import { Link } from "react-router-dom";
import styled from "styled-components";

const ItemLink = styled(Link)<{$fontSize:string}>`
    font-size: ${props=>props.$fontSize};
`;

interface IPrivateLinkProps{
    to:string,
    children:React.ReactNode,
    fontSize:string
}

const PrivateLink = ({to,children,fontSize}:IPrivateLinkProps) => {
    return (
        <ItemLink to={to} state={{isEnteredInPrivateRoute:true}} $fontSize={fontSize}>{children}</ItemLink>
    );
};

export default PrivateLink;