import React, { useEffect, useRef } from "react";

interface Props {
  url: string;
  back: string;
  id: number;
}

const TikTokVideo: React.FC<Props> = ({ url, id, back }) => {
  const tiktokEmbedUrl = `https://www.tiktok.com/embed/v2/${getTikTokVideoId(
    url + back
  )}`;

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1, // Tùy chỉnh ngưỡng hiển thị của Intersection Observer
    };

    const observerCallback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && iframeRef.current) {
          // Nếu <iframe> nằm trong vùng nhìn thấy
          // Bạn có thể tải nội dung của <iframe> tại đây
          iframeRef.current.src = tiktokEmbedUrl;
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }

    return () => {
      if (iframeRef.current) {
        observer.unobserve(iframeRef.current);
      }
    };
  }, [tiktokEmbedUrl]);

  return (
    <iframe
      key={id}
      title="TikTok video"
      ref={iframeRef}
      frameBorder="0"
      allowFullScreen
      scrolling="no"
      className="tiktok-video"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    ></iframe>
  );
};

function getTikTokVideoId(url: string) {
  const regex = /(?:\/video\/|tiktok.com\/@[\w.]+\/video\/)([\d]+)/;
  const match = url.match(regex);
  if (match) {
    return match[1];
  } else {
    throw new Error("Invalid TikTok video URL");
  }
}

export default TikTokVideo;
