import { useState, useEffect } from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, TelegramShareButton, LinkedinShareButton, RedditShareButton, FacebookIcon, TwitterIcon, WhatsappIcon, TelegramIcon, LinkedinIcon, RedditIcon, } from 'react-share';
import { Link } from 'react-router-dom';

export default function App() {
  const [frases, setFrases] = useState([]);
  const [fraseAtual, setFraseAtual] = useState({ text: '', author: '', id:'' });

  useEffect(() => {
    const carregarFrase = async () => {
      const data = await fetch('./src/assets/frases.json');
      const response = await data.json();
      setFrases(response.quotes);
      gerarNovaFrase(response.quotes);
    };
    carregarFrase();
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
  
  const shareUrl = window.location.origin.toString();

  const allButtons = shares.map((share, index) => {
  const ShareButtonComponent = share.button;
  const ShareIconComponent = share.icon;
  
    return (
      <ShareButtonComponent url={`${shareUrl}/quotes/${fraseAtual.id}`} title={fraseAtual.text} key={index} className='opacity-45 hover:opacity-100 duration-100 dark:invert-0 invert'>
        <ShareIconComponent size={window.innerWidth < 640 ? 25 : 35} bgStyle={{ fill: 'transparent' }} iconFillColor={'white'} />
      </ShareButtonComponent>
    );
  });

  return (
        <div className='h-[100dvh] w-full relative grid place-content-center bg-gray-200 dark:bg-gray-800 px-5'>

          {fraseAtual.text && (
            <div className='flex flex-col gap-1 justify-center items-center'>
                <h1 className='font-["Poppins"] font-[500] sm:text-3xl text-2xl leading-10 max-w-[1300px] text-center text-balance text-gray-600 dark:text-gray-300'>
                  "{fraseAtual.text}"
                </h1>
                
              <div className='flex sm:justify-between justify-center max-w-[1000px] w-full items-center flex-col sm:flex-row mt-5 gap-4 sm:gap-0'>

                <h2 className='text-sm font-["Poppins"] sm:w-[200px] w-full text-center leading-none self-center text-gray-600 dark:text-gray-400 hover:text-gray-100 duration-100' title={`ver todas as maximas do ${fraseAtual.author}`}>
                  <Link to={`${shareUrl}/author/${fraseAtual.author}`}>- {fraseAtual.author}</Link>
                </h2>

                <div className="links flex w-auto">
                    {allButtons}
                </div>  
              </div>
            </div>
          )}
        </div>
    );
}
