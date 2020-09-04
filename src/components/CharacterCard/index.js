import React from 'react';

import './styles.scss';

// eslint-disable-next-line react/prop-types
export default function CharacterCard({ id, thumbnail, name, description='', openCharacterModal  }){
    return(
        <div className="char-card">
            <a onClick={()=>{openCharacterModal(id);}}>
                <img src={thumbnail} alt="Character Img"/>
                <div className="char-info">
                    <div className="char-name">{name}</div>
                    <div className="char-second-name">{description.substr(0,20)}</div>
                </div>
            </a>
        </div> 
    );
}