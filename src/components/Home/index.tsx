import ReactPlayer from 'react-player';
import Sidebar from './Sidebar';
import { useRecoilState } from 'recoil';
import { playedState, playingState } from '../../atoms/playerState';
import { useRef, useState } from 'react';
import { PlayList } from '../../types/playList';
import { toast } from 'sonner';

export default function Home() {
  const playlist: PlayList[] = [
    {
      id: 1,
      title: '탄지로의 노래 (악기)',
      author: 'LAYERS CLASSIC',
      url: 'https://www.youtube.com/watch?v=wGz8dTN8Yzg',
    },
    {
      id: 2,
      title: '칼의 춤 & 백귀 (Rock Ver.)',
      author: '박태준만화회사',
      url: 'https://www.youtube.com/watch?v=CsudvW1MkWw',
    },
    { id: 3, title: 'Never Ending Story', author: '부활', url: 'https://www.youtube.com/watch?v=VWqcR2cSBnk' },
    {
      id: 4,
      title: '그럴때마다',
      author: '백예린',
      url: 'https://www.youtube.com/watch?v=aIsQ-3plgLY',
    },
    {
      id: 5,
      title: '비의 랩소디',
      author: '임재현',
      url: 'https://www.youtube.com/watch?v=OL2f3vzgE7M',
    },
  ];
  const [currentVideo, setCurrentVideo] = useState(playlist[0]);
  const [isPlaying, setIsPlaying] = useRecoilState<boolean>(playingState);
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const [, setPlayed] = useRecoilState<number>(playedState);
  const playerRef = useRef<null>(null);

  const handleVideoSelect = (video: PlayList) => {
    setCurrentVideo(video);
    setIsPlaying(true);
  };

  const handleNextTrack = () => {
    setCurrentTrack((prevTrack) => (prevTrack + 1) % playlist.length);
    setCurrentVideo(playlist[(currentTrack + 1) % playlist.length]);
    setIsPlaying(true);
  };

  const handlePrevTrack = () => {
    setCurrentTrack((prevTrack) => {
      if (prevTrack === 0) {
        toast.error('이전 트랙이 존재하지 않습니다.');
        return prevTrack;
      } else {
        return (prevTrack - 1) % playlist.length;
      }
    });
    if (currentTrack > 0) {
      setCurrentVideo(playlist[(currentTrack - 1) % playlist.length]);
      setIsPlaying(true);
    }
  };

  const playlistStyle = `flex gap-8 mx-auto justify-center border p-8 items-center text-xl`;
  const playTitleStyle = `font-bold flex flex-col gap-4 p-4 items-center hover:scale-105 transition-all w-[500px] white-space cursor-pointer active:text-slate-600 md:text-xs`;

  return (
    <>
      <div className='flex min-h-screen md:flex-col'>
        <div className='bg-gradient-to-b from-indigo-300 to-indigo-950 max-w-[450px] md:max-w-full'>
          <Sidebar
            playlist={currentVideo}
            playerRef={playerRef}
            handleNextTrack={handleNextTrack}
            handlePrevTrack={handlePrevTrack}
          />
        </div>
        <div className='flex-1'>
          {/* <h1 className='text-4xl text-indigo-600 font-bold'>Home</h1> */}
          <section className='text-4xl'>
            {/* <figure className='flex justify-center mx-auto rounded-[48px] shadow-lg shadow-purple-200'>
              <img src='greg-rakozy-0LU4vO5iFpM-unsplash.jpg' alt='home_title' className='rounded-[inherit]' />
            </figure> */}
            <ReactPlayer
              className='react-player hidden'
              style={{ position: 'absolute', bottom: 0 }}
              url={currentVideo.url}
              playing={isPlaying}
              controls={true}
              onDuration={(a) => console.log(a)} // 재생시간
              onProgress={({ played }) => setPlayed(played)}
              onPause={() => {
                setIsPlaying(false);
              }}
              onEnded={handleNextTrack}
              ref={playerRef}
            />
          </section>
          <ul className=''>
            {playlist.map((video) => (
              <li className={playlistStyle} key={video.id}>
                <figure className='rounded-lg border shadow-md p-1'>
                  <img
                    src={`https://img.youtube.com/vi/${video.url?.split('v=')[1]}/0.jpg`}
                    alt='title_image'
                    className='object-cover w-32 h-32 sm:w-[250px] sm:h-auto'
                  />
                </figure>
                <div className=''>{video.id}</div>
                <div
                  className={playTitleStyle}
                  onClick={() => {
                    handleVideoSelect(video);
                  }}
                >
                  {video.title}
                  <div className='text-sm font-normal text-gray-500'>{video.author}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
