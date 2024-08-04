import { IoPauseCircleSharp, IoPlayCircle, IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from 'react-icons/io5';
import { PiShuffleBold } from 'react-icons/pi';
import { RiLoopLeftLine } from 'react-icons/ri';
import { playingState } from '../../atoms/playerState';
import { useRecoilState } from 'recoil';
import { PlayList } from '../../types/playList';

export default function Sidebar({ playlist }: { playlist: PlayList }) {
  const [isPlaying, setIsPlaying] = useRecoilState<boolean>(playingState);
  const handlePlaying = () => {
    console.log('handlePlaying');
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <div className='bg-indigo-950 text-white font-bold text-2xl rounded-[36px] flex-col gap-8 flex m-4'>
        <figure className='flex justify-center rounded-[36px] border border-opacity-50 border-gray-500 m-8'>
          <img
            src={`https://img.youtube.com/vi/${playlist.url?.split('v=')[1]}/0.jpg`}
            alt='album'
            className='w-[350px] h-[350px] rounded-[36px] object-cover'
          ></img>
        </figure>
        <div className='flex flex-col items-center gap-2'>
          <div>{playlist.title}</div>
          <div className='text-sm font-normal'>Tales</div>
          <div className='flex gap-8 py-8 items-center justify-around'>
            <button>
              <RiLoopLeftLine size={20} />
            </button>
            <button>
              <IoPlaySkipBackSharp size={30} />
            </button>
            <button onClick={handlePlaying} className='ease-in-out duration-300 '>
              {isPlaying === false ? (
                <IoPlayCircle
                  size={72}
                  className='hover:text-blue-300 border-4 ease-in-out duration-300 rounded-full'
                />
              ) : (
                <IoPauseCircleSharp
                  size={72}
                  className='hover:text-red-300 border-4 rounded-full ease-in-out duration-300'
                />
              )}
            </button>

            <button className=''>
              <IoPlaySkipForwardSharp size={30} />
            </button>
            <button>
              <PiShuffleBold size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
