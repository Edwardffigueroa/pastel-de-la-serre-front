import React from 'react'

import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import lupa from '../../../assets/images/nav/lupa.svg'
import cart from '../../../assets/images/nav/cart_bag.svg'

import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import Button from '../../UI/Button/Button'
import Languages from '../../Languages/Languages'
import { useTranslation } from 'react-i18next'

const Toolbar = props => {

    const { t, i18n } = useTranslation();

    return (

        <header className={classes.Toolbar}>
            {/* <DrawerToggle clicked={props.drawerToggleClicked} /> */}
            <div className={classes.Logo}>
                <Logo />
            </div>
            <section className={classes.Wrapper}>
                <Languages capitalize lang={['fr', 'en']} />
                <a href="/visitez-nous" className={classes.Btn}>  {t("head_button")}</a>

                <nav className={classes.DesktopOnly}>
                    <NavigationItems />
                </nav>
            </section>
        </header>
    );
}

export default Toolbar