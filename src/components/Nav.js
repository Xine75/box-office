import React, { memo } from 'react'
import{useLocation} from 'react-router-dom';
import { NavList, LinkStyled } from './Nav.styled';

//define an array of links to map over
const LINKS = [
    { to: "/", text: "Home" },
    { to: "/starred", text: "Starred"},
]

const Nav = () => {

    //useLocation, similar to useParams, allows access to the pathname and other factors of page location
    const location = useLocation();
//the "active" className below affects the stylin on LinkStyled (imported from Nav.styled)
    return (
        <div>
            <NavList>
                {
                LINKS.map(item => <li key={item.to}>
                         <LinkStyled to={item.to} className={item.to === location.pathname ? "active" : ""}>{item.text}</LinkStyled></li>)
                }
            </NavList>
            
        </div>
    )
}

export default memo(Nav)