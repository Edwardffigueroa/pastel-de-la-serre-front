import React, { useState } from 'react';
import classes from './Button.module.css'

const Button = props => {
    let myClasses = [classes.Button]

    if (props.detailed) {
        myClasses.push(classes.ButtonDetail)
    }

    if (props.isOverImage) {
        myClasses.push(classes.ButtonOverImage)
    }

    if (props.isShop) {
        myClasses.push(classes.ShopButton)
    }

    myClasses = myClasses.join(' ')

    return <button
        className={myClasses}
        onClick={props.clicked}>
        {props.children}
        <span className={classes.Row}></span>
    </button>
}

export default Button;
