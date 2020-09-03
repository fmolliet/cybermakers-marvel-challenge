import React from 'react';

import './styles.scss';

import logo from '../../assets/MarvelLogo.png';

export default function Header(){
    return(
        <main className="header">
            <img src={logo} alt="Marvel Logo" />
        </main> 
    );
}