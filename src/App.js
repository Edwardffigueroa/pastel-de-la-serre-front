import React, { Suspense, lazy } from "react"
import Layout from './hoc/layout/Layout'
import classes from "./App.module.css"

import Cart from './utils/Cart'
import { Route } from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition'
import Spinner from './components/UI/Spinner/Spinner'

const Booking = lazy(() => import('./containers/Booking/Booking'))
const VisitezNous = lazy(() => import('./containers/VisitezNous/VisitezNous'))
const Boutique = lazy(() => import('./containers/Boutique/Boutique'))
const NotreHistoire = lazy(() => import('./containers/NotreHistoire/NotreHistoire'))
const Checkout = lazy(() => import("./containers/Checkout/Checkout"))

function App() {

    const products = Cart.getProducts()

    return (
        <div className={classes.App}>
            <Suspense fallback={<Spinner />}>
                <Layout products={products}>
                    <AnimatedSwitch
                        atEnter={{ opacity: 0 }}
                        atLeave={{ opacity: 0 }}
                        atActive={{ opacity: 1 }}
                        className={classes.Wrapper}>
                        <Route path="/booking" exact component={Booking} />
                        <Route path="/checkout" component={Checkout} />
                        <Route path="/visitez-nous" component={VisitezNous} />
                        <Route path="/boutique" component={Boutique} />
                        <Route path="/notre-histoire" component={NotreHistoire} />
                        <Route path="/" exact component={NotreHistoire} />
                    </AnimatedSwitch>
                </Layout>
            </Suspense>
        </div >
    );
}

export default App