import React from 'react'

import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import lupa from '../../../assets/images/nav/lupa.svg'

import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import Languages from '../../Languages/Languages'
import Cart from '../../Cart/Cart'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <section className={classes.Wrapper}>
            <Languages capitalize lang={['fr', 'en']} />
            <section className={classes.Beside}>
                <label htmlFor="search">
                    <input name="search" type="text" placeholder="search" />
                    <img src={lupa} alt="search" />
                </label>
                <span>
                    <Cart />
                </span>
            </section>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </section>
    </header>
)

export default toolbar