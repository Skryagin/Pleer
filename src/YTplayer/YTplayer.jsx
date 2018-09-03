import React from 'react';
import './YTplayer.css';

const YTplayer = ({runYT, searchYTValue}) => {
    let url = `https://www.youtube.com/embed/${searchYTValue}?autoplay=1`;
   

    return (
        <div className='ytPlayer'>
            <p className='closeYT' onClick={runYT}>&#10006;</p>
            
            <iframe className='iframe' width="600" height="340" src={url} frameborder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            
        </div>
    );
};

export default YTplayer;