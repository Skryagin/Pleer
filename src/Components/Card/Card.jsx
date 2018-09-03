import React from 'react';
import PropTypes from 'prop-types';
import cardImg from './card.png';
import './Card.css';
import youtube from './youtube.svg';
import add from './add.svg';
import favorite from './favorite.svg';

const Card = ({name, listeners, url, addFavourite, index, type, checkArr, interesting, runYT}) => {
    return (
    <div className="artist-card">
        <figure>
                <div className="img-container">
                    <img src={url !== '' ? url : cardImg} alt="artist" className="artist-card__img"/>
                    <div className="card__overlay">
                        <div className="svg-container">
                            <img src={favorite} alt="favorite" className='card__svg' onClick={addFavourite} data-index={index} data-arr-for-add={type} data-check={checkArr}/>
                            <img src={youtube} alt="youtube" className='card__svg' onClick={runYT} data-index={index} data-check={checkArr}/>
                            <img src={add} alt="add" className='card__svg' onClick={addFavourite} data-index={index} data-arr-for-add={interesting} data-check={checkArr}/>
                        </div>
                    </div>
                </div>
            <figcaption>
                <p className="artist-card__name">{name}</p>
                <p className="artist-card__number-albums">{typeof listeners === 'object' ? listeners.name : listeners}</p>
            </figcaption>
        </figure>
    </div>
    );
};



Card.propTypes = {
    
};

export default Card;