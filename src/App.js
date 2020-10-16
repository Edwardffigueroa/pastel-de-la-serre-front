import React from "react"
import { Switch, Route, useLocation } from 'react-router-dom'
import Layout from './hoc/layout/Layout'
import classes from "./App.module.css"

import VisitezNous from './containers/VisitezNous/VisitezNous'
import Boutique from './containers/Boutique/Boutique'
import NotreHistoire from './containers/NotreHistoire/NotreHistoire'
import Checkout from "./containers/Checkout/Checkout"
import Cart from './utils/Cart'

import { useTransition, a, config } from 'react-spring'
import { AnimatedSwitch } from 'react-router-transition'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import DetailView from "./components/DetailView/DetailView"

function App() {
    return (
        <div className={classes.App} >
            <Layout products={Cart.products} >
                <AnimatedSwitch
                    atEnter={{ opacity: 0 }}
                    atLeave={{ opacity: 0 }}
                    atActive={{ opacity: 1 }}
                    className={classes.Wrapper}>
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/visitez-nous" component={VisitezNous} />
                    <Route path="/boutique" component={Boutique} />
                    <Route path="/notre-histoire" component={NotreHistoire} />
                    <Route path="/" exact component={NotreHistoire} />
                </AnimatedSwitch>
            </Layout>
        </div >
    );
}

export default App