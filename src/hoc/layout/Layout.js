import React, { useState } from 'react'

import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import sponsor from '../../assets/logo_sponsors.svg'

const Layout = props => {

    const [showSideDrawer, setShowSideDrawer] = useState(false)

    const sideDrawerClosedHandler = () => setShowSideDrawer(false)
    const sideDrawerToggleHandler = () => setShowSideDrawer(prev => !prev)

    return (
        <div>
            <SideDrawer
                options={props.navOptions}
                products={props.products}
                open={showSideDrawer}
                closed={sideDrawerClosedHandler}
                currentActive={props.currentActive}
                goSectionHandler={props.goSectionHandler}
                languageHandler={props.languageHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
            <Toolbar
                options={props.navOptions}
                currentActive={props.currentActive}
                products={props.products}
                drawerToggleClicked={sideDrawerToggleHandler}
                goHomeHandler={props.goHomeHandler}
                goCartHandler={props.goCartHandler}
                goSectionHandler={props.goSectionHandler}
                languageHandler={props.languageHandler}
            />
            {/* <div className={classes.Brand}>
                <img src={sponsor}></img>
            </div> */}
        </div>
    )

}

export default Layout;