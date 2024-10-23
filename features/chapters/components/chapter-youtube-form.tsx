'use client'

type YoutubeVideoProps = {
  videoUrl: string;
};

const ChapterYoutubeVideo = ({ videoUrl }: YoutubeVideoProps) => {
  // Extraer solo el ID del video de YouTube si se pasa una URL completa
  const videoId = videoUrl.split('v=')[1]?.split('&')[0];
  console.log(videoUrl);

  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        width="100%"
        src={"https://www.youtube.com/embed/" + videoId}
        title="YouTube video player"
      ></iframe>
    </div>
  );
};

export default ChapterYoutubeVideo;