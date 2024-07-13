import React from 'react';

const Pagination = ({ totalQuotes, quotesPerPage, setPagina, pagina }) => {
  const paginas = [];

  for (let i = 1; i <= Math.ceil(totalQuotes / quotesPerPage); i++) {
    paginas.push(i);
  }

  return (
    <div className='pagination mx-auto flex gap-2 overflow-x-scroll w-[1260px]'>
      {paginas.map(number => (
        <button key={number} onClick={() => setPagina(number)} className={`px-2 py-2 text-gray-500 hover:text-gray-100 duration-100 ${pagina === number ? 'active' : ''}`}>
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
