import React from 'react';
import Card from '../Card/Card';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import './ArtistPage.css';

const ArtistPage = ({artistsData, addFavourite, runYT, checkArr}) => {
    return (
        <FlipMove>
        <div className='content'>
        {artistsData.map((el, index) => <Card url={el.image[2]['#text']} name={el.name} listeners={`Listeners: ${(+el.listeners).toLocaleString()}`} key={el.name} addFavourite={addFavourite} index={index} type='favoriteArtists' interesting='interestingArtists' checkArr={checkArr} runYT={runYT}/>)}    
        </div>
        </FlipMove>
    );
};

ArtistPage.propTypes = {
    
};

export default ArtistPage;
