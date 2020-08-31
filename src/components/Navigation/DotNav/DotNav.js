import React from 'react';
import classes from './DotNav.module.css'
import { NavLink } from 'react-router-dom'

const DotNav = () => {
    return (
        <div className={classes.DotNav}>
            <NavLink
                to="/notre-histoire"
                isActive={(match, location) => {
                    if (!match) {
                        return location.pathname === "/" ? true : false;
                    }
                    return true
                }}
                className={classes.Dot}
                activeClassName={classes.Active}>
            </NavLink>
            <NavLink
                to="/visitez-nous"
                className={classes.Dot}
                activeClassName={classes.Active}>
            </NavLink>
            <NavLink
                to="/boutique"
                className={classes.Dot}
                activeClassName={classes.Active}>
            </NavLink>
        </div>
    );
}

export default DotNav;
