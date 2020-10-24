import React, { useEffect, useState } from 'react';
import classes from './DotNav.module.css'
import { NavLink, useLocation } from 'react-router-dom'

const DotNav = ({ hide, current, goSectionHandler }) => {
    const isVisible = hide ? [classes.DotNav, classes.Hidden].join(' ') : classes.DotNav
    return (
        <div className={isVisible}>
            <span
                onClick={e => goSectionHandler(0)}
                className={current === 0 ? [classes.Dot, classes.Active].join(' ') : classes.Dot}>
            </span>
            <span
                onClick={e => goSectionHandler(1)}
                className={current === 1 ? [classes.Dot, classes.Active].join(' ') : classes.Dot}>
            </span>
            <span
                onClick={e => goSectionHandler(2)}
                className={current === 2 ? [classes.Dot, classes.Active].join(' ') : classes.Dot}>
            </span>
        </div>
    );
}

export default DotNav;
