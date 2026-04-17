import { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { _DB } from "../Backend/Firebase";
import { Mygarage } from "../Context/AuthContext";
import { FaSearch } from "react-icons/fa";
import SongCard from "../Components/SongCard";
import { moviePlaylists } from "../data/moviePlaylists";

const Search = () => {
  const { darkMode } = useContext(Mygarage);
  const [allSongs, setAllSongs] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const snap = await getDocs(collection(_DB, "music_musify"));
        const songs = [];
        snap.docs.forEach((d) => {
          const album = d.data();
          (album.songs || []).forEach((s) => songs.push({ ...s, albumTitle: album.title, albumThumbnail: album.Thumbnail }));
        });
        // Also include movie playlist songs
        moviePlaylists.forEach((pl) => {
          pl.songs.forEach((s) => songs.push({
            ...s,
            songTitle: s.title,
            songSingers: s.artist,
            songThumbnail: pl.poster,
            albumTitle: pl.movie,
          }));
        });
        setAllSongs(songs);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  const filtered = query.trim()
    ? allSongs.filter((s) =>
        s.songTitle?.toLowerCase().includes(query.toLowerCase()) ||
        s.songSingers?.toLowerCase().includes(query.toLowerCase()) ||
        s.albumTitle?.toLowerCase().includes(query.toLowerCase())
      )
    : allSongs;

  const bg = darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900";
  const inputBg = darkMode ? "bg-gray-800 text-white border-gray-700 placeholder-gray-500" : "bg-white text-gray-900 border-gray-300 placeholder-gray-400";

  return (
    <div className={`flex-1 min-h-[calc(100vh-70px)] pb-28 overflow-y-auto ${bg}`}>
      <div className="px-6 py-6">
        <h1 className="text-2xl font-bold mb-4">Search</h1>

        {/* Search input */}
        <div className="relative max-w-xl mb-6">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search songs, artists, albums..."
            className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition ${inputBg}`}
            autoFocus
          />
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className={`h-16 rounded-xl animate-pulse ${darkMode ? "bg-gray-800" : "bg-gray-200"}`} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className={`text-center mt-16 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            {query ? `No results for "${query}"` : "No songs found"}
          </p>
        ) : (
          <div>
            {filtered.map((song, i) => (
              <SongCard key={song.id || i} song={song} index={i} songList={filtered} showAlbum />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
