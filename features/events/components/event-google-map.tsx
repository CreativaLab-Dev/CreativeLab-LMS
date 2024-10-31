'use client'

import { useEffect, useState } from "react";

interface EventGoogleMapProps {
  url: string;
}

const EventGoogleMap = ({
  url
}: EventGoogleMapProps) => {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() =>
    setIsMounted(true)
    , []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="mt-4">
      <iframe src={url}
        width="100%"
        height="450"
        loading="lazy"></iframe>
    </div>
  );
}

export default EventGoogleMap;