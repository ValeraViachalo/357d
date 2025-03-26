import React, { useState, useRef, useEffect } from "react";
import "./VideoPlayer.scss";
import {
  motion,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import ReactPlayer from "react-player";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";

export const VideoPlayer = ({
  url,
  preview = false,
  customClass = "",
  children="",
  ...rest
}) => {
  const [muted, setMuted] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [played, setPlayed] = useState(0);
  const [volume, setVolume] = useState(1);

  const playerRef = useRef(null);
  const containerRef = useRef(null);

  const playedMotionValue = useMotionValue(0);
  const volumeMotionValue = useMotionValue(1);
  const clipPathDuration = useTransform(
    playedMotionValue,
    [0, 1],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );

  const { ref, inView } = useInView();

  useEffect(() => {
    if (!inView && isPlaying) {
      setIsPlaying(false);
    }
  }, [inView]);

  const handleProgress = (state) => {
    if (!seeking) {
      setPlayed(state.played);
      playedMotionValue.set(state.played);
    }
  };

  const handleMuted = () => {
    if (!muted) {
      setMuted(true);
      setVolume(0);
      volumeMotionValue.set(0);
    } else {
      setMuted(false);
      setVolume(1);
      volumeMotionValue.set(1);
    }
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setPlayed(newValue);
    playedMotionValue.set(newValue);
  };

  const handleSeekMouseUp = (e) => {
    setSeeking(false);
    playerRef.current.seekTo(parseFloat(e.target.value));
  };

  const handleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.mozRequestFullScreen) {
        containerRef.current.mozRequestFullScreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setPlayed(0);
  };

  return (
    <div
      className={`video-wrapper ${customClass}`}
      ref={containerRef}
      {...rest}
      onDoubleClick={() => handleFullscreen()}
    >
      <AnimatePresence>
        {!isPlaying && (played === 0 || played === 1) && preview && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0.25,
              },
            }}
            exit={{ opacity: 0 }}
            src={preview}
            alt="preview"
            className="video__preview"
          />
        )}
      </AnimatePresence>
      <ReactPlayer
        ref={playerRef}
        url={url}
        className="video"
        playing={isPlaying}
        volume={volume}
        muted={muted}
        onEnded={() => handleEnded()}
        playsinline={true}
        progressInterval={100}
        onProgress={handleProgress}
      />
        {children}
      <div
        className="video__play-btn-wrapper"
        onClick={() => setIsPlaying(!isPlaying)}
        ref={ref}
      >
        <div className={clsx("video__play-btn", {
            "video__play-btn--playing": isPlaying,
          })} />
      </div>
      <div
        className={clsx("video-controll", {
          "video-controll--not-playing": !isPlaying && !isFullscreen,
        })}
      >
        <div className="video-top">
          <div
            className="video__stop-button small-text upperCase bold"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? ("Pause") : ("Play")}
          </div>
          <div
            className="video__mute-button small-text upperCase bold"
            onClick={() => handleMuted()}
          >
            {!muted ? ("Sound on") : ("Sound off")}
          </div>
        </div>
        <div className="video-controll__center">
          <div className="video-thumb">
            <motion.span
              className="video__thumb-progress"
              style={{ clipPath: clipPathDuration }}
            />
            <input
              type="range"
              min={0}
              max={0.999999}
              step="any"
              value={played}
              onMouseDown={handleSeekMouseDown}
              onMouseUp={handleSeekMouseUp}
              onTouchStart={handleSeekMouseDown}
              onTouchEnd={handleSeekMouseUp}
              onChange={handleSeekChange}
              className="video__thumb-progress--seek"
            />
          </div>
          {/* <div className="video-volume">
            <div className="video-volume__button" onClick={() => handleMuted()}>
              {!muted ? (
                <svg
                  viewBox="0 0 45 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.1429 29.8044H1.40669C1.0339 29.8044 0.676623 29.6336 0.412153 29.3277C0.149099 29.0235 0 28.6087 0 28.1776V16.2515C0 15.8204 0.147705 15.4072 0.412153 15.1013C0.675208 14.7971 1.03393 14.6247 1.40669 14.6247H5.1429L15.4286 4H17.2967C17.6849 4 18 4.3644 18 4.81339V39.6152C18 40.0642 17.6849 40.4286 17.2967 40.4286H15.4286L5.1429 29.8044Z"
                    fill="white"
                  />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 45 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.1429 29.0841H1.40669C1.0339 29.0841 0.676623 28.9247 0.412153 28.6392C0.149099 28.3553 0 27.9681 0 27.5658V16.4347C0 16.0323 0.147705 15.6467 0.412153 15.3612C0.675208 15.0773 1.03393 14.9164 1.40669 14.9164H5.1429L15.4286 5H17.2967C17.6849 5 18 5.34011 18 5.75916V38.2408C18 38.6599 17.6849 39 17.2967 39H15.4286L5.1429 29.0841Z"
                    fill="white"
                  />
                  <rect
                    width="4.1431"
                    height="23.8228"
                    transform="matrix(0.705422 -0.708787 0.705422 0.708787 25.2715 15.1147)"
                    fill="white"
                  />
                  <rect
                    width="4.1431"
                    height="23.8228"
                    transform="matrix(0.705422 0.708787 -0.705422 0.708787 41.8047 12)"
                    fill="white"
                  />
                </svg>
              )}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
