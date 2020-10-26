import React from 'react'
import pastelLogo from '../../assets/images/logo.svg'
import classes from './Logo.module.css'

const logo = (props) => (
    <div className={classes.Logo} style={{ height: props.height }}>
        <img src={pastelLogo} alt="Pastel De la Serre" />
    </div>
);

export default logo