'use client'

import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player'

type YoutubeVideoProps = {
  videoUrl: string;
  canOnPlay: () => void;
  onEnded: () => void;
};

const ChapterYoutubeVideo = ({
  videoUrl,
  canOnPlay,
  onEnded
}: YoutubeVideoProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    canOnPlay()
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <ReactPlayer
        url={videoUrl}
        width='100%'
        height='80vh'
        className='bg-dark overflow-hidden'
        controls={true}
        onEnded={onEnded}
      />
    </div>

  );
};

export default ChapterYoutubeVideo;