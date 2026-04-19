import { useContext, useState } from "react";
import { Mygarage } from "../Context/AuthContext";
import {
  FaHeart, FaTimes, FaPlay, FaExternalLinkAlt,
} from "react-icons/fa";
import { MdQueueMusic, MdPersonAdd, MdMusicNote, MdAlbum } from "react-icons/md";

// Gradient colours cycled by song index for visual variety
const GRADIENTS = [
  "from-purple-900 via-indigo-900 to-gray-950",
  "from-green-900 via-teal-900 to-gray-950",
  "from-red-900 via-pink-900 to-gray-950",
  "from-orange-900 via-amber-900 to-gray-950",
  "from-blue-900 via-cyan-900 to-gray-950",
];

function EqBars() {
  return (
    <div className="flex items-end gap-[2px] h-3">
      <div className="w-[3px] bg-green-400 rounded-sm eq-bar-1" />
      <div className="w-[3px] bg-green-400 rounded-sm eq-bar-2" />
      <div className="w-[3px] bg-green-400 rounded-sm eq-bar-3" />
    </div>
  );
}

const RightPanel = () => {
  const {
    songs, queue, currentSongIndex, setCurrentSongIndex,
    isPlaying, setIsPlaying, setSongs,
    toggleLike, isLiked,
    darkMode, setShowRightPanel,
  } = useContext(Mygarage);

  const [followed, setFollowed] = useState(false);
  const [tab, setTab] = useState("details"); // "details" | "queue"

  const currentSong = songs[currentSongIndex] || null;
  if (!currentSong) return null;

  const liked = isLiked(currentSong?.id);
  const gradient = GRADIENTS[(currentSongIndex || 0) % GRADIENTS.length];
  const thumb = currentSong?.songThumbnail || currentSong?.poster
    || "https://placehold.co/280x280/111827/4b5563?text=♪";

  const upNext = songs.slice(currentSongIndex + 1, currentSongIndex + 6);
  const queueItems = queue.slice(0, 5);

  function playFromQueue(idx) {
    setCurrentSongIndex(currentSongIndex + 1 + idx);
    setIsPlaying(true);
  }

  const divider = darkMode ? "border-white/8" : "border-gray-200";
  const subText = darkMode ? "text-gray-400" : "text-gray-500";
  const tabActive = "text-white border-b-2 border-green-400";
  const tabInactive = `${subText} border-b-2 border-transparent hover:text-white`;

  return (
    <aside
      className="w-72 shrink-0 flex flex-col border-l overflow-hidden"
      style={{
        borderColor: "rgba(255,255,255,0.07)",
        background: darkMode
          ? "linear-gradient(180deg, #0d0d14 0%, #111118 100%)"
          : "linear-gradient(180deg, #f8f7ff 0%, #f0eeff 100%)",
      }}
    >
      {/* Dynamic colour header */}
      <div className={`relative bg-gradient-to-b ${gradient} px-4 pt-4 pb-6 shrink-0`}>
        {/* Close button */}
        <button
          onClick={() => setShowRightPanel(false)}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white/70 hover:text-white transition"
        >
          <FaTimes size={11} />
        </button>

        {/* Album art */}
        <div className="flex justify-center mb-4 mt-2">
          <div className={`relative rounded-2xl overflow-hidden shadow-2xl ${isPlaying ? "glow-green" : ""}`}>
            <img
              src={thumb}
              alt={currentSong?.songTitle}
              className={`w-44 h-44 object-cover transition-all duration-500 ${isPlaying ? "scale-100" : "scale-95 brightness-75"}`}
            />
            {isPlaying && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                <EqBars />
              </div>
            )}
          </div>
        </div>

        {/* Song info */}
        <div className="flex items-start justify-between gap-2">
          <div className="overflow-hidden flex-1 min-w-0">
            <p className="text-white font-bold text-base truncate leading-tight">
              {currentSong?.songTitle}
            </p>
            <p className="text-white/60 text-sm truncate mt-0.5">
              {currentSong?.songSingers || currentSong?.artist || "Unknown Artist"}
            </p>
          </div>
          <button
            onClick={() => toggleLike(currentSong)}
            className={`shrink-0 mt-0.5 transition-all hover:scale-110 ${liked ? "text-red-500" : "text-white/40 hover:text-white"}`}
          >
            <FaHeart size={18} />
          </button>
        </div>

        {/* Follow + Video link */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => setFollowed((f) => !f)}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold transition ${
              followed
                ? "bg-white/20 text-white"
                : "border border-white/30 text-white/70 hover:border-white/60 hover:text-white"
            }`}
          >
            <MdPersonAdd size={13} />
            {followed ? "Following" : "Follow Artist"}
          </button>
          {currentSong?.videoUrl && (
            <a
              href={currentSong.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-green-400 hover:text-green-300 transition px-2 py-1.5"
            >
              <FaExternalLinkAlt size={10} /> Video
            </a>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className={`flex border-b ${divider} px-4 shrink-0`}>
        {["details", "queue"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`py-2.5 mr-4 text-xs font-semibold uppercase tracking-wider transition ${tab === t ? tabActive : tabInactive}`}
          >
            {t === "details" ? "Details" : "Up Next"}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin pb-28">
        {tab === "details" ? (
          <div className="p-4 space-y-4">
            {/* Credits */}
            <div>
              <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${subText}`}>Credits</p>
              <div className="space-y-2">
                {[
                  { label: "Artist",         value: currentSong?.songSingers || currentSong?.artist },
                  { label: "Music Director", value: currentSong?.songMusicDirectors },
                  { label: "Duration",       value: currentSong?.duration },
                  // { label: "Size",           value: currentSong?.size },
                ].filter((r) => r.value).map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className={`text-xs ${subText}`}>{label}</span>
                    <span className={`text-xs font-medium truncate max-w-[140px] text-right ${darkMode ? "text-white" : "text-gray-800"}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Album info if available */}
            {currentSong?.albumTitle && (
              <div className={`rounded-xl p-3 border ${darkMode ? "bg-white/5 border-white/8" : "bg-gray-100 border-gray-200"}`}>
                <div className="flex items-center gap-2">
                  <MdAlbum size={16} className="text-green-400 shrink-0" />
                  <div className="overflow-hidden">
                    <p className={`text-xs ${subText}`}>From album</p>
                    <p className={`text-sm font-semibold truncate ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {currentSong.albumTitle}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* No video notice */}
            {!currentSong?.videoUrl && (
              <div className={`flex items-center gap-2 text-xs ${subText}`}>
                <MdMusicNote size={14} />
                <span>No video available for this track</span>
              </div>
            )}
          </div>
        ) : (
          <div className="py-2">
            {upNext.length === 0 && queueItems.length === 0 ? (
              <div className="flex flex-col items-center py-10 gap-2">
                <MdQueueMusic size={36} className="text-gray-600" />
                <p className={`text-xs ${subText}`}>Queue is empty</p>
              </div>
            ) : (
              <>
                {upNext.length > 0 && (
                  <>
                    <p className={`text-xs font-bold uppercase tracking-widest px-4 py-2 ${subText}`}>
                      Next in Album
                    </p>
                    {upNext.map((s, i) => (
                      <QueueRow
                        key={i}
                        song={s}
                        onClick={() => playFromQueue(i)}
                        darkMode={darkMode}
                        subText={subText}
                      />
                    ))}
                  </>
                )}
                {queueItems.length > 0 && (
                  <>
                    <p className={`text-xs font-bold uppercase tracking-widest px-4 py-2 mt-2 ${subText}`}>
                      Added to Queue
                    </p>
                    {queueItems.map((s, i) => (
                      <QueueRow
                        key={`q-${i}`}
                        song={s}
                        darkMode={darkMode}
                        subText={subText}
                      />
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

function QueueRow({ song, onClick, darkMode, subText }) {
  const thumb = song?.songThumbnail || song?.poster || "https://placehold.co/36x36/111827/4b5563?text=♪";
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2.5 transition group ${
        onClick ? "cursor-pointer" : ""
      } ${darkMode ? "hover:bg-white/8" : "hover:bg-gray-100"}`}
    >
      <div className="relative shrink-0">
        <img src={thumb} alt={song?.songTitle} className="w-9 h-9 rounded-lg object-cover" />
        {onClick && (
          <div className="absolute inset-0 rounded-lg bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
            <FaPlay size={10} className="text-white ml-0.5" />
          </div>
        )}
      </div>
      <div className="overflow-hidden flex-1 min-w-0">
        <p className={`text-xs font-medium truncate ${darkMode ? "text-white" : "text-gray-900"}`}>
          {song?.songTitle}
        </p>
        <p className={`text-xs truncate ${subText}`}>{song?.songSingers || song?.artist}</p>
      </div>
      <span className={`text-xs shrink-0 ${subText}`}>{song?.duration}</span>
    </div>
  );
}

export default RightPanel;
