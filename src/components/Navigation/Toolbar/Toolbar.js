import React from 'react'

import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import lupa from '../../../assets/images/nav/lupa.svg'
import cart from '../../../assets/images/nav/cart_bag.svg'

import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import Button from '../../UI/Button/Button'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        {/* <DrawerToggle clicked={props.drawerToggleClicked} /> */}
        <div className={classes.Logo}>
            <Logo />
        </div>
        <section className={classes.Wrapper}>
        <a href="/visitez-nous" className={classes.Btn}>Réservation</a>
            
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </section>
    </header>
)

export default toolbar