import React from 'react';
import classes from './Button.module.css'
import row from '../../../assets/images/nav/row.svg'
const Button = props => {

    const myClasses = [classes.Button, props.type].join(' ')

    return <button
        className={myClasses}
        onClick={props.clicked}>
        {props.children}
        <img src={row} alt="Go, prochaine" />
    </button>
}

export default Button;
