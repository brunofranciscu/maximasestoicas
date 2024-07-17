import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Rotas from './rotas/index.jsx'
import { MaximaProvider } from './assets/context/Context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <MaximaProvider>
      <Rotas>
        <App />
      </Rotas>
    </MaximaProvider>
)
