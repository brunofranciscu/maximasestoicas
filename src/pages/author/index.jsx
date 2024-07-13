import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import quotes from '../../assets/frases.json';
import Pagination from '../../Pagination';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, TelegramShareButton, LinkedinShareButton, RedditShareButton, FacebookIcon, TwitterIcon, WhatsappIcon, TelegramIcon, LinkedinIcon, RedditIcon, } from 'react-share';
import { useNavigate } from 'react-router-dom';

const Author = () => {
  const { author } = useParams();
  const [pagina, setPagina] = useState(1);
  const [quotesPerPage] = useState(15);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const filtered = quotes.quotes.filter(quote => quote.author === author);
    setFilteredQuotes(filtered);
  }, [author]);

  const lastQuoteIndex = pagina * quotesPerPage;
  const firstQuoteIndex = lastQuoteIndex - quotesPerPage;
  const currentQuotes = filteredQuotes.slice(firstQuoteIndex, lastQuoteIndex);

  const shareUrl = window.location.origin.toString()

  return (
    <div className='w-full relative grid place-content-center bg-gray-200 dark:bg-gray-800 py-20' style={{height:filteredQuotes.length < quotesPerPage ? '100dvh' : '100%'}}>
      <div className='flex flex-col max-w-[1200px] w-full px-16 mx-auto gap-5 '>

        <div className='flex justify-between'>
          <button onClick={() => navigate(-1)} className='dark:text-gray-400 text-gray-900 font-["Poppins"] font-[300] hover:text-gray-400 duration-100'><span className='relative top-[1px]'>&lt;</span> voltar</button>
          <h1 className='dark:text-gray-200 text-gray-600 sm:text-4xl text-xl font-["Poppins"] font-[500]'>{author}</h1>
        </div>


        {currentQuotes.map((quote, index) => (
          <div key={`${index}-${quote.id}`} className='py-5 quote [&:last-of-type_hr]:opacity-0'>
            <h1 className='dark:text-gray-300 text-gray-700 font-["Poppins"] font-[400] sm:text-2xl text-lg leading-none'>"{quote.text}"</h1>

            <div className='flex justify-between pt-5'>
              <h2 className='dark:text-gray-300 text-gray-700 font-["Poppins"] font-[200]'>- {quote.author}</h2> 
              
              <div className='flex'>
                <FacebookShareButton url={`${shareUrl}/quotes/${quote.id}`} quote={quote.text} className='opacity-45 hover:opacity-100 duration-100 dark:invert-0 invert'>
                  <FacebookIcon size={25} bgStyle={{ fill: 'transparent' }} iconFillColor={'white'} />
                </FacebookShareButton>

                <TwitterShareButton url={`${shareUrl}/quotes/${quote.id}`} title={quote.text} className='opacity-45 hover:opacity-100 duration-100 dark:invert-0 invert'>
                  <TwitterIcon size={25} bgStyle={{ fill: 'transparent' }} iconFillColor={'white'} />
                </TwitterShareButton>

                <WhatsappShareButton url={`${shareUrl}/quotes/${quote.id}`} title={quote.text} className='opacity-45 hover:opacity-100 duration-100 dark:invert-0 invert'>
                  <WhatsappIcon size={25} bgStyle={{ fill: 'transparent' }} iconFillColor={'white'} />
                </WhatsappShareButton>

                <TelegramShareButton url={`${shareUrl}/quotes/${quote.id}`} title={quote.text} className='opacity-45 hover:opacity-100 duration-100 dark:invert-0 invert'>
                  <TelegramIcon size={25} bgStyle={{ fill: 'transparent' }} iconFillColor={'white'} />
                </TelegramShareButton>

                <LinkedinShareButton url={`${shareUrl}/quotes/${quote.id}`} title={quote.text} className='opacity-45 hover:opacity-100 duration-100 dark:invert-0 invert'>
                  <LinkedinIcon size={25} bgStyle={{ fill: 'transparent' }} iconFillColor={'white'} />
                </LinkedinShareButton>

                <RedditShareButton url={`${shareUrl}/quotes/${quote.id}`} title={quote.text} className='opacity-45 hover:opacity-100 duration-100 dark:invert-0 invert'>
                  <RedditIcon size={25} bgStyle={{ fill: 'transparent' }} iconFillColor={'white'} />
                </RedditShareButton>          
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
  );
};

export default Author;
