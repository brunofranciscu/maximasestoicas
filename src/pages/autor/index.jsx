import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import quotes from '../../assets/frases.json';
import Pagination from '../../components/Pagination';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, TelegramShareButton, LinkedinShareButton, RedditShareButton, FacebookIcon, TwitterIcon, WhatsappIcon, TelegramIcon, LinkedinIcon, RedditIcon, } from 'react-share';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Favoritos from '../../components/Favoritos';
import SaveIcon from '../../components/SaveIcon';

const Autor = () => {
  const { author } = useParams();
  const [pagina, setPagina] = useState(1);
  const [quotesPerPage] = useState(15);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const navigate = useNavigate()
  const [salvas, setSalvas] = useState({});
  const [viewSaved, setViewSaved] = useState(false)

  useEffect(() => {
    const filtered = quotes.quotes.filter(quote => !quote.about && quote.author.split(' ').join('-') === author);
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

  const salvar = (id) => {
    setSalvas(prevSalvas => {
      const updtSalvas = { ...prevSalvas, [id]: !prevSalvas[id] };
      localStorage.setItem('salvas', JSON.stringify(updtSalvas));      
      return updtSalvas;
    });
  };
  const about = quotes.quotes.filter(item => item.about && item.author.split(' ').join('-') === author).map(item => item.about)

  return (
    <div className='w-full relative grid place-content-center bg-gray-200 dark:bg-gray-800 py-20 pl-10'>

        <Helmet>
          <title>Máximas do {author}</title>
        </Helmet>


      <div className='flex flex-col max-w-[1200px] w-full cl:px-16 px-4 mx-auto gap-5 relative' key={'title'}>

          <button onClick={() => navigate(-1)} className='dark:text-gray-400 text-gray-900 font-["Poppins"] font-[300] hover:text-gray-400 duration-100 absolute right-12'>
            <span className='relative top-[1px]'>&lt;</span> voltar
          </button>

          <div className='flex flex-col gap-5'>
            <h1 className='dark:text-gray-200 text-gray-600 sm:text-4xl text-xl font-["Poppins"] font-[500]'>{author.split('-').join(' ')}</h1>
            <span className='dark:text-gray-400 text-gray-900 font-["Poppins"] text-balance' dangerouslySetInnerHTML={{__html:about}}></span>
          </div>
           <hr className='w-full border-gray-500 my-12 block [-webkit-mask-image:linear-gradient(270deg,transparent,#fff,#fff,transparent)] [mask-image:linear-gradient(270deg,transparent,#fff,#fff,transparent)]'/>
           
          <Favoritos setViewSaved={setViewSaved} salvar={salvar} viewSaved={viewSaved} salvas={salvas} frases={quotes.quotes}/>

          {currentQuotes.map((quote, index) => (
            <div key={`${index}-${quote.id}`} className='py-5 quote [&:last-of-type_hr]:opacity-0'>
              <button onClick={() => navigate(`/autor/${author.split(' ').join('-').toLowerCase()}/maxima/${quote.id}`)} >
                <h2 className='dark:text-gray-300 text-gray-700 font-["Poppins"] font-[400] sm:text-2xl text-lg leading-none text-left hover:dark:text-gray-100 hover:text-gray-500 duration-100'>"{quote.text}"</h2>
              </button>
  
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
  
                  <SaveIcon 
                      title={`Salvar Máxima`} 
                      className={`[scale:.6] [&_*]:duration-100 ${!salvas[quote.id] ? '[&_path]:stroke-gray-500 hover:[&_path]:fill-gray-500 [&_path]:fill-none' : '[&_path]:stroke-gray-500 [&_path]:hover:fill-gray-500 [&_path]:fill-gray-500'}`} 
                      onClick={()=> salvar(quote.id)} 
                  />       
                </div>
              </div>
              <br />
              <hr className='border-gray-400 dark:border-gray-600'/>
            </div>
        ))}
      </div>
      
      <div className='w-[50px] h-[80%] mx-auto flex flex-col items-center fixed left-0 bottom-12 '>
        {filteredQuotes.length > quotesPerPage &&
          <Pagination totalQuotes={filteredQuotes.length} quotesPerPage={quotesPerPage} setPagina={setPagina} pagina={pagina}/>
        }
      </div>
    </div>
  )
};

export default Autor;
