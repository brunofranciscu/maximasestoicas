import React, { useRef, forwardRef, useImperativeHandle } from 'react';

const Pagination = forwardRef(({totalQuotes, quotesPerPage, setPagina, pagina}, ref) => {
  const paginas = [];
  const divRef = useRef(null);

  for (let i = 1; i <= Math.ceil(totalQuotes / quotesPerPage); i++) paginas.push(i)

  useImperativeHandle(ref, () => ({
    scroll: (x, y) => divRef.current?.scrollTo(x, y)
  }))

  const scrollPagination = (d) => {
  if (divRef.current) {
    const currentScroll = divRef.current.scrollTop;
    const step = 200;

    divRef.current.scrollTo({
      top: d === "<" ? currentScroll - step : currentScroll + step,
      behavior: "smooth",
    });
  }
};
  const isLight = document.documentElement.classList.contains("light")
  
  return (
    <>
     <button className='text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 absolute -top-8 font-[900] font-["Poppins"] rotate-90 left-6' onClick={() =>scrollPagination('<')}>&lt;</button>

      <ol className='pagination w-auto items-end flex flex-col overflow-x-scroll [&:has(.active)_.active]:text-white [&:has(.mactive)_.active]:text-gray-900 [&:has(.mactive)_.active]:font-[700] scroll-smooth' ref={divRef}>
        {paginas.map(number => {
            const active = pagina === number
            const className = `px-2 py-2 text-gray-400 hover:text-gray-900 duration-100 dark:hover:text-gray-200 text-xs ${active ? "active" : ""}  ${active && isLight ? "mactive" : ""}`;
            return(
              <input type='button' key={number} onClick={() => setPagina(number)} className={className} value={number} placeholder={number} />
            )}
        )}
      </ol>

      <button className='text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 absolute -bottom-8 font-[900] font-["Poppins"] rotate-90 left-6' onClick={() => scrollPagination('>')}>&gt;</button>
    </>
  )
})

export default Pagination;
