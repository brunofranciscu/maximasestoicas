import { useState, useEffect } from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, TelegramShareButton, LinkedinShareButton, RedditShareButton, FacebookIcon, TwitterIcon, WhatsappIcon, TelegramIcon, LinkedinIcon, RedditIcon, } from 'react-share';
import { Link } from 'react-router-dom';
import TextoAudio from './components/TextoAudio.jsx';
import { Analytics } from "@vercel/analytics/react";
import SaveIcon from './components/SaveIcon.jsx';
import Favoritos from './components/Favoritos.jsx';

export default function App({viewSaved, setViewSaved}) {
  const [frases, setFrases] = useState([]);
  const [fraseAtual, setFraseAtual] = useState({ text: '', author: '', id:'' });
  const itemsMenu = new Set();
  const [salvas, setSalvas] = useState({});

  frases.forEach(item => itemsMenu.add(item.author))
  const menu = Array.from(itemsMenu);

  useEffect(() => {
    const carregarFrases = async () => {
      const data = await fetch('./frases.json');
      const response = await data.json();
      setFrases(response.quotes);
      gerarNovaFrase(response.quotes);
    };
    carregarFrases();
  }, []);

  const gerarNovaFrase = (quotes) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setFraseAtual(quotes[randomIndex]);
  };  
  
  const shares = [
    { button: FacebookShareButton, icon: FacebookIcon, name: 'Facebook' },
    { button: TwitterShareButton, icon: TwitterIcon, name: 'Twitter' },
    { button: WhatsappShareButton, icon: WhatsappIcon, name: 'WhatsApp' },
    { button: TelegramShareButton, icon: TelegramIcon, name: 'Telegram' },
    { button: LinkedinShareButton, icon: LinkedinIcon, name: 'LinkedIn' },
    { button: RedditShareButton, icon: RedditIcon, name: 'Reddit' },
  ];
  
  const url = window.location.origin.toString();
  const allButtons = shares.map((share, index) => {
  const ShareButtonComponent = share.button;
  const ShareIconComponent = share.icon;
  
    return (
      <ShareButtonComponent url={`${url}/autor/${fraseAtual.author.split(' ').join('-').toLowerCase()}/maxima/${fraseAtual.id}`} title={fraseAtual.text} key={index}
                            className='opacity-45 hover:opacity-100 duration-100 dark:invert-0 invert'>
        <ShareIconComponent size={window.innerWidth < 640 ? 25 : 35} bgStyle={{ fill: 'transparent' }} iconFillColor={'white'}/>
      </ShareButtonComponent>
    );
  });

  useEffect(() => {
    const salvadas = JSON.parse(localStorage.getItem('salvas')) || {};
    setSalvas(salvadas);
  }, []);

  const salvar = (id) => {
    setSalvas(prevSalvas => {
      const updtSalvas = { ...prevSalvas, [id]: !prevSalvas[id] };
      localStorage.setItem('salvas', JSON.stringify(updtSalvas));      
      return updtSalvas;
    });
  };

  return (
        <div className='h-screen w-full relative grid place-items-center bg-gray-200 dark:bg-gray-800 px-5 overflow-hidden'>
            <Analytics/>
                  
            <Favoritos setViewSaved={setViewSaved} salvar={salvar} viewSaved={viewSaved} salvas={salvas} frases={frases}/>

            {fraseAtual.text && (
              <div className='flex flex-col gap-1 justify-center items-center animate-[opacity_.8s_linear] bg-gray-200 dark:bg-gray-800'>
                  <h1 className='font-["Poppins"] font-[500] sm:text-3xl text-2xl leading-10 md:min-w-[700px] min-w-auto !w-full max-w-[1300px] text-center text-balance text-gray-600 dark:text-gray-200'>
                    "{fraseAtual.text}"
                  </h1>
                <div className='flex sm:justify-between justify-center max-w-[1000px] w-full items-center flex-col sm:flex-row mt-5 gap-4 sm:gap-0'>
  
                  <h2 className='text-sm font-["Poppins"] sm:w-[200px] w-full text-center leading-none self-center text-gray-600 dark:text-gray-400 hover:text-gray-400 duration-100' title={`ver todas as maximas do ${fraseAtual.author}`}>
                    <Link to={`${url}/autor/${fraseAtual.author.split(' ').join('-')}`}>- {fraseAtual.author}</Link>
                  </h2>
  
                  <div className="flex flex-col fixed cl:top-1/2 top-[unset] cl:-translate-y-1/2 -translate-y-[unset] bottom-16 cl:bottom-[unset] left-5">
                      {allButtons}
                      <SaveIcon 
                          title={`Salvar Máxima`} 
                          className={`[&_*]:duration-100 translate-y-2 ${!salvas[fraseAtual.id] ? '[&_path]:stroke-gray-500 hover:[&_path]:fill-gray-500 [&_path]:fill-none' : '[&_path]:stroke-gray-500 [&_path]:hover:fill-gray-500 [&_path]:fill-gray-500'}`} 
                          onClick={()=> salvar(fraseAtual.id)} 
                      />
                  </div>  
                </div>
                <TextoAudio key={fraseAtual.id} frase={fraseAtual.text} autor={fraseAtual.author}/>
              </div>
              
          )}
              <div className="absolute bottom-6 grid place-items-center w-full">
                <nav>
                  <ul className='flex gap-10'> 
                    {menu.map((item,index) => 
                        <li className='text-gray-500 hover:text-gray-900 duration-100 dark:text-gray-200 dark:hover:text-gray-50 cl:text-sm text-[.7rem]' key={index}>
                            <Link to={`${url}/autor/${item.split(' ').join('-')}`}>{item}</Link>
                        </li> 
                    )} 
                  </ul>
                </nav>

              </div>
                <small className='absolute right-5 bottom-[unset] md:bottom-6 md:top-[unset] top-6 text-xs z-0'>
                  <button className='dark:text-gray-400 dark:hover:text-gray-100 text-gray-500 hover:text-gray-800'>
                    <Link to={'/sobre'}>Sobre</Link>
                  </button>
                </small>

        </div>
    )
}
