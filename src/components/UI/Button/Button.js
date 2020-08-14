import React from 'react';
import classes from './Button.module.css'
const Button = props => {

    const myClasses = [classes.Button, props.type].join(' ')

    return <button
        className={myClasses}
        onClick={props.clicked}>
        {props.children}
    </button>
}

export default Button;
