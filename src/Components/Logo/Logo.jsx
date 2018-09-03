import React from 'react';
import { NavLink } from 'react-router-dom';
import './Logo.css';

const Logo = () => {
    return (
        <a href='/' className="logo">
            <h1 className="title">Музыкальный плеер</h1>
        </a>
    )
};

export default Logo;