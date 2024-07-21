import React from 'react';

const Pagination = ({ totalQuotes, quotesPerPage, setPagina, pagina }) => {
  const paginas = [];

  for (let i = 1; i <= Math.ceil(totalQuotes / quotesPerPage); i++) {
    paginas.push(i);
  }

  return (
    <div className='pagination w-[100px] flex flex-col overflow-x-scroll [&:has(.active)_.active]:text-gray-50 [&:has(.mactive)_.active]:text-gray-900 [&:has(.mactive)_.active]:font-[700]'>
      {paginas.map(number => (
        <button key={number} onClick={() => setPagina(number)} 
            className={`px-2 py-2 text-gray-400 hover:text-gray-900 duration-100 dark:hover:text-gray-200 text-xs ${pagina === number ? 'active' : ''} ${document.querySelector('html').className === 'light' && pagina === number ? 'mactive' : ''}`}>
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
