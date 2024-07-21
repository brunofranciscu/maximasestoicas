import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../App';
import Maxima from '../pages/autor/maxima/index';
import Autor from '../pages/autor/index';
import PoliticaPrivacidade from '../pages/privacy-policy';
import Sobre from '../pages/sobre';
import { HelmetProvider } from 'react-helmet-async';

export default function Rotas() {
    return (
    <BrowserRouter>
        <HelmetProvider>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/autor/:author/maxima/:id" element={<Maxima />} />
                <Route path="/autor/:author" element={<Autor />} />
                <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
                <Route path="/sobre" element={<Sobre />} />
            </Routes>
        </HelmetProvider>
    </BrowserRouter>
    )
}
