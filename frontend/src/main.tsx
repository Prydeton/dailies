import React, { createElement } from 'react'
import ReactDOM from 'react-dom/client'
import { setup } from 'goober'

import App from './App.tsx'

// Setup Goober
setup(createElement)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
