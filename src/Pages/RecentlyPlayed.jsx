import { useContext } from "react";
import { Mygarage } from "../Context/AuthContext";
import SongCard from "../Components/SongCard";
import { FaClock, FaPlay } from "react-icons/fa";

const RecentlyPlayed = () => {
  const { darkMode, recentlyPlayed, setSongs, setCurrentSongIndex, setIsPlaying } = useContext(Mygarage);

  function playAll() {
    if (!recentlyPlayed.length) return;
    setSongs(recentlyPlayed);
    setCurrentSongIndex(0);
    setIsPlaying(true);
  }

  const bg = darkMode ? "text-white" : "text-gray-900";

  return (
    <div className={`flex-1 min-h-[calc(100vh-70px)] pb-28 overflow-y-auto ${bg}`}>
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FaClock className="text-green-400" />
            <h1 className="text-2xl font-bold">Recently Played</h1>
          </div>
          {recentlyPlayed.length > 0 && (
            <button
              onClick={playAll}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold px-5 py-2 rounded-full text-sm transition"
            >
              <FaPlay size={10} /> Play All
            </button>
          )}
        </div>

        {recentlyPlayed.length === 0 ? (
          <div className="text-center mt-20">
            <FaClock size={48} className="mx-auto text-gray-600 mb-4" />
            <p className={`text-lg font-semibold ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Nothing played yet</p>
          </div>
        ) : (
          <div>
            {recentlyPlayed.map((song, i) => (
              <SongCard key={`${song.id}-${i}`} song={song} index={i} songList={recentlyPlayed} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentlyPlayed;
