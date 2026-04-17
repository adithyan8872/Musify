import { useContext } from "react";
import { Mygarage } from "../Context/AuthContext";
import SongCard from "../Components/SongCard";
import { FaPlay, FaHeart } from "react-icons/fa";

const LikedSongs = () => {
  const { darkMode, likedSongs, setSongs, setCurrentSongIndex, setIsPlaying } = useContext(Mygarage);

  function playAll() {
    if (!likedSongs.length) return;
    setSongs(likedSongs);
    setCurrentSongIndex(0);
    setIsPlaying(true);
  }

  const bg = darkMode ? "text-white" : "text-gray-900";

  return (
    <div className={`flex-1 min-h-[calc(100vh-70px)] pb-28 overflow-y-auto ${bg}`}>
      {/* Header */}
      <div className="bg-gradient-to-br from-red-700 to-pink-600 px-8 py-10 flex items-end gap-6">
        <div className="w-36 h-36 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-2xl">
          <FaHeart size={56} className="text-white" />
        </div>
        <div>
          <p className="text-white/70 text-sm uppercase tracking-widest font-semibold">Playlist</p>
          <h1 className="text-4xl font-black text-white mt-1">Liked Songs</h1>
          <p className="text-white/70 text-sm mt-2">{likedSongs.length} songs</p>
          {likedSongs.length > 0 && (
            <button
              onClick={playAll}
              className="mt-3 flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-2.5 rounded-full transition hover:scale-105"
            >
              <FaPlay size={12} /> Play All
            </button>
          )}
        </div>
      </div>

      <div className="px-4 py-4">
        {likedSongs.length === 0 ? (
          <div className="text-center mt-20">
            <FaHeart size={48} className="mx-auto text-gray-600 mb-4" />
            <p className={`text-lg font-semibold ${darkMode ? "text-gray-400" : "text-gray-500"}`}>No liked songs yet</p>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>Hit ❤️ on any song to save it here</p>
          </div>
        ) : (
          likedSongs.map((song, i) => (
            <SongCard key={song.id || i} song={song} index={i} songList={likedSongs} />
          ))
        )}
      </div>
    </div>
  );
};

export default LikedSongs;
