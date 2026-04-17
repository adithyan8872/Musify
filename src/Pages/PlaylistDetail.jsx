import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Mygarage } from "../Context/AuthContext";
import SongCard from "../Components/SongCard";
import { FaPlay } from "react-icons/fa";
import { MdQueueMusic } from "react-icons/md";

const PlaylistDetail = () => {
  const { id } = useParams();
  const { darkMode, playlists, setSongs, setCurrentSongIndex, setIsPlaying } = useContext(Mygarage);

  const playlist = playlists.find((p) => p.id === id);

  if (!playlist) {
    return (
      <div className={`flex-1 flex items-center justify-center ${darkMode ? "text-white" : "text-gray-900"}`}>
        <p>Playlist not found.</p>
      </div>
    );
  }

  function playAll() {
    if (!playlist.songs.length) return;
    setSongs(playlist.songs);
    setCurrentSongIndex(0);
    setIsPlaying(true);
  }

  const bg = darkMode ? "text-white" : "text-gray-900";
  const subText = darkMode ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`flex-1 min-h-[calc(100vh-70px)] pb-28 overflow-y-auto ${bg}`}>
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-700 to-indigo-600 px-8 py-10 flex items-end gap-6">
        <div className="w-36 h-36 rounded-2xl bg-white/10 flex items-center justify-center shadow-2xl overflow-hidden">
          {playlist.songs[0]?.songThumbnail ? (
            <img src={playlist.songs[0].songThumbnail} alt="" className="w-full h-full object-cover" />
          ) : (
            <MdQueueMusic size={56} className="text-white/60" />
          )}
        </div>
        <div>
          <p className="text-white/70 text-sm uppercase tracking-widest font-semibold">Playlist</p>
          <h1 className="text-4xl font-black text-white mt-1">{playlist.name}</h1>
          <p className="text-white/70 text-sm mt-2">{playlist.songs.length} songs</p>
          {playlist.songs.length > 0 && (
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
        {playlist.songs.length === 0 ? (
          <div className="text-center mt-16">
            <MdQueueMusic size={48} className="mx-auto text-gray-600 mb-3" />
            <p className={subText}>No songs in this playlist yet</p>
          </div>
        ) : (
          playlist.songs.map((song, i) => (
            <SongCard key={song.id || i} song={song} index={i} songList={playlist.songs} />
          ))
        )}
      </div>
    </div>
  );
};

export default PlaylistDetail;
