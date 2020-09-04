import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CharacterCard from '../../components/CharacterCard';

import api from '../../services/api';

import './styles.scss';

export default function Characters(){
    const [page, setPage] = useState(0);
    const [chars, setChars] = useState([]);
    
    useEffect(()=>{
        async function listCharacters(){
            const localChars = localStorage.getItem('chars-page-'+page);
            try{
                if( localChars ){
                    setChars(JSON.parse(localChars)); 
                } else {
                    const response = await api.get('/v1/public/characters', {
                        params: {
                            offset: page
                        }
                    });
                    localStorage.setItem('chars-page-'+page,JSON.stringify(response.data.data.results));
                    setChars(response.data.data.results); 
                }
            } catch(err){
                alert('Erro ao conectar no Backend ou chaves de autentificação inválida');
            } 
        }
        listCharacters();
    },[]);
    
    return(
        <main className="characters">
            <Header />
            <div className="contents">
                {chars.map( character => ( 
                    <CharacterCard 
                        key={character.id} 
                        thumbnail={character.thumbnail.path+'.'+character.thumbnail.extension}
                        name={character.name}
                        id={character.id}
                        description={character.description}/>
                ))}
            </div>
            <Footer />
        </main>
    );
}