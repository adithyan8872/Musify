import { useContext, useState } from "react";
import { Mygarage } from "../Context/AuthContext";
import { FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import { MdMusicNote } from "react-icons/md";

// Mock lyrics for demo — in a real app these would come from an API
function generateLyrics(title) {
  return [
    `🎵 ${title}`,
    "", "♪ Every note a story told",
    "♪ Every rhythm, pure and bold",
    "♪ Let the music fill the air",
    "♪ Melodies beyond compare",
    "", "♪ Close your eyes and feel the beat",
    "♪ Let the harmony feel sweet",
    "♪ Dancing shadows, dancing light",
    "♪ Everything feels right tonight",
    "", "♪ In this world of sound and song",
    "♪ Here is where we all belong",
    "♪ Every heartbeat, every breath",
    "♪ Music conquers even death",
    "", "♪ So let the music play",
    "♪ Let it carry us away",
    "♪ Through the night and through the day",
    `♪ ${title} — forever play`,
    "", "🎵 🎵 🎵",
  ];
}

const NowPlayingPanel = ({ onClose }) => {
  const { songs, currentSongIndex, isPlaying, darkMode } = useContext(Mygarage);
  const currentSong = songs[currentSongIndex] || null;
  const [view, setView] = useState("art"); // "art" | "lyrics"

  if (!currentSong) return null;

  const hasVideo = !!currentSong?.videoUrl;
  const lyrics = generateLyrics(currentSong?.songTitle || "Song");

  return (
    <div className="slide-in-left fixed left-0 top-[70px] bottom-[80px] w-72 z-30 flex flex-col overflow-hidden shadow-2xl border-r border-white/10"
      style={{ background: "linear-gradient(180deg, #0f0c29, #302b63, #24243e)" }}>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex gap-2">
          <button
            onClick={() => setView("art")}
            className={`text-xs px-3 py-1 rounded-full font-medium transition ${view === "art" ? "bg-green-500 text-black" : "text-gray-400 hover:text-white"}`}
          >
            Now Playing
          </button>
          <button
            onClick={() => setView("lyrics")}
            className={`text-xs px-3 py-1 rounded-full font-medium transition ${view === "lyrics" ? "bg-green-500 text-black" : "text-gray-400 hover:text-white"}`}
          >
            Lyrics
          </button>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition">
          <FaTimes size={14} />
        </button>
      </div>

      {view === "art" ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 gap-5">
          {/* Album art with glow */}
          <div className={`relative ${isPlaying ? "glow-green" : ""} rounded-2xl overflow-hidden`}>
            <img
              src={currentSong?.songThumbnail || currentSong?.poster || "https://placehold.co/200x200/0f0c29/9ca3af?text=♪"}
              alt={currentSong?.songTitle}
              className={`w-48 h-48 object-cover rounded-2xl transition-all duration-500 ${isPlaying ? "scale-100" : "scale-95 brightness-75"}`}
            />
            {isPlaying && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 items-end">
                <div className="w-1 bg-green-400 rounded-sm eq-bar-1" />
                <div className="w-1 bg-green-400 rounded-sm eq-bar-2" />
                <div className="w-1 bg-green-400 rounded-sm eq-bar-3" />
              </div>
            )}
          </div>
          <div className="text-center">
            <p className="text-white font-bold text-base">{currentSong?.songTitle}</p>
            <p className="text-gray-400 text-sm mt-0.5">{currentSong?.songSingers || currentSong?.artist}</p>
          </div>
          {hasVideo && (
            <a
              href={currentSong.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-green-400 hover:text-green-300 transition"
            >
              <FaExternalLinkAlt size={10} /> Watch on YouTube
            </a>
          )}
          {!hasVideo && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <MdMusicNote size={12} /> No video available
            </div>
          )}
        </div>
      ) : (
        /* Lyrics marquee */
        <div className="flex-1 overflow-hidden relative px-4 py-6">
          <div className="marquee-up text-center space-y-3">
            {lyrics.map((line, i) => (
              <p key={i} className={`text-sm leading-relaxed ${line.startsWith("♪") ? "text-white/90" : line === "" ? "h-3" : "text-green-400 font-bold text-base"}`}>
                {line}
              </p>
            ))}
            {/* Repeat for seamless loop */}
            {lyrics.map((line, i) => (
              <p key={`r-${i}`} className={`text-sm leading-relaxed ${line.startsWith("♪") ? "text-white/90" : line === "" ? "h-3" : "text-green-400 font-bold text-base"}`}>
                {line}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NowPlayingPanel;
