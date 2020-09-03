import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import dotenv from 'dotenv';


import api from '../../services/api';

import './styles.scss';

export default function Characters(){
    dotenv.config();
    useEffect(()=>{
        async function listSkus(){
            try{
                const response = await api.get('/v1/public/characters');
                    
            } catch(err){
                alert('Erro ao conectar no Backend / ou Sessão expirada');
                
            } 
        }
        listSkus();
    },[]);
    
    return(
        <div>personagens</div>
    );
}