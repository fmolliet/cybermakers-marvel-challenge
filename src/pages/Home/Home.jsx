import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.scss';

import logo from '../../assets/MarvelLogo.png';

export default function Home(){
    return(
        <div className="container">
            
            <section>
                <img src={logo} alt="Logo"/>
                <h1>Characters</h1>
                <Link className="back-link" to="/characters">
                    <button className="button" type="submit">Entrar</button>
                </Link>
            </section>
            
        </div>
    );
}