import React  from 'react';
import { useDispatch } from 'react-redux'
import logo from '../assets/images/logo.svg';
import { NavLink } from 'react-router-dom';
import { logout } from '../features/login/loginSlice'
function Header() {
    const dispatch = useDispatch()
    return (
        <header className="fixed-top navbar-light header">
            <nav className="navbar" id="logo">
                <a className="navbar-brand">
                    <img src={logo} className="app-logo" alt="Logotipo" />
                    <span id="brand">
                <strong>Test</strong>React
            </span>
                </a>
            </nav>

            <nav className="menu">
                <ul>
                    <li>
                        <NavLink to={'/login'} onClick={() => dispatch(logout())}>
                            <svg className="align-content-lg-end" width="40" height="40" viewBox="0 0 24 24"
                                 strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                 strokeLinejoin="round" >
                                <path stroke="none" d="M0 0h24v24H0z"/>
                                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"/>
                                <path d="M7 12h14l-3 -3m0 6l3 -3"/>
                            </svg>
                        </NavLink>
                    </li>
                </ul>
            </nav>
         </header>
    );
}
export default Header;