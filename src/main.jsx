import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Rotas from './rotas/index.jsx'
import { MaximaProvider } from './assets/context/Context.jsx'
import { TTSContextProvider } from './contexto/TTSContextProvider.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <TTSContextProvider>
    <MaximaProvider>
      <BrowserRouter>
        <Rotas>
          <App />
        </Rotas>
      </BrowserRouter>
    </MaximaProvider>
    </TTSContextProvider>
)
