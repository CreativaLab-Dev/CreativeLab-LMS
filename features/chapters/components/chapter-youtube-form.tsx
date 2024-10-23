'use client'

import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player'

type YoutubeVideoProps = {
  videoUrl: string;
};

const ChapterYoutubeVideo = ({ videoUrl }: YoutubeVideoProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <ReactPlayer
        url={videoUrl ? videoUrl : 'https://www.youtube.com/watch?v=wWgIAphfn2U'}
        width='100%'
        height='50vh'
        className='bg-dark overflow-hidden'
        controls={true}
      />
    </div>

  );
};

export default ChapterYoutubeVideo;