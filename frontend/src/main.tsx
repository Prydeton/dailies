import React, { createElement } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { setup } from 'goober'

// Setup Goober
setup(createElement)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
