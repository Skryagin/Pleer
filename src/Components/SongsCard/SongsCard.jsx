import React from 'react';
import PropTypes from 'prop-types';
import songImg from './react.png';
import './SongsCard.css';
import youtube from '../Card/youtube.svg';
import add from '../Card/add.svg';
import favorite from '../Card/favorite.svg';

const SongsCard = ({url, name, artist, addFavourite, index, type, checkArr, interesting, runYT}) => {
    return (
        <div className="songs-item">
        <figure className="songs-item__figure">
            <img className="songs-item__img" src={url !== '' ? url : songImg} alt="image"/>
            <figcaption className="songs-item__discription" >
                <p className="songs-item__music-name">{name}</p>
                <p className="songs-item__singer">{typeof artist === 'object' ? artist.name : artist}</p>
                <div className="svg-song-container">
                    <img src={youtube} alt="youtube" className='card__svg' onClick={runYT} data-index={index} data-check={checkArr}/>
                    <img src={favorite} alt="favorite" className='card__svg' onClick={addFavourite} data-index={index} data-arr-for-add={type} data-check={checkArr}/>
                    <img src={add} alt="add" className='card__svg' onClick={addFavourite} data-index={index} data-arr-for-add={interesting} data-check={checkArr}/>
                </div>
            </figcaption>

        </figure>
        </div>
    );
};

SongsCard.propTypes = {
    
};

export default SongsCard;
