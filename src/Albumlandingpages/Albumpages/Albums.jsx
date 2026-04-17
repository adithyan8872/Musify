import { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { NavLink } from "react-router-dom";
import { _DB } from "../../Backend/Firebase";
import { Mygarage } from "../../Context/AuthContext";
import { FaPlay } from "react-icons/fa";

function SkeletonCard() {
  return <div className="w-44 h-60 rounded-2xl skeleton-shimmer" />;
}

const Albums = () => {
  const { darkMode, setSongs, setCurrentSongIndex, setIsPlaying } = useContext(Mygarage);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(_DB, "music_musify"))
      .then((snap) => setAlbums(snap.docs.map((d) => ({ id: d.id, ...d.data() }))))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  function playAlbum(e, data) {
    e.preventDefault();
    if (data?.songs?.length) {
      setSongs(data.songs);
      setCurrentSongIndex(0);
      setIsPlaying(true);
    }
  }

  const text = darkMode ? "text-white" : "text-gray-900";
  const subText = darkMode ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`flex-1 min-h-[calc(100vh-70px)] pb-28 overflow-y-auto ${text}`}>
      <div className="px-6 py-6">
        <h1 className="text-2xl font-black mb-1">Albums</h1>
        <p className={`text-sm mb-6 ${subText}`}>{albums.length} albums available</p>
        <div className="flex flex-wrap gap-5">
          {loading
            ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : albums.map((data, i) => (
                <NavLink key={i} to={`albumDetails/${data?.title}`} state={data}>
                  <div className="group relative w-44 rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-black/40">
                    <img
                      src={data?.Thumbnail || "https://placehold.co/176x176/111827/4b5563?text=♪"}
                      alt={data?.title}
                      className="w-full h-44 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <button
                      onClick={(e) => playAlbum(e, data)}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-green-500 flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300"
                    >
                      <FaPlay size={14} className="text-black ml-0.5" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-sm font-bold truncate">{data?.title}</p>
                      <p className="text-gray-300 text-xs truncate mt-0.5">{data?.lang} · {data?.albumtype}</p>
                    </div>
                  </div>
                </NavLink>
              ))
          }
        </div>
      </div>
    </div>
  );
};

export default Albums;
