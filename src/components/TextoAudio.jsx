import React, { useState, useRef, useEffect } from "react";
import { useTextToSpeech } from "../contexto/TTSContextProvider";
import AudioWaves from './AudioWaves.jsx';
import LoadSpin from "./LoadSpin.jsx";
import PlayIcon from './PlayIcon.jsx'
import PauseIcon from './PauseIcon.jsx'

const TextoAudio = ({ className, frase, autor}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const { convertTextToSpeech, setText, audioUrl, clearAudio  } = useTextToSpeech();
  const [isLoading, setIsLoading] = useState(false);
  const [userTriggered, setUserTriggered] = useState(false);

 useEffect(() => {
  setIsPlaying(false);
  setIsLoading(false);
  setUserTriggered(false);

  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.src = '';
    audioRef.current.load();
  }
  clearAudio();
  setText(frase);
}, [frase, setText]);


  useEffect(() => {
    if (audioRef.current && audioUrl && userTriggered) {
      setIsLoading(false);
      audioRef.current.src = audioUrl;
      audioRef.current.load();
      audioRef.current.onended = () => setIsPlaying(false);
      audioRef.current.play().then(() => setIsPlaying(true))
        .catch((err) => console.error("Erro ao tocar:", err));
    }
  }, [audioUrl, userTriggered]);

  const playTTS = async () => {
    setUserTriggered(true); 

    if (audioUrl) {
      audioRef.current.play().then(() => setIsPlaying(true));
    } else {
      setIsLoading(true);
      setTimeout(async () => await convertTextToSpeech(), 100);
    }
  };
  const pauseTTS = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

 return (
    <>
      <div className={`flex justify-center items-center w-full ${className}`}>
        <audio ref={audioRef} className="hidden" />

        {isLoading ? (
          <LoadSpin className="animate-spin rounded-full [&_svg]:h-10 [&_svg]:w-10 " />
          ) : !isPlaying ? (
          <button onClick={playTTS} title={`ouvir máxima de ${autor}`}>
            <PlayIcon  className="dark:text-gray-400 dark:hover:text-gray-100 text-gray-700 hover:text-gray-500 
                         [&_svg]:stroke-gray-500 dark:hover:[&_svg]:stroke-gray-200 hover:[&_svg]:stroke-gray-700 
                         duration-200 transition-all"/>
          </button>
          
        ) : (
          <button onClick={pauseTTS}>
            <PauseIcon  className="dark:text-gray-400 dark:hover:text-gray-100 text-gray-700 hover:text-gray-500 
                         [&_svg]:stroke-gray-500 dark:hover:[&_svg]:stroke-gray-200 hover:[&_svg]:stroke-gray-700 
                         duration-200 transition-all"/>
            
          </button>
        )}
      </div>
      <AudioWaves blob={audioUrl} audioRef={audioRef}/>
    </>

  );
};

export default TextoAudio;
