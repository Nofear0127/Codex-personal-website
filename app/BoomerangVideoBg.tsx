"use client";

import { useEffect, useRef, useState } from "react";

type Props = { src: string; className?: string };

export default function BoomerangVideoBg({ src, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLCanvasElement[]>([]);
  const [framesReady, setFramesReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const frames: HTMLCanvasElement[] = [];
    let capturing = true;
    let lastTime = -1;
    const maxWidth = 960;

    const captureFrame = () => {
      if (!capturing || video.readyState < 2 || video.currentTime === lastTime) return;
      lastTime = video.currentTime;
      const { videoWidth: vw, videoHeight: vh } = video;
      if (!vw || !vh) return;
      const scale = Math.min(1, maxWidth / vw);
      const frame = document.createElement("canvas");
      frame.width = Math.round(vw * scale);
      frame.height = Math.round(vh * scale);
      frame.getContext("2d")?.drawImage(video, 0, 0, frame.width, frame.height);
      frames.push(frame);
    };

    type FrameVideo = HTMLVideoElement & { requestVideoFrameCallback?: (callback: () => void) => number };
    const frameVideo = video as FrameVideo;
    let rafId = 0;
    const rafLoop = () => { captureFrame(); if (capturing) rafId = requestAnimationFrame(rafLoop); };
    const vfcLoop = () => { captureFrame(); if (capturing) frameVideo.requestVideoFrameCallback?.(vfcLoop); };
    const onEnded = () => {
      capturing = false;
      if (frames.length) { framesRef.current = frames; setFramesReady(true); }
    };
    const onLoaded = () => {
      video.play().catch(() => undefined);
      if (frameVideo.requestVideoFrameCallback) frameVideo.requestVideoFrameCallback(vfcLoop);
      else rafId = requestAnimationFrame(rafLoop);
    };

    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("ended", onEnded);
    if (video.readyState >= 1) onLoaded();
    return () => {
      capturing = false;
      cancelAnimationFrame(rafId);
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("ended", onEnded);
    };
  }, [src]);

  useEffect(() => {
    if (!framesReady) return;
    const canvas = displayCanvasRef.current;
    const frames = framesRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || !frames.length) return;
    canvas.width = frames[0].width;
    canvas.height = frames[0].height;
    let index = 0, direction = 1, last = performance.now(), rafId = 0;
    const render = (now: number) => {
      if (now - last >= 1000 / 30) {
        last = now;
        context.drawImage(frames[index], 0, 0);
        index += direction;
        if (index >= frames.length - 1) { index = frames.length - 1; direction = -1; }
        else if (index <= 0) { index = 0; direction = 1; }
      }
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, [framesReady]);

  return <div className={className ?? "absolute inset-0 h-full w-full"}>
    <video ref={videoRef} src={src} className="h-full w-full object-cover" style={{ display: framesReady ? "none" : "block" }} muted playsInline preload="auto" crossOrigin="anonymous" />
    <canvas ref={displayCanvasRef} className="h-full w-full object-cover" style={{ display: framesReady ? "block" : "none" }} />
  </div>;
}
