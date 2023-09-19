import React from 'react'
import {render} from 'react-dom'
import App from './App'
import './index.scss'
import {Provider} from 'react-redux'
import {store} from './redux/store'

const rootElement = document.getElementById('root')
render(
  <Provider store={store}>
      <App />
  </Provider>,
  rootElement
)
