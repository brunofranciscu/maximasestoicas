import React, { useEffect, useState, useRef } from 'react';
import quotes from '../../assets/frases.json'
import { Link, useNavigate, useParams } from 'react-router-dom';
import TextoAudio from './../../TextoAudio.jsx'
import AudioSpectrum from 'react-audio-spectrum';


export default function Quotes() {
  const { id } = useParams();
  const quote = quotes.quotes.find(q => q.id === Number(id));
  const navigate = useNavigate()
  const [blob, setBlob] = useState(null)
  const api1 = '2167e436442c988625c4a5cd6548befc';
  const [isEnded, setIsEnded] = useState(false);
  const [playPause, setPlayPause] = useState(true);
  const [textou, setTextou] = useState(false)
  const audioRef = useRef(null);

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
  useEffect(() => {
      if (audioRef.current) {
          audioRef.current.onended = () => {
          setIsEnded(true);
          setPlayPause(true);
          };
      }
  }, [blob, setIsEnded]);

  const settings = {
    method: 'POST',
    headers: { "Accept": "audio/mpeg", "Content-Type": "application/json", "xi-api-key": api1 },
    body: JSON.stringify({
      "text": quote.text,
      "model_id": "eleven_multilingual_v1",
      "voice_settings": {
        "stability": 0.5,
        "similarity_boost": 0.5
      }
    })
  };
  const progress = async () => {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB`, settings);
    const result = await response.blob();
    setBlob(URL.createObjectURL(result));
    setIsEnded(false)
  };

  const tocar = () => {
    if (!textou) {
      setTextou(true);
      setTimeout(()=>{document.querySelector('audio').play()},300)      
    } else {
      document.querySelector('audio').play();
    }
  };

  const pausar = () => document.querySelector('audio').pause()
  const shareUrl = window.location.origin.toString();




  
  return (
    <div className='h-[100dvh] w-full relative grid place-content-center bg-gray-200 dark:bg-gray-800 px-5'>
      
      <h1 className='font-["Poppins"] font-[500] sm:text-4xl text-2xl leading-10 max-w-[1300px] text-center text-balance text-gray-600 dark:text-gray-300'>"{quote.text}"</h1>
      
      
      <div className="flex py-5 justify-between flex-col md:flex-row items-center gap-5">
        <h2 className='text-sm font-["Poppins"] sm:w-[200px] w-full text-center leading-none self-center text-gray-600 dark:text-gray-400 hover:font-bold duration-100' title={`ver todas as maximas do ${quote.author}`}>
          <Link to={`${shareUrl}/author/${quote.author}`}>- {quote.author}</Link>
        </h2>
        <TextoAudio  setBlob={setBlob} tocar={tocar} pausar={pausar} progress={progress} blob={blob} isEnded={isEnded} setPlayPause={setPlayPause} playPause={playPause} />
      </div>

      <button onClick={() => navigate('/')} className='dark:text-gray-400 text-gray-900 font-["Poppins"] font-[300] hover:text-gray-400 duration-100 absolute bottom-2 left-3'>
        <span className='relative top-[1px]'>&lt;</span> voltar
      </button>

      {blob && 
          <>
            <audio src={blob} id="audio-element" ref={audioRef}></audio>
              <div className="absolute top-0 w-full left-0 pointer-events-none z-50 [&>canvas]:w-full [&>canvas]:h-[100dvh] [filter:drop-shadow(0_0_30px_#e5e7eb66)] opacity-[.2] mix-blend-hard-light [&>canvas]:invert [&>canvas]:dark:invert-0">
                <AudioSpectrum
                  audioId={'audio-element'} id="audio-canvas"
                  meterWidth={1} meterCount={512} capHeight={0} capColor="transparent" height={400} width={1000}
                  meterColor={[
                    { stop: 0, color: '#fff' },
                    { stop: 0.5, color: '#fff' },
                    { stop: 1, color: '#fff' }
                  ]}
                  gap={4}
                />
              </div>
          </>
      }
    </div>
  );
};
