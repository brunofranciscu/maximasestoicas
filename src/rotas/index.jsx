import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../App';
import Quotes from '../pages/quotes/index';
import Author from '../pages/author/index';

export default function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/quotes/:id" element={<Quotes/>} />
                <Route path="/author/:author" element={<Author/>} />
            </Routes>
        </BrowserRouter>
    )
}