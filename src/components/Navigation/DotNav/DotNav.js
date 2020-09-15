import React, { useEffect, useState } from 'react';
import classes from './DotNav.module.css'
import { NavLink, useLocation } from 'react-router-dom'

const DotNav = () => {

    const location = useLocation()
    const [isVisible, setIsVisible] = useState([classes.DotNav])

    useEffect(() => {

        if (location.pathname.split('/').length > 2) {
            const newClasses = [classes.DotNav, classes.Hidden].join(' ')
            setIsVisible(newClasses)
        } else {
            setIsVisible([classes.DotNav])
        }

    }, [location])

    return (
        <div className={isVisible}>
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
