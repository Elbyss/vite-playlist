import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CDPlayer = () => {
  const cdRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const rotationRef = useRef(null);

  useEffect(() => {
    rotationRef.current = gsap.to(cdRef.current, {
      rotation: 360,
      repeat: -1,
      duration: 3,
      ease: 'linear',
      paused: true,
    });
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      rotationRef.current.pause();
    } else {
      rotationRef.current.play();
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='cd-player p-8 bg-white rounded-lg shadow-xl'>
        <div className='cd-container w-64 h-64 bg-gray-800 rounded-full flex items-center justify-center mb-8'>
          <div ref={cdRef} className='cd w-56 h-56 bg-gray-600 rounded-full flex items-center justify-center'>
            <div className='cd-label w-20 h-20 bg-white rounded-full flex items-center justify-center'>
              <span className='text-2xl text-gray-800'>앨범명</span>
            </div>
          </div>
        </div>
        <div className='controls'>
          <button
            onClick={togglePlay}
            className='px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out'
          >
            {isPlaying ? '일시정지' : '재생'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CDPlayer;
