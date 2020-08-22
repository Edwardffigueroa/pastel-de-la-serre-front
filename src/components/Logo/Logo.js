import React from 'react'

import pastelLogo from '../../assets/images/logo.svg'
import classes from './Logo.module.css'
import { NavLink } from 'react-router-dom';

const logo = (props) => (
    <div className={classes.Logo} style={{ height: props.height }}>
        <NavLink
                            to="/"
                            exact="exact">
        <img src={pastelLogo} alt="Pastel De la Serre" />
        </NavLink>
    </div>
);

export default logo