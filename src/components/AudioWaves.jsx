import AudioSpectrum from 'react-audio-spectrum';
import { useEffect } from 'react';

export default function AudioWaves ({ blob, audioRef}) {
      
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.onended = () => {
          };
        }
    }, [blob]);

  return (
        blob && (<>
            <audio src={blob} id="audio-element" ref={audioRef}></audio>
              <div className="audio absolute bottom-0 w-screen h-dvh left-0 pointer-events-none z-50 [filter:drop-shadow(0_0_30px_#e5e7eb66)]  opacity-[.2] mix-blend-hard-light 
                              [&_canvas]:mx-auto 
                              [&_canvas]:absolute
                              [&_canvas]:!-translate-x-1/2
                              [&_canvas]:!left-1/2
                              [&_canvas]:bottom-0
                              [&_canvas]:w-full
                              [&_canvas]:h-full
                              [&>canvas]:invert 
                              [&>canvas]:dark:invert-0">
                <AudioSpectrum
                  audioId={'audio-element'} id="audio-canvas"
                  meterWidth={window.innerWidth < 769 ? 10 : 1} meterCount={512} capHeight={0} capColor="transparent" height={400}
                  meterColor={[
                    { stop: 0, color: '#fff' },
                    { stop: 0.5, color: '#fff' },
                    { stop: 1, color: '#fff' }
                  ]}
                  gap={2}
                />
              </div>
        </>)
  );
};
