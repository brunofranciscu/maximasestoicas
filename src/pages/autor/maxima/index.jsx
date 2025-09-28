import React, { useEffect, useState, useRef } from 'react';
import quotes from '../../../assets/frases.json'
import { Link, useParams, useNavigate } from 'react-router-dom';
import TextoAudio from '../../../components/TextoAudio.jsx'
import { Helmet } from 'react-helmet-async';
import Back from '../../../components/bckBtn'
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, TelegramShareButton, LinkedinShareButton, RedditShareButton, FacebookIcon, TwitterIcon, WhatsappIcon, TelegramIcon, LinkedinIcon, RedditIcon, } from 'react-share';
import SaveIcon from '../../../components/SaveIcon.jsx';
import Favoritos from '../../../components/Favoritos.jsx';

export default function Maxima({setViewSaved, viewSaved, highlight}) {
  const { id } = useParams();
  const quote = quotes.quotes.find(q => q.id === Number(id));
  const [salvas, setSalvas] = useState({});
  const url = window.location.origin.toString()
  const navigate = useNavigate()
  const [audioKey, setAudioKey] = useState(0);

  useEffect(() => {
    setAudioKey(prev => prev + 1);
  }, [id]);

  if (!quote ) {
    return (
      <div className='h-[100dvh] w-full relative grid place-content-center bg-gray-200 dark:bg-gray-800 px-5'>
        <button onClick={() => navigate('/')} className='dark:text-gray-400 text-gray-900 font-["Poppins"] font-[300] hover:text-gray-400 duration-100 absolute bottom-2 left-3'>
          <span className='relative top-[1px]'>&lt;</span> voltar
        </button>
        
        <h3 className='font-["Poppins"] font-[500] sm:text-4xl text-2xl leading-10 max-w-[1300px] text-center text-balance text-gray-600 dark:text-gray-300'>
          Máxima não encontrada.
        </h3>
      </div>
    )
  }

  const shareUrl = window.location.origin.toString();
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
    <div className='h-[100dvh] w-full relative grid place-content-center bg-gray-200 dark:bg-gray-800 px-8'>
        <Helmet>
          <title>{quote.text}</title>
          <meta name="description" content={quote.text}/>
          <meta property="og:title" content={quote.author} />
          <meta property="og:description" content={quote.text} />
        </Helmet>

        <Favoritos setViewSaved={setViewSaved} salvar={salvar} viewSaved={viewSaved} salvas={salvas} frases={quotes.quotes} highlight={highlight}/>

      <div className='px-12 flex flex-col items-center cl:items-start'>
        <Back />
        <h1 className='font-["Poppins"] font-[500] sm:text-4xl text-2xl leading-10 max-w-[1300px] w-auto text-center text-balance text-gray-600 dark:text-gray-300'>
          "{quote.text}"
        </h1>
      </div>

      <div className="flex py-5 justify-center flex-col items-center gap-5 max-w-[1100px] mx-auto w-full">
        <h2 className='text-sm font-["Poppins"] w-auto text-center leading-none cl:self-end self-center text-gray-600 dark:text-gray-400 dark:hover:text-gray-100 hover:text-gray-900 duration-100' title={`ver todas as maximas do ${quote.author}`}>
          <Link to={`${shareUrl}/autor/${quote.author.split(' ').join('-')}`}>- {quote.author}</Link>
        </h2>
      </div>

      <TextoAudio key={audioKey} frase={quote.text} autor={quote.author}/>
      
      <div className='flex flex-col fixed cl:top-1/2 top-[unset] cl:-translate-y-1/2 -translate-y-[unset] bottom-10 cl:bottom-[unset] left-5'>
        <FacebookShareButton url={`${url}/autor/${quote.author.split(' ').join('-').toLowerCase()}/maxima/${quote.id}`} quote={quote.text} className='opacity-45 hover:opacity-100 duration-100 dark:invert-0 invert'>
          <FacebookIcon size={45} bgStyle={{ fill: 'transparent' }} iconFillColor={'white'} />
        </FacebookShareButton>

        <TwitterShareButton url={`${url}/autor/${quote.author.split(' ').join('-').toLowerCase()}/maxima/${quote.id}`} title={quote.text} className='opacity-45 hover:opacity-100 duration-100 dark:invert-0 invert'>
          <TwitterIcon size={45} bgStyle={{ fill: 'transparent' }} iconFillColor={'white'} />
        </TwitterShareButton>

        <WhatsappShareButton url={`${url}/autor/${quote.author.split(' ').join('-').toLowerCase()}/maxima/${quote.id}`} title={quote.text} className='opacity-45 hover:opacity-100 duration-100 dark:invert-0 invert'>
          <WhatsappIcon size={45} bgStyle={{ fill: 'transparent' }} iconFillColor={'white'} />
        </WhatsappShareButton>

        <TelegramShareButton url={`${url}/autor/${quote.author.split(' ').join('-').toLowerCase()}/maxima/${quote.id}`} title={quote.text} className='opacity-45 hover:opacity-100 duration-100 dark:invert-0 invert'>
          <TelegramIcon size={45} bgStyle={{ fill: 'transparent' }} iconFillColor={'white'} />
        </TelegramShareButton>

        <LinkedinShareButton url={`${url}/autor/${quote.author.split(' ').join('-').toLowerCase()}/maxima/${quote.id}`} title={quote.text} className='opacity-45 hover:opacity-100 duration-100 dark:invert-0 invert'>
          <LinkedinIcon size={45} bgStyle={{ fill: 'transparent' }} iconFillColor={'white'} />
        </LinkedinShareButton>

        <RedditShareButton url={`${url}/autor/${quote.author.split(' ').join('-').toLowerCase()}/maxima/${quote.id}`} title={quote.text} className='opacity-45 hover:opacity-100 duration-100 dark:invert-0 invert'>
          <RedditIcon size={45} bgStyle={{ fill: 'transparent' }} iconFillColor={'white'} />
        </RedditShareButton>   

        <SaveIcon 
            title={`Salvar Máxima`} 
            className={`translate-x-1 translate-y-2 [&_*]:duration-100 ${!salvas[quote.id] ? '[&_path]:stroke-gray-500 hover:[&_path]:fill-gray-500 [&_path]:fill-none' : '[&_path]:stroke-gray-500 [&_path]:hover:fill-gray-500 [&_path]:fill-gray-500'}`} 
            onClick={()=> salvar(quote.id)} 
        />
      </div>
    </div>
  );
};
