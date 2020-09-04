import React, { useState, useEffect } from 'react';
import { CircularProgress, Backdrop } from '@material-ui/core';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CharacterCard from '../../components/CharacterCard';
import NavMenu from '../../components/NavMenu';
import CharacterModal from '../../components/CharacterModal';

import api from '../../services/api';

import './styles.scss';

export default function Characters(){
    const [open, setOpen] = useState(true);
    const [page, setPage] = useState(0);
    const [chars, setChars] = useState([]);
    const [characterData, setCharacterData] = useState([]);
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
    
    
    
    async function getCharacterData( id ){
        const localCharacterCache = localStorage.getItem('chars-'+id);
        try{
            if( localCharacterCache )
                setCharacterData(JSON.parse(localCharacterCache)); 
            else {
                const response = await api.get(`/v1/public/characters/${id}`);
                localStorage.setItem('chars-'+id,JSON.stringify(response.data.data.results));
                setCharacterData(response.data.data.results); 
                
            }
        } catch(err){
            alert('Erro ao buscar o personagem no backend');
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
    
    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    const openCharacterModal = async ( id ) => {
        setOpenBackdrop(true);
        await getCharacterData(id);
        setOpen(true);
    };
    
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
                        description={character.description}
                        openCharacterModal={openCharacterModal} />
                ))}
            </div>
            
            {characterData.map( character => ( 
                <CharacterModal
                    key={character.id}
                    name={character.name} 
                    description={character.description}
                    thumbnail={character.thumbnail.path+'.'+character.thumbnail.extension}
                    open={open}
                    handleOpen={handleOpen} 
                    handleClose={handleClose}
                    urls={character.urls.map((url)=> url)}
                />
            ))}
            
            <Footer />
            <Backdrop className='loading' open={openBackdrop}>
                <CircularProgress color="white" />
            </Backdrop>
        </main>
    );
}