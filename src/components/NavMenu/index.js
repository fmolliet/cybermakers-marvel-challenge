import React from 'react';

import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import './styles.scss';

// eslint-disable-next-line react/prop-types
export default function NavMenu({ prevAction, nextAction }){
    return(
        <div className="nav-menu">
            <button onClick={prevAction}>
                <FiArrowLeft />
            </button>
            <button onClick={nextAction}>
                <FiArrowRight />
            </button>
        </div> 
    );
}