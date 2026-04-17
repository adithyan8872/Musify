import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Mygarage } from "../Context/AuthContext";
import { moviePlaylists } from "../data/moviePlaylists";
import SongCard from "../Components/SongCard";
import { FaPlay } from "react-icons/fa";
import { MdMovie } from "react-icons/md";

const MoviePlaylistDetail = () => {
  const { id } = useParams();
  const { darkMode, setSongs, setCurrentSongIndex, setIsPlaying } = useContext(Mygarage);

  const pl = moviePlaylists.find((p) => p.id === id);

  if (!pl) {
    return (
      <div className={`flex-1 flex items-center justify-center ${darkMode ? "text-white" : "text-gray-900"}`}>
        <p>Playlist not found.</p>
      </div>
    );
  }

  // Normalize movie songs to app song shape
  const normalizedSongs = pl.songs.map((s) => ({
    ...s,
    songTitle: s.title,
    songSingers: s.artist,
    songThumbnail: pl.poster,
  }));

  function playAll() {
    setSongs(normalizedSongs);
    setCurrentSongIndex(0);
    setIsPlaying(true);
  }

  const bg = darkMode ? "text-white" : "text-gray-900";
  const subText = darkMode ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`flex-1 min-h-[calc(100vh-70px)] pb-28 overflow-y-auto ${bg}`}>
      {/* Header */}
      <div className={`px-8 py-8 flex flex-col sm:flex-row items-start sm:items-end gap-6 bg-gradient-to-b ${darkMode ? "from-gray-700/60 to-transparent" : "from-gray-200/60 to-transparent"}`}>
        <img
          src={pl.poster}
          alt={pl.movie}
          className="w-44 h-60 rounded-2xl object-cover shadow-2xl shrink-0"
          onError={(e) => { e.target.src = "https://placehold.co/176x240/1f2937/9ca3af?text=🎬"; }}
        />
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <MdMovie className="text-green-400" size={18} />
            <span className={`text-xs uppercase tracking-widest font-semibold ${subText}`}>{pl.language} · {pl.genre}</span>
          </div>
          <h1 className="text-4xl font-black">{pl.movie}</h1>
          <p className={`text-sm ${subText}`}>{pl.songs.length} songs</p>
          <button
            onClick={playAll}
            className="mt-2 flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-2.5 rounded-full transition w-fit hover:scale-105"
          >
            <FaPlay size={12} /> Play All
          </button>
        </div>
      </div>

      {/* Song list */}
      <div className="px-4 py-2">
        {normalizedSongs.map((song, i) => (
          <SongCard
            key={song.id}
            song={song}
            index={i}
            songList={normalizedSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default MoviePlaylistDetail;
