import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import "antd/dist/reset.css"
import './index.css'
import ContextFirst from './context/Context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextFirst>
    <App />
    </ContextFirst>
  </React.StrictMode>,
)
