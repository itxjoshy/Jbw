import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  HelpCircle,
  SkipForward,
  PictureInPicture2,
  ListVideo,
  Captions,
  Maximize,
  Minimize,
} from "lucide-react";

function formatTime(seconds) {
  if (!isFinite(seconds)) return "0:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(h ? 2 : 1, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return h ? `${h}:${m}:${s}` : `${m}:${s}`;
}

function VideoPlayer({ src, title, episodeLabel, onClose, onBack }) {
  const videoRef = useRef(null);
  const hideTimeout = useRef(null);

  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);

  useEffect(() => {
    videoRef.current?.play().catch(() => setPlaying(false));
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () =>
      setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "ArrowRight") {
        skip(10);
      } else if (e.code === "ArrowLeft") {
        skip(-10);
      } else if (e.code === "KeyM") {
        toggleMute();
      } else if (e.code === "KeyF") {
        toggleFullscreen();
      } else if (e.code === "Escape") {
        onClose?.();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const skip = (seconds) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(
      Math.max(video.currentTime + seconds, 0),
      duration,
    );
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video) return;
    const newTime = Number(e.target.value);
    video.currentTime = newTime;
    setProgress(newTime);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const container = videoRef.current?.parentElement;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const togglePip = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await video.requestPictureInPicture();
      }
    } catch {
      // PiP unsupported in this browser — silently ignore
    }
  };

  const showControls = () => {
    setControlsVisible(true);
    clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => {
      if (playing) setControlsVisible(false);
    }, 3000);
  };

  return (
    <div
      className="video-player-overlay"
      onMouseMove={showControls}
      onMouseLeave={() => playing && setControlsVisible(false)}
    >
      <video
        ref={videoRef}
        className="video-player-el"
        src={src}
        onClick={togglePlay}
        onTimeUpdate={(e) => setProgress(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onEnded={() => setPlaying(false)}
        autoPlay
      />

      <div className={`video-controls ${controlsVisible ? "visible" : ""}`}>
        <div className="video-controls-top">
          <button
            className="video-back-btn"
            onClick={onBack ?? onClose}
            aria-label="Back"
          >
            <ArrowLeft size={26} />
          </button>
        </div>

        <div className="video-controls-bottom">
          <div className="video-seek-row">
            <input
              type="range"
              className="video-seek"
              min={0}
              max={duration || 0}
              value={progress}
              onChange={handleSeek}
            />
            <span className="video-time">
              {formatTime(duration - progress)}
            </span>
          </div>

          <div className="video-controls-row">
            <div className="video-controls-left">
              <button
                onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? (
                  <Pause size={22} fill="currentColor" />
                ) : (
                  <Play size={22} fill="currentColor" />
                )}
              </button>
              <button
                className="video-skip-btn"
                onClick={() => skip(-10)}
                aria-label="Rewind 10 seconds"
              >
                <RotateCcw size={24} />
                <span>10</span>
              </button>
              <button
                className="video-skip-btn"
                onClick={() => skip(10)}
                aria-label="Forward 10 seconds"
              >
                <RotateCw size={24} />
                <span>10</span>
              </button>
              <button
                onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted ? <VolumeX size={22} /> : <Volume2 size={22} />}
              </button>

              <div className="video-now-playing">
                <strong>{title}</strong>
                {episodeLabel && <span>{episodeLabel}</span>}
              </div>
            </div>

            <div className="video-controls-right">
              <button aria-label="Help">
                <HelpCircle size={22} />
              </button>
              <button aria-label="Next episode">
                <SkipForward size={22} fill="currentColor" />
              </button>
              <button onClick={togglePip} aria-label="Picture in picture">
                <PictureInPicture2 size={22} />
              </button>
              <button aria-label="Episodes">
                <ListVideo size={22} />
              </button>
              <button aria-label="Audio & Subtitles">
                <Captions size={22} />
              </button>
              <button onClick={toggleFullscreen} aria-label="Fullscreen">
                {isFullscreen ? <Minimize size={22} /> : <Maximize size={22} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
