import React from 'react';
import { useParams } from 'react-router-dom';
import quotes from '../../assets/frases.json'
import { Link, useNavigate } from 'react-router-dom';

const Quotes = () => {
  const { id } = useParams();
  const quote = quotes.quotes.find(q => q.id === parseInt(id));
  const navigate = useNavigate()

  if (!quote) {
    return (<div className='h-[100dvh] w-full relative grid place-content-center bg-gray-200 dark:bg-gray-800 px-5'>
              <h3 className='font-["Poppins"] font-[500] sm:text-4xl text-2xl leading-10 max-w-[1300px] text-center text-balance text-gray-600 dark:text-gray-300'>Máxima não encontrado.</h3>
            </div>)
  }
  const shareUrl = window.location.origin.toString();

  return (
    <div className='h-[100dvh] w-full relative grid place-content-center bg-gray-200 dark:bg-gray-800 px-5'>
      <h1 className='font-["Poppins"] font-[500] sm:text-4xl text-2xl leading-10 max-w-[1300px] text-center text-balance text-gray-600 dark:text-gray-300'>"{quote.text}"</h1>
      <br />
      <h2 className='text-sm font-["Poppins"] sm:w-[200px] w-full text-center leading-none self-center text-gray-600 dark:text-gray-400 hover:text-gray-100 duration-100' title={`ver todas as maximas do ${quote.author}`}>
        <Link to={`${shareUrl}/author/${quote.author}`}>- {quote.author}</Link>
      </h2>
      <button onClick={() => navigate('/')} className='dark:text-gray-400 text-gray-900 font-["Poppins"] font-[300] hover:text-gray-400 duration-100 absolute bottom-2 left-3'>
        <span className='relative top-[1px]'>&lt;</span> voltar
      </button>
    </div>
  );
};

export default Quotes;
