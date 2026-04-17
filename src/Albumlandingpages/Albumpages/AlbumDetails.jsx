import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Mygarage } from "../../Context/AuthContext";
import SongCard from "../../Components/SongCard";
import { FaPlay } from "react-icons/fa";

const AlbumDetails = () => {
  const { setSongs, setCurrentSongIndex, setIsPlaying, darkMode } = useContext(Mygarage);

  const location = useLocation();
  const albumData = location?.state;
  const songs = albumData?.songs || [];

  function playAll() {
    if (!songs.length) return;
    setSongs(songs);
    setCurrentSongIndex(0);
    setIsPlaying(true);
  }

  const bg = darkMode ? "text-white" : "text-gray-900";
  const subText = darkMode ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`flex-1 min-h-[calc(100vh-70px)] pb-28 overflow-y-auto ${bg}`}>
      {/* Album header */}
      <div className={`px-8 py-8 flex flex-col sm:flex-row items-start sm:items-end gap-6 bg-gradient-to-b ${darkMode ? "from-gray-700/60 to-transparent" : "from-gray-200/60 to-transparent"}`}>
        <img
          src={albumData?.Thumbnail || "https://placehold.co/160x160/1f2937/9ca3af?text=♪"}
          alt={albumData?.title}
          className="w-40 h-40 rounded-2xl object-cover shadow-2xl shrink-0"
        />
        <div className="flex flex-col gap-1.5">
          <p className={`text-xs uppercase tracking-widest font-semibold ${subText}`}>{albumData?.albumtype || "Album"}</p>
          <h1 className="text-4xl font-black">{albumData?.title}</h1>
          <p className={`text-sm max-w-lg ${subText}`}>{albumData?.description}</p>
          <div className={`flex flex-wrap gap-x-4 gap-y-1 text-xs mt-1 ${subText}`}>
            {albumData?.lang && <span>🌐 {albumData.lang}</span>}
            {albumData?.daterelease && <span>📅 {albumData.daterelease}</span>}
            {albumData?.director && <span>🎬 {albumData.director}</span>}
            {albumData?.starcast && <span>⭐ {albumData.starcast}</span>}
            <span>🎵 {songs.length} tracks</span>
          </div>
          <button
            onClick={playAll}
            className="mt-3 flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-2.5 rounded-full transition w-fit hover:scale-105"
          >
            <FaPlay size={12} /> Play All
          </button>
        </div>
      </div>

      {/* Songs */}
      <div className="px-4 py-2">
        {songs.length === 0 ? (
          <p className={`text-center py-10 ${subText}`}>No songs in this album</p>
        ) : (
          songs.map((song, i) => (
            <SongCard
              key={song.id || i}
              song={song}
              index={i}
              songList={songs}
              showAlbum={false}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AlbumDetails;
