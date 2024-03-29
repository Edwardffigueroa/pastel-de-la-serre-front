import React, { lazy } from "react"
import classes from "./App.module.css"

import { Route } from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition'
import { fetchAll } from './utils/FetchAll'

const resource = fetchAll()


const Booking = lazy(() => import('./containers/Booking/Booking'))
const NotreHistoire = lazy(() => import('./containers/NotreHistoire/NotreHistoire'))

function App() {

    const general = resource.general.read()
    const _history = resource.history.read()
    const visit = resource.visit.read()
    const boutique = resource.boutique.read()
    const products = resource.products.read()
    const checkout = resource.checkout.read()

    return (
        <div className={classes.App}>
            <AnimatedSwitch
                atEnter={{ opacity: 0 }}
                atLeave={{ opacity: 0 }}
                atActive={{ opacity: 1 }}
                className={classes.Wrapper}>
                <Route path="/booking" exact component={Booking} />
                <Route path="/" render={({ match, history }) => <NotreHistoire
                    match={match}
                    history={history}
                    general={general}
                    histoire={_history}
                    visit={visit}
                    boutique={boutique}
                    checkout={checkout}
                    shopItems={products} />}
                />
            </AnimatedSwitch>
        </div >
    );


}

export default App