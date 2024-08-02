import ReactPlayer from 'react-player';
import Sidebar from './Sidebar';
import { useRecoilState } from 'recoil';
import { playingState } from '../../atoms/playerState';
import { useState } from 'react';
import { PlayList } from '../../types/playList';

export default function Home() {
  const playlist: PlayList[] = [
    { id: 1, title: '귀멸의 칼날', url: 'https://www.youtube.com/watch?v=wGz8dTN8Yzg' },
    { id: 2, title: '외모지상주의 BGM ', url: 'https://www.youtube.com/watch?v=CsudvW1MkWw' },
    { id: 3, title: '외지주 성요한', url: 'https://www.youtube.com/watch?v=zkMkjwdwmi0' },
  ];
  const [currentVideo, setCurrentVideo] = useState(playlist[0]);
  const [isPlaying, setIsPlaying] = useRecoilState<boolean>(playingState);
  const [currentTrack, setCurrentTrack] = useState<number>(0);

  const handleVideoSelect = (video: PlayList) => {
    setCurrentVideo(video);
    setIsPlaying(true);
  };

  const handleNextTrack = () => {
    setCurrentTrack((prevTrack) => (prevTrack + 1) % playlist.length);
    setCurrentVideo(playlist[(currentTrack + 1) % playlist.length]);
    setIsPlaying(true);
  };

  const playlistStyle = `flex gap-8 mx-auto justify-center border p-8 items-center text-xl`;
  const playTitleStyle = `flex-[0.5] font-bold flex gap-4 p-4 items-center hover:scale-105 transition-all cursor-pointer active:text-slate-600`;

  return (
    <>
      <div className='flex min-h-screen'>
        <div className='bg-gradient-to-b from-indigo-300 to-indigo-950 max-w-[450px]'>
          <Sidebar playlist={currentVideo} />
        </div>
        <div className='flex-1'>
          {/* <h1 className='text-4xl text-indigo-600 font-bold'>Home</h1> */}
          <section className='text-4xl'>
            {/* <figure className='flex justify-center mx-auto rounded-[48px] shadow-lg shadow-purple-200'>
              <img src='greg-rakozy-0LU4vO5iFpM-unsplash.jpg' alt='home_title' className='rounded-[inherit]' />
            </figure> */}
            <ReactPlayer
              className='react-player'
              width='100%'
              height='300px' // 재생바만 표시하도록 높이를 설정
              style={{ position: 'absolute', bottom: 0 }}
              url={currentVideo.url}
              playing={isPlaying}
              controls={true}
              onDuration={(a) => console.log(a)} // 재생시간
              onProgress={(a) => console.log(a)}
              onPause={() => {
                setIsPlaying(false);
              }}
              onEnded={handleNextTrack}
              poster={'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'}
            />
          </section>
          <ul className=''>
            {playlist.map((video) => (
              <li className={playlistStyle} key={video.id}>
                <figure className='rounded-lg border shadow-md p-1'>
                  <img
                    src={`https://img.youtube.com/vi/${video.url?.split('v=')[1]}/0.jpg`}
                    alt='title_image'
                    className='object-cover w-32 h-32'
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
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
