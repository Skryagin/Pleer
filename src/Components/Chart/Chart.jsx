import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom'
import './Chart.css';

const Chart = props => {
    return (
        <div className='chart'>
            <ul className="chart-list">
                <li>
                <NavLink exact to='/'
                activeClassName="selected"
                className="chart-list__item"
                >
                    Artists
                </NavLink>
                </li>
                <li>
                <NavLink to='/albums'
                activeClassName="selected"
                className="chart-list__item"
                >
                    Albums
                </NavLink>                
                </li>
                <li>
                <NavLink to='/songs'
                activeClassName="selected"
                className="chart-list__item"
                >
                    Songs
                </NavLink>                 
                </li>
            </ul>
        </div>
    );
};

Chart.propTypes = {
    
};

export default Chart;