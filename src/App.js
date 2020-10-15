import React from "react"
import { Switch, Route } from 'react-router-dom'
import Layout from './hoc/layout/Layout'
import classes from "./App.module.css"

import VisitezNous from './containers/VisitezNous/VisitezNous'
import Boutique from './containers/Boutique/Boutique'
import NotreHistoire from './containers/NotreHistoire/NotreHistoire'
import Checkout from "./containers/Checkout/Checkout"
import Cart from './utils/Cart'

import { CSSTransition, TransitionGroup } from 'react-transition-group'

function App() {

    return (
        <div className={classes.App} >
            <Route render={({ location }) => (
                <TransitionGroup>
                    <CSSTransition
                        key={location.key}
                        timeout={450}
                        classNames="Page">
                        <Layout products={Cart.products} >
                            <Switch location={location} >
                                <Route path="/checkout" component={Checkout} />
                                <Route path="/visitez-nous" component={VisitezNous} />
                                <Route path="/boutique" component={Boutique} />
                                <Route path="/notre-histoire" component={NotreHistoire} />
                                <Route path="/" exact component={NotreHistoire} />
                            </Switch>
                        </Layout>
                    </CSSTransition>
                </TransitionGroup>
            )} />

        </div >
    );
}

export default App