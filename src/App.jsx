import { useState, useEffect, useRef } from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, TelegramShareButton, LinkedinShareButton, RedditShareButton, FacebookIcon, TwitterIcon, WhatsappIcon, TelegramIcon, LinkedinIcon, RedditIcon, } from 'react-share';
import { Link, useNavigate } from 'react-router-dom';
import TextoAudio from './TextoAudio.jsx';
import AudioWaves from './AudioWaves.jsx';
import { Analytics } from "@vercel/analytics/react";


export default function App() {
  const [frases, setFrases] = useState([]);
  const [fraseAtual, setFraseAtual] = useState({ text: '', author: '', id:'' });
  const [blob, setBlob] = useState(null)
  const [textou, setTextou] = useState(false);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const [isEnded, setIsEnded] = useState(false);
  const [playPause, setPlayPause] = useState(true);
  const api1 = 'f7333e903edf9a082fef5585c547e03b';
  const itemsMenu = new Set();
  const [salvas, setSalvas] = useState({});
  const [viewSaved, setViewSaved] = useState(false)
  const saveIcon = `<svg width="25px" height="25px" viewBox="0 0 64 64"><path d="M30.051 45.6071L17.851 54.7401C17.2728 55.1729 16.5856 55.4363 15.8662 55.5008C15.1468 55.5652 14.4237 55.4282 13.7778 55.1049C13.1319 54.7817 12.5887 54.2851 12.209 53.6707C11.8293 53.0563 11.6281 52.3483 11.628 51.626V15.306C11.628 13.2423 12.4477 11.2631 13.9069 9.8037C15.3661 8.34432 17.3452 7.52431 19.409 7.52405H45.35C47.4137 7.52431 49.3929 8.34432 50.8521 9.8037C52.3112 11.2631 53.131 13.2423 53.131 15.306V51.625C53.1309 52.3473 52.9297 53.0553 52.55 53.6697C52.1703 54.2841 51.6271 54.7807 50.9812 55.1039C50.3353 55.4272 49.6122 55.5642 48.8928 55.4998C48.1734 55.4353 47.4862 55.1719 46.908 54.739L34.715 45.6071C34.0419 45.1031 33.2238 44.8308 32.383 44.8308C31.5422 44.8308 30.724 45.1031 30.051 45.6071V45.6071Z" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  const savedIcon = `<svg width="25px" height="25px" viewBox="0 0 64 64"><path d="M45.35 6.1709H19.41C16.8178 6.17618 14.3333 7.20827 12.5003 9.04123C10.6674 10.8742 9.63528 13.3587 9.62999 15.9509V52.2709C9.6272 53.3655 9.92973 54.4392 10.5036 55.3713C11.0775 56.3034 11.9 57.057 12.8787 57.5474C13.8573 58.0377 14.9533 58.2454 16.0435 58.1471C17.1337 58.0488 18.1748 57.6484 19.05 56.9909L31.25 47.8509C31.5783 47.6074 31.9762 47.4759 32.385 47.4759C32.7938 47.4759 33.1917 47.6074 33.52 47.8509L45.71 56.9809C46.5842 57.6387 47.6246 58.0397 48.7142 58.1387C49.8038 58.2378 50.8994 58.0311 51.8779 57.5418C52.8565 57.0525 53.6793 56.3001 54.2537 55.3689C54.8282 54.4378 55.1317 53.365 55.13 52.2709V15.9509C55.1247 13.3587 54.0926 10.8742 52.2597 9.04123C50.4267 7.20827 47.9422 6.17618 45.35 6.1709Z" stroke-width="4"/></svg>`
  const navigate = useNavigate()

  frases.forEach(item => itemsMenu.add(item.author))
  const menu = Array.from(itemsMenu);
  
  const progress = async () => {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB`, settings);
    const result = await response.blob();
    setBlob(URL.createObjectURL(result));
    setIsEnded(false)
  };

  const settings = {
    method: 'POST',
    headers: { "Accept": "audio/mpeg", "Content-Type": "application/json", "xi-api-key": api1 },
    body: JSON.stringify({
      "text": fraseAtual.text,
      "model_id": "eleven_multilingual_v1",
      "voice_settings": {
        "stability": 0.5,
        "similarity_boost": 0.5
      }
    })
  };

  const tocar = () => {
    if (!textou) {
      setTextou(true);
      setTimeout(()=>{document.querySelector('audio').play()},300)      
    } else {
      document.querySelector('audio').play();
    }
  };

  const pausar = () => document.querySelector('audio').pause()

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
      <ShareButtonComponent url={`${url}/maxima/${fraseAtual.id}`} title={fraseAtual.text} key={index}
                            className='opacity-45 hover:opacity-100 duration-100 dark:invert-0 invert'>
        <ShareIconComponent size={window.innerWidth < 640 ? 25 : 35} bgStyle={{ fill: 'transparent' }} iconFillColor={'white'}/>
      </ShareButtonComponent>
    );
  });

  useEffect(() => {
      const salvadas = JSON.parse(localStorage.getItem('salvas')) || {};
      setSalvas(salvadas);
  }, []);

  const salvar = id => {
      setSalvas(prevSalvas => {
          const updtSalvas = { ...prevSalvas, [id]: !prevSalvas[id] };
          localStorage.setItem('salvas', JSON.stringify(updtSalvas));
          return updtSalvas;
      });
  };

  

    
  return (
        <div className='h-screen w-full relative grid place-items-center bg-gray-200 dark:bg-gray-800 px-5'>

          <button dangerouslySetInnerHTML={{__html:savedIcon}} title="ver salvos" style={{left:viewSaved ? window.innerWidth < 770 ? '90%' :'410px' : '20px'}}
                  className='stroke-gray-500 hover:brightness-150 fill-gray-500 duration-75 absolute top-5 left-5 z-[999999]' 
                  onClick={()=> setViewSaved(prevViewSaved => !prevViewSaved)}>
          </button>

              {viewSaved && 
                <ul className='fixed left-0 md:w-[450px] w-full bg-gray-200 dark:bg-gray-800/95 shadow-2xl h-full z-[999998] p-12 overflow-y-auto flex flex-col gap-8 salvos backdrop-blur-sm top-0'>
                    {
                      Object.entries(salvas).map(([key, value]) => (
                        value && frases.map((frase) => (
                                frase.id.toString() === key && 
                                    <li onClick={() => navigate('/maxima/'+key)} className='text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 duration-100'>
                                     <small className='text-[].6rem block leading-none text-gray-400/50'> - {frase.author}</small>
                                      "{frase.text}"
                                    </li>
                            ))
                        ))
                    }
                </ul>
              }


        <Analytics/>
          {fraseAtual.text && (
              <div className='flex flex-col gap-1 justify-center items-center animate-[opacity_.8s_linear] bg-gray-200 dark:bg-gray-800'>
                  <h1 className='font-["Poppins"] font-[500] sm:text-3xl text-2xl leading-10 max-w-[1300px] text-center text-balance text-gray-600 dark:text-gray-200'>
                    "{fraseAtual.text}"
                  </h1>
                <div className='flex sm:justify-between justify-center max-w-[1000px] w-full items-center flex-col sm:flex-row mt-5 gap-4 sm:gap-0'>
  
                  <h2 className='text-sm font-["Poppins"] sm:w-[200px] w-full text-center leading-none self-center text-gray-600 dark:text-gray-400 hover:text-gray-400 duration-100' title={`ver todas as maximas do ${fraseAtual.author}`}>
                    <Link to={`${url}/autor/${fraseAtual.author}`}>- {fraseAtual.author}</Link>
                  </h2>
  
                  <div className="links flex w-auto">
                      {allButtons}
                      {!salvas[fraseAtual.id] && <button dangerouslySetInnerHTML={{__html:saveIcon}} title="salvar máxima" className='stroke-gray-500 hover:fill-gray-500 fill-none duration-100' onClick={()=> salvar(fraseAtual.id)}></button>}
                      {salvas[fraseAtual.id] && <button dangerouslySetInnerHTML={{__html:savedIcon}} title="remover dos salvos" className='stroke-gray-500 hover:fill-gray-500 fill-gray-500 duration-100' onClick={()=> salvar(fraseAtual.id)}></button>}
                  </div>  
                </div>
                <div className='md:-translate-y-8 translate-y-12 mx-auto'>
                  <TextoAudio setBlob={setBlob} tocar={tocar} pausar={pausar} progress={progress} blob={blob} isEnded={isEnded} setPlayPause={setPlayPause} playPause={playPause}/>
                </div>                
              </div>
              
          )}
              <div className="absolute bottom-6 grid place-items-center w-full">
                <nav>
                  <ul className='flex gap-10'> 
                    {menu.map((item,index) => 
                        <li className='text-gray-500 hover:text-gray-900 duration-100 dark:text-gray-200 dark:hover:text-gray-50 text-xs' key={index}>
                            <Link to={`${url}/autor/${item}`}>{item}</Link>
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

              <AudioWaves blob={blob} duration={duration} setDuration={setDuration} audioRef={audioRef} setIsEnded={setIsEnded} setPlayPause={setPlayPause}/>
        </div>
    )
}
