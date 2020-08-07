import React from 'react'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

import closeX from '../../../assets/images/nav/close.svg'

import lupa from '../../../assets/images/nav/lupa.svg'
import cart from '../../../assets/images/nav/cart_bag.svg'

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close]
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return (
        <div>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <nav className={classes.NavigationItems}>
                    <NavigationItems height="auto" />
                    <span onClick={props.closed}>
                        <img className={classes.closeX} src={closeX} alt="close" />
                    </span>
                </nav>
            </div>
        </div>
    )
}

export default sideDrawer