import React from 'react';
import classes from './DotNav.module.css'

const DotNav = ({ hide, current, goSectionHandler }) => {
    const isVisible = hide ? [classes.DotNav, classes.Hidden].join(' ') : classes.DotNav
    return (
        <div className={isVisible}>
            <span
                onClick={e => goSectionHandler(0)}
                className={current === 0 ? [classes.Dot, classes.Active].join(' ') : classes.Dot}>
                {current === 0 ? '1' : null}
            </span>
            <span
                onClick={e => goSectionHandler(1)}
                className={current === 1 ? [classes.Dot, classes.Active].join(' ') : classes.Dot}>
                {current === 1 ? '2' : null}
            </span>
            <span
                onClick={e => goSectionHandler(2)}
                className={current === 2 ? [classes.Dot, classes.Active].join(' ') : classes.Dot}>
                {current === 2 ? '3' : null}
            </span>
        </div>
    );
}

export default DotNav;
