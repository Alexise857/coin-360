import React from 'react'

import {Link} from "react-router-dom";
import {NavLink} from 'react-router-dom';

import './header.style.scss'

import {ReactComponent as CrypoLogo} from "../assets/cryptocurrency.svg";

const Header = () => (
    <div className="header">
        <CrypoLogo/>
        <div className="options">
            <NavLink activeClassName="active" exact={true} className="option" to="/">
                Coins
            </NavLink>
            <NavLink className="option" to="/ex">
                Exchanges
            </NavLink>
            <NavLink className="option" to="/wa">
                Watchlist
            </NavLink>
            <NavLink className="option" to="/liqui">
                Liquidity Book
            </NavLink>
            <NavLink className="option" to="/chart">
                Charts
            </NavLink>
        </div>
    </div>
)
export default Header;
