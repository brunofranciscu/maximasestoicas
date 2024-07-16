import React, { useState, useEffect } from 'react';

export default function TextoAudio ({ tocar, pausar, blob, progress, isEnded, playPause, setPlayPause }) {
  const pauseIcon = `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M8 5V19M16 5V19" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  const playIcon = `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" ><path d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z" stroke-width="2" stroke-linejoin="round"/></svg>`
  const hasVoice = `<svg width="16px" height="16px" viewBox="0 0 24 24" fill="none"><path d="M12 4L12 20" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 9L8 15" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 10L20 14" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 10L4 14" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 7L16 17" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  const loadSpin = `<svg width="20px" height="20px" viewBox="0 0 16 16" fill="none" class="hds-flight-icon--animation-loading"><g fill="#000000" fill-rule="evenodd" clip-rule="evenodd"><path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" opacity=".2"/><path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"/></g></svg>`
  
  const [loading, setLoading] = useState(false)
 
  return (
    <div className="max-w-[960px] mx-auto flex flex-col -translate-y-6 h-8">

        {playPause && !blob && (
          <button onClick={() => { progress(), setLoading(true), setPlayPause(true) }} 
              dangerouslySetInnerHTML={{__html: loading ? loadSpin : hasVoice  + ' clique para ouvir' }}
              className={`${loading ? 'animate-spin' : ''} dark:text-gray-400 dark:hover:text-gray-100 text-gray-700 hover:text-gray-500 flex items-center gap-2 [&_svg]:stroke-gray-500 hover:[&_svg]:stroke-gray-100 duration-200 transition-all`}>
          </button>
        )}

      <div className="flex justify-between">
        {playPause && blob && (
          <button onClick={() => {tocar(), setPlayPause(false)}} 
                className="dark:text-gray-400 dark:hover:text-gray-100 text-gray-700 hover:text-gray-500 [&_svg]:stroke-gray-500 hover:[&_svg]:stroke-gray-100 duration-200 transition-all"
                dangerouslySetInnerHTML={{ __html: playIcon }}>
          </button>
        )}

        {!playPause && isEnded && (
          <button onClick={() =>{ pausar(), setPlayPause(true) }} 
                className="dark:text-gray-400 dark:hover:text-gray-100 text-gray-700 hover:text-gray-500 [&_svg]:stroke-gray-500 hover:[&_svg]:stroke-gray-100 duration-200 transition-all"
                dangerouslySetInnerHTML={{ __html: pauseIcon }}>
          </button>
        )}
      </div>
    </div>
  );
};
