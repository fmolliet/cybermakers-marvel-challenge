import React from 'react';

import './styles.scss';

export default function CharacterCard(){
    return(
        <div className="char-card">
            <a href="#">
                <img src="http://via.placeholder.com/163" alt="Character Img"/>
                <div className="char-info">
                    <div className="char-name">NOME</div>
                    <div className="char-second-name">Nome Secundário</div>
                </div>
            </a>
        </div> 
    );
}