import React from 'react';
import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';
import './Sidebar.css';

const Sidebar = ({className}) => {
    return (
        <aside className={className}>
            <Logo/>
            <Menu menu={[
                {text: 'Pleer Elizabet', link: '/', submenu: false},
                {text: 'Interesting', link: '#', submenu: true},
                {text: 'Favorite', link: '#', submenu: true},
            ]}/>
        </aside>
    )
};

export default Sidebar;

