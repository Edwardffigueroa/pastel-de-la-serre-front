import React, { Suspense, lazy } from "react"
import classes from "./App.module.css"

import { Route } from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition'
import Spinner from './components/UI/Spinner/Spinner'

const Booking = lazy(() => import('./containers/Booking/Booking'))
const NotreHistoire = lazy(() => import('./containers/NotreHistoire/NotreHistoire'))

function App() {
    return (
        <div className={classes.App}>
            <Suspense fallback={<Spinner />}>
                
                <AnimatedSwitch
                    atEnter={{ opacity: 0 }}
                    atLeave={{ opacity: 0 }}
                    atActive={{ opacity: 1 }}
                    className={classes.Wrapper}>
                    <Route path="/booking" exact component={Booking} />
                    <Route path="/" component={NotreHistoire} />
                </AnimatedSwitch>
            </Suspense>
        </div >
    );
}

export default App