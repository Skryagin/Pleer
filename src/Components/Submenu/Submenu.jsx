import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const SubMenu = ({sub}) => {
    return (
        <ul className='sub-menu'>
            {sub.map(el => <li className="sub-menu__item" key={`${el.parentKey}${el.text}`}>
                {/* <a href={el.link} className="sub-menu__link">{el.text}</a> */}
                <NavLink to={el.link} className="sub-menu__link">{el.text}</NavLink>
            </li>)}
        </ul>
    )
};

SubMenu.propTypes = {
    sub: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            parentKey: PropTypes.string.isRequired,
        })
    )
};

export default SubMenu;
