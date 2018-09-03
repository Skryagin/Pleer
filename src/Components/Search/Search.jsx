import React from 'react';
import PropTypes from 'prop-types';
import Chart from '../Chart/Chart';
import './Search.css';

const Search = ({value, onChange, handlerSearch, sidebarToggle}) => {
    return (
        <div className='search'>
            <form action="#" method="post" className="search__form" onSubmit={handlerSearch}>
                <input type="submit" value="search" className="search__btn"/>
                <input type="text" className="search__input" placeholder="Search music" value={value} onChange={onChange} name='searchValue'/>
                <span className='burger' onClick={sidebarToggle}>&#x2630;</span>
            </form>
            <Chart/>
        </div>
    );
};

Search.propTypes = {
    
};

export default Search;

