import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import quotes from '../../assets/frases.json';
import Pagination from '../../components/Pagination';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, TelegramShareButton, LinkedinShareButton, RedditShareButton, FacebookIcon, TwitterIcon, WhatsappIcon, TelegramIcon, LinkedinIcon, RedditIcon, } from 'react-share';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Autor = () => {
  const { author } = useParams();
  const [pagina, setPagina] = useState(1);
  const [quotesPerPage] = useState(15);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const navigate = useNavigate()
  const [salvas, setSalvas] = useState({});
  const saveIcon = `<svg width="25px" height="25px" viewBox="0 0 64 64"><path d="M30.051 45.6071L17.851 54.7401C17.2728 55.1729 16.5856 55.4363 15.8662 55.5008C15.1468 55.5652 14.4237 55.4282 13.7778 55.1049C13.1319 54.7817 12.5887 54.2851 12.209 53.6707C11.8293 53.0563 11.6281 52.3483 11.628 51.626V15.306C11.628 13.2423 12.4477 11.2631 13.9069 9.8037C15.3661 8.34432 17.3452 7.52431 19.409 7.52405H45.35C47.4137 7.52431 49.3929 8.34432 50.8521 9.8037C52.3112 11.2631 53.131 13.2423 53.131 15.306V51.625C53.1309 52.3473 52.9297 53.0553 52.55 53.6697C52.1703 54.2841 51.6271 54.7807 50.9812 55.1039C50.3353 55.4272 49.6122 55.5642 48.8928 55.4998C48.1734 55.4353 47.4862 55.1719 46.908 54.739L34.715 45.6071C34.0419 45.1031 33.2238 44.8308 32.383 44.8308C31.5422 44.8308 30.724 45.1031 30.051 45.6071V45.6071Z" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  const savedIcon = `<svg width="25px" height="25px" viewBox="0 0 64 64"><path d="M45.35 6.1709H19.41C16.8178 6.17618 14.3333 7.20827 12.5003 9.04123C10.6674 10.8742 9.63528 13.3587 9.62999 15.9509V52.2709C9.6272 53.3655 9.92973 54.4392 10.5036 55.3713C11.0775 56.3034 11.9 57.057 12.8787 57.5474C13.8573 58.0377 14.9533 58.2454 16.0435 58.1471C17.1337 58.0488 18.1748 57.6484 19.05 56.9909L31.25 47.8509C31.5783 47.6074 31.9762 47.4759 32.385 47.4759C32.7938 47.4759 33.1917 47.6074 33.52 47.8509L45.71 56.9809C46.5842 57.6387 47.6246 58.0397 48.7142 58.1387C49.8038 58.2378 50.8994 58.0311 51.8779 57.5418C52.8565 57.0525 53.6793 56.3001 54.2537 55.3689C54.8282 54.4378 55.1317 53.365 55.13 52.2709V15.9509C55.1247 13.3587 54.0926 10.8742 52.2597 9.04123C50.4267 7.20827 47.9422 6.17618 45.35 6.1709Z" stroke-width="4"/></svg>`
  const [viewSaved, setViewSaved] = useState(false)
  const remover = `<svg fill="#000000" width="15px" height="15px" viewBox="0 0 408.483 408.483"> <g> <g> <path d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316 H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293 c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329 c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355 c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356 c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z"/> <path d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916 c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z"/> </g> </g> </svg>`

  useEffect(() => {
    const filtered = quotes.quotes.filter(quote => quote.author.split(' ').join('-') === author);
    setFilteredQuotes(filtered);
  }, [author]);

  const lastQuoteIndex = pagina * quotesPerPage;
  const firstQuoteIndex = lastQuoteIndex - quotesPerPage;
  const currentQuotes = filteredQuotes.slice(firstQuoteIndex, lastQuoteIndex);

  const url = window.location.origin.toString()

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
  const desacentuar = (busca) => { return busca.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}

  return (
    <div className='w-full relative grid place-content-center bg-gray-200 dark:bg-gray-800 py-20' style={{height:filteredQuotes.length < quotesPerPage ? '100dvh' : '100%'}}>

        <Helmet>
          <title>Máximas Estóicas</title>
          <meta property="og:title" content="Home Page" />
          <meta property="og:description" content={`Conheça mais máximas do ${author}.`} />
          <meta property="og:image" content={`./og.jpg`} />
          <meta property="og:url" content={`https://maximasestoicas.vercel.app/${author}`} />
        </Helmet>

        <button dangerouslySetInnerHTML={{__html:viewSaved ? 'X' : savedIcon}} title="ver salvos" style={{right:viewSaved ? window.innerWidth < 770 ? '90%' :'410px' : '20px'}} key={'button'}
                className='stroke-gray-500 hover:brightness-150 fill-gray-500 absolute top-5 right-5 z-[999999]' 
                onClick={()=> setViewSaved(prevViewSaved => !prevViewSaved)}>
        </button>

      <div className='flex flex-col max-w-[1200px] w-full px-16 mx-auto gap-5' key={'title'}>
        <div className='flex justify-between'>
          <button onClick={() => navigate(-1)} className='dark:text-gray-400 text-gray-900 font-["Poppins"] font-[300] hover:text-gray-400 duration-100'><span className='relative top-[1px]'>&lt;</span> voltar</button>
          <h1 className='dark:text-gray-200 text-gray-600 sm:text-4xl text-xl font-["Poppins"] font-[500]'>{author.split('-').join(' ')}</h1>
        </div>

        {viewSaved &&
              <ul className='fixed right-0 md:w-[450px] w-full bg-gray-200 dark:bg-gray-800/95 shadow-2xl h-full z-[999998] p-12 overflow-y-auto flex flex-col gap-8 salvos backdrop-blur-sm top-0'>
                {Object.keys(salvas).filter(key => salvas[key]).length < 1 && <span className='text-gray-700 dark:text-gray-300'>Nada encontrado.</span>}
                {
                  Object.entries(salvas).filter(([key, value]) => value).map(([key]) => (
                    quotes.quotes.map(frase => (
                      frase.id === Number(key) &&
                      (<li key={key} className='text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 duration-100 flex gap-2 items-center'>
                        <button dangerouslySetInnerHTML={{ __html: remover }} className='stroke-gray-500 hover:brightness-150 fill-gray-500 duration-75 z-[999999] [scale:.8]'
                          onClick={() => salvar(frase.id)}>
                        </button>
                        <div className='flex flex-col'>
                          <small className='text-[.6rem] block leading-none text-gray-400/50'> - {frase.author}</small>
                          <span onClick={() => navigate(`/autor/${author.split(' ').join('-').toLowerCase()}/maxima/${key}`)}>"{frase.text}"</span>
                        </div>
                      </li>)
                    ))
                  ))
                }
            </ul>
          }
          {currentQuotes.map((quote, index) => (
            <div key={`${index}-${quote.id}`} className='py-5 quote [&:last-of-type_hr]:opacity-0'>
              <Link to={`${url}/autor/${author.split(' ').join('-').toLowerCase()}/maxima/${quote.id}`}>
                <h1 className='dark:text-gray-300 text-gray-700 font-["Poppins"] font-[400] sm:text-2xl text-lg leading-none hover:dark:text-gray-100 hover:text-gray-500 duration-100'>"{quote.text}"</h1>
              </Link>
  
              <div className='flex justify-between pt-5'>
                <h2 className='dark:text-gray-300 text-gray-700 font-["Poppins"] font-[200]'>- {quote.author}</h2> 
                
                <div className='flex'>
                  <FacebookShareButton url={`${url}/autor/${quote.author.split(' ').join('-').toLowerCase()}/maxima/${quote.id}`} quote={quote.text} className='opacity-45 hover:opacity-100 duration-100 dark:invert-0 invert'>
                    <FacebookIcon size={25} bgStyle={{ fill: 'transparent' }} iconFillColor={'white'} />
                  </FacebookShareButton>
  
                  <TwitterShareButton url={`${url}/autor/${quote.author.split(' ').join('-').toLowerCase()}/maxima/${quote.id}`} title={quote.text} className='opacity-45 hover:opacity-100 duration-100 dark:invert-0 invert'>
                    <TwitterIcon size={25} bgStyle={{ fill: 'transparent' }} iconFillColor={'white'} />
                  </TwitterShareButton>
  
                  <WhatsappShareButton url={`${url}/autor/${quote.author.split(' ').join('-').toLowerCase()}/maxima/${quote.id}`} title={quote.text} className='opacity-45 hover:opacity-100 duration-100 dark:invert-0 invert'>
                    <WhatsappIcon size={25} bgStyle={{ fill: 'transparent' }} iconFillColor={'white'} />
                  </WhatsappShareButton>
  
                  <TelegramShareButton url={`${url}/autor/${quote.author.split(' ').join('-').toLowerCase()}/maxima/${quote.id}`} title={quote.text} className='opacity-45 hover:opacity-100 duration-100 dark:invert-0 invert'>
                    <TelegramIcon size={25} bgStyle={{ fill: 'transparent' }} iconFillColor={'white'} />
                  </TelegramShareButton>
  
                  <LinkedinShareButton url={`${url}/autor/${quote.author.split(' ').join('-').toLowerCase()}/maxima/${quote.id}`} title={quote.text} className='opacity-45 hover:opacity-100 duration-100 dark:invert-0 invert'>
                    <LinkedinIcon size={25} bgStyle={{ fill: 'transparent' }} iconFillColor={'white'} />
                  </LinkedinShareButton>
  
                  <RedditShareButton url={`${url}/autor/${quote.author.split(' ').join('-').toLowerCase()}/maxima/${quote.id}`} title={quote.text} className='opacity-45 hover:opacity-100 duration-100 dark:invert-0 invert'>
                    <RedditIcon size={25} bgStyle={{ fill: 'transparent' }} iconFillColor={'white'} />
                  </RedditShareButton>   
  
                  {!salvas[quote.id] && <button dangerouslySetInnerHTML={{__html:saveIcon}} title="salvar máxima" className='stroke-gray-500 hover:fill-gray-500 fill-none duration-100' onClick={()=> salvar(quote.id)}></button>}
                  {salvas[quote.id] && <button dangerouslySetInnerHTML={{__html:savedIcon}} title="remover dos salvos" className='stroke-gray-500 hover:fill-gray-500 fill-gray-500 duration-100' onClick={()=> salvar(quote.id)}></button>}       
                </div>
              </div>
              <br />
              <hr className='border-gray-400 dark:border-gray-600'/>
            </div>
        ))}
      </div>
      
      <div className='sm:w-[100px] w-[50px] h-[90%] mx-auto flex flex-col items-center fixed left-0 top-1/2 -translate-y-1/2'>
        {filteredQuotes.length > quotesPerPage &&
            <>
              <button className='text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 absolute -top-8 font-[900] font-["Poppins"] rotate-90'>&lt;</button>
              <Pagination totalQuotes={filteredQuotes.length} quotesPerPage={quotesPerPage} setPagina={setPagina} pagina={pagina} />
              <button className='text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 absolute -bottom-8 font-[900] font-["Poppins"] rotate-90'>&gt;</button>
            </>
        }
      </div>
    </div>
  )
};

export default Autor;
