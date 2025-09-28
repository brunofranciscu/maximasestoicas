import { Route, Routes  } from 'react-router-dom';
import { useState } from 'react';
import App from '../App';
import Maxima from '../pages/autor/maxima/index';
import Autor from '../pages/autor/index';
import PoliticaPrivacidade from '../pages/privacy-policy';
import Sobre from '../pages/sobre';
import { HelmetProvider } from 'react-helmet-async';

export default function Rotas() {
    const [viewSaved, setViewSaved] = useState(false);

    return (
        <HelmetProvider>
            <Routes>
                <Route path="/" element={<App setViewSaved={setViewSaved} viewSaved={viewSaved}/>} />
                <Route path="/autor/:author/maxima/:id" element={<Maxima setViewSaved={setViewSaved} viewSaved={viewSaved} />} />
                <Route path="/autor/:author" element={<Autor setViewSaved={setViewSaved} viewSaved={viewSaved}/>} />
                <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade setViewSaved={setViewSaved} viewSaved={viewSaved}/>} />
                <Route path="/sobre" element={<Sobre setViewSaved={setViewSaved} viewSaved={viewSaved}/>} />
            </Routes>
        </HelmetProvider>
        )
}
