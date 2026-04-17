import { useContext, useRef, useState, useEffect } from "react";
import { Mygarage } from "../Context/AuthContext";
import {
  FaPlay, FaPause, FaHeart, FaEllipsisV,
  FaDownload, FaListUl,
} from "react-icons/fa";
import {
  MdQueueMusic, MdSkipNext, MdPlaylistAdd, MdAlbum,
} from "react-icons/md";

// Equalizer animation shown when song is actively playing
function EqBars() {
  return (
    <div className="flex items-end gap-[2px] h-4">
      <div className="w-[3px] bg-green-400 rounded-sm eq-bar-1" />
      <div className="w-[3px] bg-green-400 rounded-sm eq-bar-2" />
      <div className="w-[3px] bg-green-400 rounded-sm eq-bar-3" />
    </div>
  );
}

/**
 * SongCard — reusable song row with 3-dot context menu
 * Props:
 *   song        — song object { id, songTitle, songSingers, songThumbnail, duration, url, ... }
 *   index       — position in the list
 *   songList    — full list to set as queue when playing
 *   showAlbum   — whether to show "View Album" option
 */
const SongCard = ({ song, index, songList = [], showAlbum = false }) => {
  const {
    songs, setSongs, isPlaying, setIsPlaying,
    currentSongIndex, setCurrentSongIndex,
    toggleLike, isLiked, addToQueue,
    playlists, addSongToPlaylist, createPlaylist,
    darkMode,
  } = useContext(Mygarage);

  const [menuOpen, setMenuOpen] = useState(false);
  const [showPlaylistPicker, setShowPlaylistPicker] = useState(false);
  const [newPlName, setNewPlName] = useState("");
  const menuRef = useRef(null);

  const isActive = currentSongIndex === index && songs === songList;
  const liked = isLiked(song?.id);

  // Close menu on outside click
  useEffect(() => {
    function onClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
        setShowPlaylistPicker(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [menuOpen]);

  function playSong() {
    setSongs(songList.length ? songList : [song]);
    setCurrentSongIndex(index);
    setIsPlaying(true);
    setMenuOpen(false);
  }

  function playNext() {
    // Insert after current song in queue
    addToQueue(song);
    setMenuOpen(false);
  }

  function handleAddToPlaylist(plId) {
    addSongToPlaylist(plId, song);
    setMenuOpen(false);
    setShowPlaylistPicker(false);
  }

  function handleCreateAndAdd(e) {
    e.preventDefault();
    if (!newPlName.trim()) return;
    const id = createPlaylist(newPlName.trim());
    setTimeout(() => addSongToPlaylist(id, song), 50);
    setNewPlName("");
    setMenuOpen(false);
    setShowPlaylistPicker(false);
  }

  function handleDownload() {
    if (!song?.url) return;
    const a = document.createElement("a");
    a.href = song.url;
    a.download = `${song.songTitle || "song"}.mp3`;
    a.click();
    setMenuOpen(false);
  }

  const rowBg = darkMode
    ? `hover:bg-white/5 ${isActive ? "bg-white/10" : ""}`
    : `hover:bg-gray-100 ${isActive ? "bg-green-50" : ""}`;

  const textMain = darkMode ? "text-white" : "text-gray-900";
  const textSub = darkMode ? "text-gray-400" : "text-gray-500";
  const menuBg = darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200";
  const menuItem = darkMode ? "hover:bg-gray-800 text-gray-200" : "hover:bg-gray-50 text-gray-700";

  return (
    <div className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all cursor-pointer ${rowBg}`}>
      {/* Track number / eq bars */}
      <div className="w-6 shrink-0 flex items-center justify-center" onClick={playSong}>
        {isActive && isPlaying ? (
          <EqBars />
        ) : isActive ? (
          <FaPause size={11} className="text-green-400" />
        ) : (
          <>
            <span className={`group-hover:hidden text-sm ${textSub}`}>{index + 1}</span>
            <FaPlay size={11} className={`hidden group-hover:block ${textMain}`} />
          </>
        )}
      </div>

      {/* Thumbnail */}
      <img
        src={song?.songThumbnail || song?.poster || "https://placehold.co/44x44/1f2937/9ca3af?text=♪"}
        alt={song?.songTitle || song?.title}
        className="w-10 h-10 rounded-lg object-cover shrink-0"
        onClick={playSong}
      />

      {/* Info */}
      <div className="flex-1 overflow-hidden min-w-0" onClick={playSong}>
        <p className={`text-sm font-medium truncate ${isActive ? "text-green-400" : textMain}`}>
          {song?.songTitle || song?.title}
        </p>
        <p className={`text-xs truncate ${textSub}`}>
          {song?.songSingers || song?.artist}
        </p>
      </div>

      {/* Duration */}
      <span className={`text-xs shrink-0 hidden sm:block ${textSub}`}>{song?.duration}</span>

      {/* Like button */}
      <button
        onClick={() => toggleLike(song)}
        className={`shrink-0 transition ${liked ? "text-red-500" : `${textSub} opacity-0 group-hover:opacity-100`}`}
      >
        <FaHeart size={13} />
      </button>

      {/* 3-dot menu */}
      <div className="relative shrink-0" ref={menuRef}>
        <button
          onClick={(e) => { e.stopPropagation(); setMenuOpen((o) => !o); setShowPlaylistPicker(false); }}
          className={`p-1.5 rounded-full transition opacity-0 group-hover:opacity-100 ${darkMode ? "hover:bg-white/10 text-gray-400 hover:text-white" : "hover:bg-gray-200 text-gray-500"}`}
        >
          <FaEllipsisV size={13} />
        </button>

        {menuOpen && (
          <div className={`absolute right-0 bottom-8 w-52 rounded-xl shadow-2xl z-50 border overflow-hidden ${menuBg}`}>
            {!showPlaylistPicker ? (
              <>
                <MenuItem icon={<FaPlay size={12} />} label="Play" onClick={playSong} cls={menuItem} />
                <MenuItem icon={<MdSkipNext size={14} />} label="Play Next" onClick={playNext} cls={menuItem} />
                <MenuItem icon={<MdQueueMusic size={14} />} label="Add to Queue" onClick={() => { addToQueue(song); setMenuOpen(false); }} cls={menuItem} />
                <div className={`border-t my-1 ${darkMode ? "border-gray-700" : "border-gray-100"}`} />
                <MenuItem
                  icon={<MdPlaylistAdd size={14} />}
                  label="Add to Playlist"
                  onClick={() => setShowPlaylistPicker(true)}
                  cls={menuItem}
                />
                <MenuItem
                  icon={<FaHeart size={12} />}
                  label={liked ? "Unlike" : "Like"}
                  onClick={() => { toggleLike(song); setMenuOpen(false); }}
                  cls={liked ? "text-red-400 hover:bg-red-500/10" : menuItem}
                />
                <div className={`border-t my-1 ${darkMode ? "border-gray-700" : "border-gray-100"}`} />
                <MenuItem icon={<FaDownload size={12} />} label="Download" onClick={handleDownload} cls={menuItem} />
                {showAlbum && (
                  <MenuItem icon={<MdAlbum size={14} />} label="View Album" onClick={() => setMenuOpen(false)} cls={menuItem} />
                )}
              </>
            ) : (
              <div className="p-2">
                <button
                  onClick={() => setShowPlaylistPicker(false)}
                  className={`text-xs mb-2 flex items-center gap-1 ${textSub} hover:text-green-400`}
                >
                  ← Back
                </button>
                <p className={`text-xs font-semibold mb-2 px-1 ${textSub}`}>Add to playlist</p>
                {playlists.map((pl) => (
                  <button
                    key={pl.id}
                    onClick={() => handleAddToPlaylist(pl.id)}
                    className={`w-full text-left px-2 py-1.5 rounded-lg text-xs truncate transition ${menuItem}`}
                  >
                    <FaListUl size={10} className="inline mr-1.5" />
                    {pl.name}
                  </button>
                ))}
                <form onSubmit={handleCreateAndAdd} className="mt-2 flex gap-1">
                  <input
                    value={newPlName}
                    onChange={(e) => setNewPlName(e.target.value)}
                    placeholder="New playlist..."
                    className={`flex-1 text-xs px-2 py-1 rounded-lg border focus:outline-none focus:ring-1 focus:ring-green-500 ${darkMode ? "bg-gray-800 border-gray-600 text-white placeholder-gray-500" : "bg-gray-50 border-gray-300 text-gray-900"}`}
                  />
                  <button type="submit" className="text-xs bg-green-500 hover:bg-green-400 text-black font-bold px-2 py-1 rounded-lg">+</button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

function MenuItem({ icon, label, onClick, cls }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs transition ${cls}`}
    >
      {icon}
      {label}
    </button>
  );
}

export default SongCard;
