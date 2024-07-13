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
    <div className='h-full w-full relative grid place-content-center bg-gray-300 dark:bg-gray-800 py-20'>
      <div className='flex flex-col w-[1200px] mx-auto gap-5'>

        <div className='flex justify-between'>
          <button onClick={() => navigate(-1)} className='dark:text-gray-400 text-gray-900 font-["Poppins"] font-extrabold hover:text-gray-200'>🡄</button>
          <h1 className='dark:text-gray-200 text-gray-900 text-4xl font-["Poppins"] font-[700]'>{author}</h1>
        </div>


        {currentQuotes.map((quote, index) => (
          <div key={`${index}-${quote.id}`} className='py-5'>
            <h1 className='dark:text-gray-300 text-gray-700 font-["Poppins"] font-[600] text-2xl leading-none'>"{quote.text}"</h1>

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
            <hr className='border-gray-600'/>
          </div>
        ))}
      </div>
      
      <div className='w-[85%] mx-auto relative flex items-center'>
        <button className='text-gray-400 hover:text-gray-100 absolute -left-10'>⯇</button>
        <Pagination
              totalQuotes={filteredQuotes.length}
              quotesPerPage={quotesPerPage}
              setPagina={setPagina}
              pagina={pagina}
        />
        <button className='text-gray-400 hover:text-gray-100 absolute -right-10'>⯈</button>

      </div>
    </div>
  );
};

export default Author;
