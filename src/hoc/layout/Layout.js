import React, { useState } from 'react'

import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

const Layout = props => {

    const [showSideDrawer, setShowSideDrawer] = useState(false)

    const sideDrawerClosedHandler = () => setShowSideDrawer(false)
    const sideDrawerToggleHandler = () => setShowSideDrawer(prev => !prev)

    return (
        <div>
            <SideDrawer
                products={props.products}
                open={showSideDrawer}
                closed={sideDrawerClosedHandler}
                currentActive={props.currentActive}
                goSectionHandler={props.goSectionHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
            <Toolbar
                currentActive={props.currentActive}
                products={props.products}
                drawerToggleClicked={sideDrawerToggleHandler}
                goSectionHandler={props.goSectionHandler} />
        </div>
    )

}

export default Layout;