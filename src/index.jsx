import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
// import App from './App'
import * as serviceWorker from './serviceWorker'
import Spinner from './components/UI/Spinner/Spinner'

const App = lazy(() => import('./App'))

ReactDOM.render(
  <BrowserRouter>
    <Suspense fallback={<Spinner />}>
      <App />
    </Suspense>
  </BrowserRouter>,
  document.getElementById('root')
)

serviceWorker.unregister()
