import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CharacterCard from '../../components/CharacterCard';

import api from '../../services/api';

import './styles.scss';

export default function Characters(){
    const [chars, setChars] = useState([]);
    
    useEffect(()=>{
        async function listCharacters(){
            const localChars = localStorage.getItem('chars-page-1');
            try{
                if( localChars ){
                    setChars(JSON.parse(localChars)); 
                } else {
                    const response = await api.get('/v1/public/characters');
                    localStorage.setItem('chars-page-1',JSON.stringify(response.data));
                    setChars(response.data); 
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
                <CharacterCard />
                <CharacterCard />
                <CharacterCard />
                <CharacterCard />
                <CharacterCard />
                <CharacterCard />
                <CharacterCard />
                <CharacterCard />
                <CharacterCard />
                <CharacterCard />
            </div>
            <Footer />
        </main>
    );
}