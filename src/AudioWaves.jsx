import AudioSpectrum from 'react-audio-spectrum';


export default function AudioWaves ({ blob }) {
  return (
    <>
        {blob && 
        
        <>
            <audio src={blob} id="audio-element"></audio>
              <div className="absolute top-0 w-full left-0 pointer-events-none z-50 [&>canvas]:w-full [&>canvas]:h-[100dvh] [filter:drop-shadow(0_0_30px_#e5e7eb66)] opacity-45 mix-blend-hard-light">
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
    </>
  );
};
