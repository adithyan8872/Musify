import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { _DB } from "../Backend/Firebase";
import { Mygarage } from "../Context/AuthContext";
import { FaPlay, FaClock, FaHeart } from "react-icons/fa";
import { MdTrendingUp, MdMovie, MdRecommend } from "react-icons/md";
import { moviePlaylists } from "../data/moviePlaylists";

function SkeletonCard({ tall = false }) {
  return (
    <div className={`w-44 shrink-0 rounded-2xl overflow-hidden skeleton-shimmer ${tall ? "h-64" : "h-56"}`} />
  );
}

function AlbumCard({ data }) {
  const { darkMode, setSongs, setCurrentSongIndex, setIsPlaying } = useContext(Mygarage);

  function playFirst(e) {
    e.preventDefault();
    if (data?.songs?.length) {
      setSongs(data.songs);
      setCurrentSongIndex(0);
      setIsPlaying(true);
    }
  }

  return (
    <NavLink to={`/albums/albumDetails/${data?.title}`} state={data}>
      <div className="group relative w-44 shrink-0 rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-black/40">
        <img
          src={data?.Thumbnail || "https://placehold.co/176x176/111827/4b5563?text=♪"}
          alt={data?.title}
          className="w-full h-44 object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {/* Play button */}
        <button
          onClick={playFirst}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-green-500 flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300"
        >
          <FaPlay size={14} className="text-black ml-0.5" />
        </button>
        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-white text-sm font-bold truncate">{data?.title}</p>
          <p className="text-gray-300 text-xs truncate mt-0.5">{data?.lang} · {data?.albumtype}</p>
        </div>
      </div>
    </NavLink>
  );
}

function MovieCard({ pl }) {
  const { setSongs, setCurrentSongIndex, setIsPlaying } = useContext(Mygarage);

  function play(e) {
    e.preventDefault();
    const normalized = pl.songs.map((s) => ({ ...s, songTitle: s.title, songSingers: s.artist, songThumbnail: pl.poster }));
    setSongs(normalized);
    setCurrentSongIndex(0);
    setIsPlaying(true);
  }

  return (
    <NavLink to={`/movie-playlist/${pl.id}`}>
      <div className="group relative w-36 shrink-0 rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-black/40">
        <img
          src={pl.poster}
          alt={pl.movie}
          className="w-full h-52 object-cover"
          onError={(e) => { e.target.src = "https://placehold.co/144x208/111827/4b5563?text=🎬"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <button
          onClick={play}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300"
        >
          <FaPlay size={12} className="text-black ml-0.5" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-2.5">
          <p className="text-white text-xs font-bold truncate">{pl.movie}</p>
          <p className="text-gray-400 text-xs truncate">{pl.language}</p>
        </div>
      </div>
    </NavLink>
  );
}

function SectionHeader({ icon: Icon, title, color = "text-green-400" }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon className={color} size={20} />
      <h2 className="text-lg font-black">{title}</h2>
    </div>
  );
}

function HorizontalScroll({ children }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
      {children}
    </div>
  );
}

export const Home = () => {
  const { darkMode, recentlyPlayed, likedSongs, setSongs, setCurrentSongIndex, setIsPlaying } = useContext(Mygarage);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(_DB, "music_musify"))
      .then((snap) => setAlbums(snap.docs.map((d) => ({ id: d.id, ...d.data() }))))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  function playRecent(song) {
    setSongs([song]);
    setCurrentSongIndex(0);
    setIsPlaying(true);
  }

  // Recommendations: movie playlists matching liked song genres (simple mock)
  const recommended = moviePlaylists.slice(0, 8);
  const trending = moviePlaylists.slice(10, 18);

  const text = darkMode ? "text-white" : "text-gray-900";
  const subText = darkMode ? "text-gray-400" : "text-gray-500";
  const recentCard = darkMode ? "bg-white/8 hover:bg-white/12 border-white/10" : "bg-white hover:bg-gray-50 border-gray-200 shadow-sm";

  return (
    <div className={`flex-1 min-h-[calc(100vh-70px)] pb-28 overflow-y-auto ${text}`}>
      {/* Hero Banner */}
      <div className="relative h-56 overflow-hidden flex items-end px-8 pb-7"
        style={{ background: "linear-gradient(135deg, #1a0533 0%, #0d1b4b 40%, #0a2e1a 100%)" }}>
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #7c3aed 0%, transparent 50%), radial-gradient(circle at 80% 50%, #059669 0%, transparent 50%)" }} />
        <div className="relative z-10">
          <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-1">Welcome back</p>
          <h1 className="text-4xl font-black text-white tracking-tight leading-none">
            Good vibes only <span className="gradient-text">🎵</span>
          </h1>
          <p className="text-white/50 mt-2 text-sm">Discover albums · Build playlists · Play anything</p>
        </div>
        {/* Decorative circles */}
        <div className="absolute right-12 top-8 w-32 h-32 rounded-full bg-purple-500/10 blur-2xl" />
        <div className="absolute right-32 top-4 w-20 h-20 rounded-full bg-green-500/10 blur-xl" />
      </div>

      <div className="px-6 py-6 space-y-10">
        {/* Recently Played */}
        {recentlyPlayed.length > 0 && (
          <section>
            <SectionHeader icon={FaClock} title="Recently Played" />
            <HorizontalScroll>
              {recentlyPlayed.slice(0, 12).map((song, i) => (
                <div
                  key={i}
                  onClick={() => playRecent(song)}
                  className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer shrink-0 border transition-all hover:scale-105 ${recentCard}`}
                >
                  <img
                    src={song.songThumbnail || "https://placehold.co/40x40/111827/4b5563?text=♪"}
                    alt={song.songTitle}
                    className="w-10 h-10 rounded-lg object-cover shrink-0"
                  />
                  <div className="max-w-[110px]">
                    <p className={`text-sm font-medium truncate ${darkMode ? "text-white" : "text-gray-900"}`}>{song.songTitle}</p>
                    <p className={`text-xs truncate ${subText}`}>{song.songSingers}</p>
                  </div>
                </div>
              ))}
            </HorizontalScroll>
          </section>
        )}

        {/* Firebase Albums */}
        <section>
          <SectionHeader icon={MdTrendingUp} title="Popular Albums" />
          <HorizontalScroll>
            {loading
              ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
              : albums.map((album, i) => <AlbumCard key={i} data={album} />)
            }
          </HorizontalScroll>
        </section>

        {/* Trending Movie Playlists */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <SectionHeader icon={MdTrendingUp} title="Trending Now" color="text-orange-400" />
            <NavLink to="/library" className={`text-xs font-semibold hover:text-green-400 transition ${subText}`}>See all →</NavLink>
          </div>
          <HorizontalScroll>
            {trending.map((pl) => <MovieCard key={pl.id} pl={pl} />)}
          </HorizontalScroll>
        </section>

        {/* Movie Playlists */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <SectionHeader icon={MdMovie} title="Movie Playlists" color="text-purple-400" />
            <NavLink to="/library" className={`text-xs font-semibold hover:text-green-400 transition ${subText}`}>See all →</NavLink>
          </div>
          <HorizontalScroll>
            {moviePlaylists.slice(0, 12).map((pl) => <MovieCard key={pl.id} pl={pl} />)}
          </HorizontalScroll>
        </section>

        {/* Liked Songs quick widget */}
        {likedSongs.length > 0 && (
          <section>
            <SectionHeader icon={FaHeart} title="Your Liked Songs" color="text-red-400" />
            <div className="flex gap-3 flex-wrap">
              {likedSongs.slice(0, 6).map((song, i) => (
                <div
                  key={i}
                  onClick={() => { setSongs(likedSongs); setCurrentSongIndex(i); setIsPlaying(true); }}
                  className={`group flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer border transition-all hover:scale-105 ${recentCard}`}
                >
                  <img src={song.songThumbnail || "https://placehold.co/36x36/111827/4b5563?text=♪"} alt="" className="w-9 h-9 rounded-lg object-cover" />
                  <div className="max-w-[100px]">
                    <p className={`text-xs font-semibold truncate ${darkMode ? "text-white" : "text-gray-900"}`}>{song.songTitle}</p>
                    <p className={`text-xs truncate ${subText}`}>{song.songSingers}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
