import React, { createContext, useState, useContext } from 'react';

const TextToSpeechContext = createContext();


export const TTSContextProvider = ({ children }) => {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const subscriptionKey = import.meta.env.VITE_AZURE_SUBSCRIPTION_KEY;
  const region = import.meta.env.VITE_AZURE_REGION;
  const convertTextToSpeech = async () => {
  
    const endpoint = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;

    const ssml = `
      <speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang='pt-BR'>
        <voice name='pt-BR-MacerioMultilingualNeural'>
          <prosody rate='15%' pitch='-3%' contour="(60%,-60%) (100%,-10%)">
            ${text}
          </prosody>
        </voice>
      </speak>
    `;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ssml+xml',
          'X-Microsoft-OutputFormat': 'riff-44100hz-16bit-mono-pcm',
          'Ocp-Apim-Subscription-Key': subscriptionKey,
        },
        body: ssml,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
    } catch (error) {
      console.error('Erro ao converter texto em fala:', error);
    }
  };
  const clearAudio = () => setAudioUrl(null)

  return (
    <TextToSpeechContext.Provider value={{ convertTextToSpeech, setText, text, audioUrl, clearAudio }}>
      {children}
    </TextToSpeechContext.Provider>
  );
};

export const useTextToSpeech = () => useContext(TextToSpeechContext);
