import { useContext, useEffect, useRef, useState } from "react";
import { Mygarage } from "../Context/AuthContext";
import {
  FaPlay, FaPause, FaStepBackward, FaStepForward,
  FaRandom, FaRedo, FaVolumeUp, FaVolumeMute, FaList, FaHeart,
  FaChevronUp,
} from "react-icons/fa";
import { MdRepeatOne, MdPictureInPicture } from "react-icons/md";
import NowPlayingPanel from "./NowPlayingPanel";

const AudioPlayer = () => {
  const {
    songs, queue, isPlaying, setIsPlaying,
    currentSongIndex, setCurrentSongIndex,
    shuffle, setShuffle, repeat, setRepeat,
    volume, setVolume, audioRef,
    handleNext, handlePrev,
    likedSongs, toggleLike, darkMode,
  } = useContext(Mygarage);

  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [showQueue, setShowQueue] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [muted, setMuted] = useState(false);

  const currentSong = songs[currentSongIndex] || null;
  const liked = likedSongs.some((s) => s.id === currentSong?.id);

  useEffect(() => {
    const audio = audioRef.current;
    const onTimeUpdate = () => {
      if (!audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
      setCurrentTime(fmt(audio.currentTime));
    };
    const onMeta = () => setDuration(fmt(audio.duration));
    const onEnded = () => handleNext();
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnded);
    };
  }, [currentSongIndex, songs, handleNext]);

  // Hide panel if nothing playing
  useEffect(() => { if (!currentSong) setShowPanel(false); }, [currentSong]);

  function fmt(secs) {
    if (isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function handleSeek(e) {
    const audio = audioRef.current;
    audio.currentTime = (e.target.value / 100) * audio.duration;
    setProgress(e.target.value);
  }

  function handleVolume(e) {
    const v = Number(e.target.value);
    setVolume(v);
    audioRef.current.volume = v / 100;
    setMuted(v === 0);
  }

  function toggleMute() {
    const next = !muted;
    setMuted(next);
    audioRef.current.muted = next;
  }

  function cycleRepeat() {
    setRepeat((r) => (r === "off" ? "all" : r === "all" ? "one" : "off"));
  }

  if (!currentSong) return null;

  const RepeatIcon = repeat === "one" ? MdRepeatOne : FaRedo;
  const thumb = currentSong?.songThumbnail || currentSong?.poster || "https://placehold.co/48x48/111827/9ca3af?text=♪";

  return (
    <>
      {/* Now Playing Panel */}
      {showPanel && <NowPlayingPanel onClose={() => setShowPanel(false)} />}

      {/* Queue Panel */}
      {showQueue && (
        <div className="fixed bottom-[82px] right-4 w-72 rounded-2xl shadow-2xl z-50 overflow-hidden border border-white/10"
          style={{ background: "rgba(17,24,39,0.97)", backdropFilter: "blur(16px)" }}>
          <div className="p-3 border-b border-white/10 flex justify-between items-center">
            <span className="text-white font-semibold text-sm">Up Next</span>
            <button onClick={() => setShowQueue(false)} className="text-gray-400 hover:text-white text-xs">✕</button>
          </div>
          <div className="max-h-64 overflow-y-auto scrollbar-thin">
            {songs.slice(currentSongIndex + 1).map((s, i) => (
              <div
                key={i}
                onClick={() => setCurrentSongIndex(currentSongIndex + 1 + i)}
                className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 cursor-pointer transition"
              >
                <img src={s.songThumbnail || s.poster || thumb} alt="" className="w-8 h-8 rounded-lg object-cover" />
                <div className="overflow-hidden">
                  <p className="text-white text-xs truncate">{s.songTitle}</p>
                  <p className="text-gray-400 text-xs truncate">{s.songSingers || s.artist}</p>
                </div>
              </div>
            ))}
            {queue.map((s, i) => (
              <div key={`q-${i}`} className="flex items-center gap-2 px-3 py-2 hover:bg-white/10">
                <img src={s.songThumbnail || s.poster || thumb} alt="" className="w-8 h-8 rounded-lg object-cover" />
                <div className="overflow-hidden">
                  <p className="text-white text-xs truncate">{s.songTitle}</p>
                  <p className="text-gray-400 text-xs truncate">{s.songSingers} · Queue</p>
                </div>
              </div>
            ))}
            {songs.slice(currentSongIndex + 1).length === 0 && queue.length === 0 && (
              <p className="text-gray-500 text-xs text-center py-4">Queue is empty</p>
            )}
          </div>
        </div>
      )}

      {/* Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 text-white"
        style={{ background: "rgba(9,9,11,0.96)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>

        {/* Progress bar — full width, slim */}
        <div
          className="relative h-1 group cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = ((e.clientX - rect.left) / rect.width) * 100;
            const audio = audioRef.current;
            audio.currentTime = (pct / 100) * audio.duration;
            setProgress(pct);
          }}
        >
          <div className="absolute inset-0 bg-white/10" />
          <div className="absolute inset-y-0 left-0 bg-green-500 transition-all" style={{ width: `${progress}%` }} />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow opacity-0 group-hover:opacity-100 transition"
            style={{ left: `calc(${progress}% - 6px)` }}
          />
        </div>

        <div className="flex items-center justify-between px-4 py-2.5">
          {/* Left: Song info */}
          <div className="flex items-center gap-3 w-[240px] shrink-0 min-w-0">
            <button onClick={() => setShowPanel((p) => !p)} className="relative shrink-0 group/art">
              <img
                src={thumb}
                alt={currentSong?.songTitle}
                className={`w-12 h-12 rounded-xl object-cover shadow-lg transition ${showPanel ? "ring-2 ring-green-500" : "hover:scale-105"}`}
              />
              <div className="absolute inset-0 rounded-xl bg-black/50 opacity-0 group-hover/art:opacity-100 flex items-center justify-center transition">
                <FaChevronUp size={12} className={`text-white transition ${showPanel ? "rotate-180" : ""}`} />
              </div>
            </button>
            <div className="overflow-hidden flex-1 min-w-0">
              <p className="text-sm font-semibold truncate leading-tight">{currentSong?.songTitle}</p>
              <p className="text-xs text-gray-400 truncate leading-tight">{currentSong?.songSingers || currentSong?.artist}</p>
            </div>
            <button
              onClick={() => toggleLike(currentSong)}
              className={`shrink-0 transition-all ${liked ? "text-red-500 scale-110" : "text-gray-500 hover:text-white hover:scale-105"}`}
            >
              <FaHeart size={13} />
            </button>
          </div>

          {/* Centre: Controls */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-5">
              <button
                onClick={() => setShuffle((s) => !s)}
                className={`transition-all ${shuffle ? "text-green-400 scale-105" : "text-gray-400 hover:text-white hover:scale-105"}`}
                title="Shuffle"
              >
                <FaRandom size={13} />
              </button>
              <button
                onClick={handlePrev}
                disabled={currentSongIndex === 0}
                className="text-gray-300 hover:text-white hover:scale-110 disabled:opacity-30 transition-all"
              >
                <FaStepBackward size={16} />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-all shadow-lg shadow-white/20"
              >
                {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} className="ml-0.5" />}
              </button>
              <button
                onClick={handleNext}
                disabled={currentSongIndex >= songs.length - 1 && repeat === "off" && !shuffle}
                className="text-gray-300 hover:text-white hover:scale-110 disabled:opacity-30 transition-all"
              >
                <FaStepForward size={16} />
              </button>
              <button
                onClick={cycleRepeat}
                className={`transition-all ${repeat !== "off" ? "text-green-400 scale-105" : "text-gray-400 hover:text-white hover:scale-105"}`}
                title={`Repeat: ${repeat}`}
              >
                <RepeatIcon size={13} />
              </button>
            </div>
            {/* Time stamps */}
            <div className="flex items-center gap-2 text-xs text-gray-500 tabular-nums select-none">
              <span>{currentTime}</span>
              <span>/</span>
              <span>{duration}</span>
            </div>
          </div>

          {/* Right: Volume + extras */}
          <div className="flex items-center gap-3 w-[240px] justify-end">
            <button onClick={toggleMute} className="text-gray-400 hover:text-white transition hover:scale-105">
              {muted || volume === 0 ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
            </button>
            <input
              type="range" min="0" max="100" value={muted ? 0 : volume}
              onChange={handleVolume}
              className="w-20 h-1 accent-green-400 cursor-pointer"
            />
            <button
              onClick={() => setShowQueue((s) => !s)}
              className={`transition hover:scale-105 ${showQueue ? "text-green-400" : "text-gray-400 hover:text-white"}`}
              title="Queue"
            >
              <FaList size={13} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
