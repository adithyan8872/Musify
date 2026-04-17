import { useContext, useState } from "react";
import { Mygarage } from "../Context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { MdAdd, MdQueueMusic, MdDelete, MdMovie } from "react-icons/md";
import { FaPlay, FaSearch } from "react-icons/fa";
import { moviePlaylists, LANGUAGES } from "../data/moviePlaylists";

const Library = () => {
  const { darkMode, playlists, createPlaylist, deletePlaylist, setSongs, setCurrentSongIndex, setIsPlaying } = useContext(Mygarage);
  const navigate = useNavigate();
  const [newName, setNewName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [tab, setTab] = useState("movie"); // "movie" | "my"
  const [langFilter, setLangFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  function handleCreate(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    createPlaylist(newName.trim());
    setNewName("");
    setShowInput(false);
  }

  function playMoviePlaylist(pl) {
    // Normalize movie songs to the app's song shape
    const normalized = pl.songs.map((s) => ({
      ...s,
      songTitle: s.title,
      songSingers: s.artist,
      songThumbnail: pl.poster,
    }));
    setSongs(normalized);
    setCurrentSongIndex(0);
    setIsPlaying(true);
  }

  const filteredMoviePlaylists = moviePlaylists.filter((pl) => {
    const matchLang = langFilter === "All" || pl.language === langFilter;
    const matchSearch = pl.movie.toLowerCase().includes(searchQuery.toLowerCase());
    return matchLang && matchSearch;
  });

  const bg = darkMode ? "text-white" : "text-gray-900";
  const cardBg = darkMode ? "bg-gray-800/60 hover:bg-gray-700/80 border-gray-700/50" : "bg-white hover:bg-gray-50 border-gray-200 shadow-sm";
  const inputBg = darkMode ? "bg-gray-800 text-white border-gray-700 placeholder-gray-500" : "bg-white text-gray-900 border-gray-300 placeholder-gray-400";
  const tabActive = "bg-green-500 text-black font-bold";
  const tabInactive = darkMode ? "text-gray-400 hover:text-white hover:bg-white/10" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100";

  return (
    <div className={`flex-1 min-h-[calc(100vh-70px)] pb-28 overflow-y-auto ${bg}`}>
      <div className="px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Library</h1>
          <button
            onClick={() => { setTab("my"); setShowInput((s) => !s); }}
            className="flex items-center gap-1.5 bg-green-500 hover:bg-green-400 text-black font-bold px-4 py-2 rounded-full text-sm transition"
          >
            <MdAdd size={18} /> New Playlist
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5">
          {["movie", "my"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-full text-sm transition ${tab === t ? tabActive : tabInactive}`}
            >
              {t === "movie" ? "🎬 Movie Playlists" : "📂 My Playlists"}
            </button>
          ))}
        </div>

        {/* ── MOVIE PLAYLISTS TAB ── */}
        {tab === "movie" && (
          <>
            {/* Search + Language filter */}
            <div className="flex flex-wrap gap-3 mb-5">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies..."
                  className={`pl-8 pr-3 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-52 ${inputBg}`}
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLangFilter(lang)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${langFilter === lang ? tabActive : tabInactive}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {filteredMoviePlaylists.length === 0 ? (
              <p className={`text-center mt-16 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>No playlists found</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredMoviePlaylists.map((pl) => (
                  <div
                    key={pl.id}
                    className={`group rounded-xl overflow-hidden border transition-all duration-200 hover:scale-105 hover:shadow-xl ${cardBg}`}
                  >
                    <NavLink to={`/movie-playlist/${pl.id}`}>
                      <div className="relative">
                        <img
                          src={pl.poster}
                          alt={pl.movie}
                          className="w-full h-44 object-cover"
                          onError={(e) => { e.target.src = "https://placehold.co/176x176/1f2937/9ca3af?text=🎬"; }}
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                          <button
                            onClick={(e) => { e.preventDefault(); playMoviePlaylist(pl); }}
                            className="w-11 h-11 rounded-full bg-green-500 flex items-center justify-center shadow-lg hover:bg-green-400 transition hover:scale-110"
                          >
                            <FaPlay size={14} className="text-black ml-0.5" />
                          </button>
                        </div>
                        <span className={`absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full font-medium ${darkMode ? "bg-black/70 text-gray-300" : "bg-white/80 text-gray-700"}`}>
                          {pl.language}
                        </span>
                      </div>
                      <div className="p-3">
                        <p className={`text-sm font-semibold truncate ${darkMode ? "text-white" : "text-gray-900"}`}>{pl.movie}</p>
                        <p className={`text-xs mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          {pl.genre} · {pl.songs.length} songs
                        </p>
                      </div>
                    </NavLink>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── MY PLAYLISTS TAB ── */}
        {tab === "my" && (
          <>
            {showInput && (
              <form onSubmit={handleCreate} className={`flex gap-2 mb-5 p-4 rounded-xl ${darkMode ? "bg-gray-800/60" : "bg-gray-100"}`}>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Playlist name..."
                  autoFocus
                  className={`flex-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${inputBg}`}
                />
                <button type="submit" className="bg-green-500 hover:bg-green-400 text-black font-bold px-4 py-2 rounded-lg text-sm transition">Create</button>
                <button type="button" onClick={() => setShowInput(false)} className={`px-3 py-2 rounded-lg text-sm ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-500"}`}>Cancel</button>
              </form>
            )}

            {playlists.length === 0 ? (
              <div className="text-center mt-20">
                <MdQueueMusic size={56} className="mx-auto text-gray-600 mb-4" />
                <p className={`text-lg font-semibold ${darkMode ? "text-gray-400" : "text-gray-500"}`}>No playlists yet</p>
                <p className={`text-sm mt-1 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>Create one to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {playlists.map((pl) => (
                  <div key={pl.id} className={`group rounded-xl overflow-hidden border transition-all hover:scale-105 hover:shadow-xl ${cardBg}`}>
                    <NavLink to={`/playlist/${pl.id}`}>
                      <div className="relative">
                        {pl.songs[0]?.songThumbnail ? (
                          <img src={pl.songs[0].songThumbnail} alt={pl.name} className="w-full h-36 object-cover" />
                        ) : (
                          <div className="w-full h-36 bg-gradient-to-br from-purple-700 to-indigo-600 flex items-center justify-center">
                            <MdQueueMusic size={48} className="text-white/50" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                            <FaPlay size={12} className="text-black ml-0.5" />
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className={`font-semibold text-sm truncate ${darkMode ? "text-white" : "text-gray-900"}`}>{pl.name}</p>
                        <p className={`text-xs mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{pl.songs.length} songs</p>
                      </div>
                    </NavLink>
                    <div className="px-3 pb-3">
                      <button onClick={() => deletePlaylist(pl.id)} className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition">
                        <MdDelete size={14} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Library;
