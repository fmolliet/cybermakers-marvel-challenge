import React, { useState, useEffect } from 'react';
import { CircularProgress, Backdrop } from '@material-ui/core';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CharacterCard from '../../components/CharacterCard';
import NavMenu from '../../components/NavMenu';

import api from '../../services/api';

import './styles.scss';

export default function Characters(){
    const [page, setPage] = useState(0);
    const [chars, setChars] = useState([]);
    const [openBackdrop, setOpenBackdrop] = useState(true);
    
    useEffect(()=>{
        listCharacters();
    },[]);
    
    useEffect(()=>{
        listCharacters();
    },[page]);
    
    
    async function listCharacters(){
        setOpenBackdrop(true);
        const localChars = localStorage.getItem('chars-page-'+page);
        try{
            if( localChars )
                setChars(JSON.parse(localChars)); 
            else {
                const response = await api.get('/v1/public/characters', {
                    params: {
                        offset: 20*page
                    }
                });
                localStorage.setItem('chars-page-'+page,JSON.stringify(response.data.data.results));
                setChars(response.data.data.results); 
                
            }
        } catch(err){
            alert('Erro ao conectar no Backend ou chaves de autentificação inválida');
        } 
        setOpenBackdrop(false);
    }
    
    function prevPage(){
        const newPage = page-1 < 0 ? 0 : page-1;
        setPage(newPage);
    }
    
    function nextPage(){
        const newPage = page+1;
        setPage(newPage);
    }
    
    
    
    return(
        <main className="characters">
            <Header />
            <NavMenu prevAction={prevPage} nextAction={nextPage} />
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
            <NavMenu prevAction={prevPage} nextAction={nextPage} />
            <Footer />
            <Backdrop className='loading' open={openBackdrop}>
                <CircularProgress color="white" />
            </Backdrop>
        </main>
    );
}