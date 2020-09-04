/* eslint-disable react/prop-types */
import React from 'react';
import {Modal, Backdrop, Fade} from '@material-ui/core';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.scss';


export default function CharacterModal({description = '',name,thumbnail, open, handleClose, urls}){

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="modal"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}>
            <Fade in={open}>
                <div className="paper">
                    <div className="modal-header">
                        <FiArrowLeft className="back-icon" size={24} onClick={handleClose}/>
                        <div>
                            <h2 id="transition-modal-title">{name}</h2>
                        </div>
                    </div>
                    <div className="modal-wrapper">
                        <div className="modal-about">
                            <img src={thumbnail} alt=""/>
                            <p>
                                {description?description:'None description about'}
                               
                            </p>
                            
                        </div>
                        <div className="modal-links">
                            {urls.map((url,index)=>(<a key={index} href={url.url}>{url.type}</a>))}
                        </div>
                    </div>
                </div>
            </Fade>
        </Modal>
    );
}