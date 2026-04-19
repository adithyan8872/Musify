import { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { _DB } from "../../Backend/Firebase";
import { Mygarage } from "../../Context/AuthContext";
import { MdAlbum, MdLanguage, MdCategory } from "react-icons/md";
import { FaMusic } from "react-icons/fa";

const AdminStats = () => {
  const { darkMode, likedSongs, playlists, recentlyPlayed } = useContext(Mygarage);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(_DB, "music_musify"))
      .then((snap) => setAlbums(snap.docs.map((d) => ({ id: d.id, ...d.data() }))))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalSongs = albums.reduce((acc, a) => acc + (a.songs?.length || 0), 0);

  // Language breakdown
  const langMap = {};
  albums.forEach((a) => {
    const l = a.lang || "Unknown";
    langMap[l] = (langMap[l] || 0) + 1;
  });

  // Type breakdown
  const typeMap = {};
  albums.forEach((a) => {
    const t = a.albumtype || "Unknown";
    typeMap[t] = (typeMap[t] || 0) + 1;
  });

  const card = darkMode ? "bg-gray-800/60 border-gray-700/50" : "bg-white border-gray-200 shadow-sm";
  const subText = darkMode ? "text-gray-400" : "text-gray-500";

  const statCards = [
    { label: "Albums",          value: albums.length,         icon: MdAlbum,    color: "text-purple-400", bg: "bg-purple-500/10" },
    { label: "Songs",           value: totalSongs,            icon: FaMusic,    color: "text-green-400",  bg: "bg-green-500/10"  },
    { label: "Liked Songs",     value: likedSongs.length,     icon: FaMusic,    color: "text-red-400",    bg: "bg-red-500/10"    },
    { label: "Playlists",       value: playlists.length,      icon: MdCategory, color: "text-blue-400",   bg: "bg-blue-500/10"   },
    { label: "Recently Played", value: recentlyPlayed.length, icon: FaMusic,    color: "text-orange-400", bg: "bg-orange-500/10" },
  ];

  function BarChart({ data, total }) {
    return (
      <div className="space-y-2">
        {Object.entries(data).sort((a, b) => b[1] - a[1]).map(([key, count]) => (
          <div key={key} className="flex items-center gap-3">
            <span className={`text-xs w-24 truncate shrink-0 ${subText}`}>{key}</span>
            <div className={`flex-1 h-2 rounded-full overflow-hidden ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
              <div
                className="h-full bg-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${(count / total) * 100}%` }}
              />
            </div>
            <span className={`text-xs w-6 text-right shrink-0 ${subText}`}>{count}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto pb-10">
      <div className="mb-6">
        <h1 className="text-2xl font-black">Stats</h1>
        <p className={`text-sm mt-0.5 ${subText}`}>Overview of your Musify content</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`rounded-2xl border p-4 ${card}`}>
            <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}>
              <Icon size={16} className={color} />
            </div>
            <p className="text-xl font-black">{loading && label === "Albums" ? "—" : value}</p>
            <p className={`text-xs mt-0.5 ${subText}`}>{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Language breakdown */}
        <div className={`rounded-2xl border p-5 ${card}`}>
          <div className="flex items-center gap-2 mb-4">
            <MdLanguage className="text-purple-400" size={18} />
            <h2 className="font-bold text-sm">Albums by Language</h2>
          </div>
          {loading ? (
            <div className="h-24 skeleton-shimmer rounded-xl" />
          ) : Object.keys(langMap).length === 0 ? (
            <p className={`text-sm ${subText}`}>No data</p>
          ) : (
            <BarChart data={langMap} total={albums.length} />
          )}
        </div>

        {/* Type breakdown */}
        <div className={`rounded-2xl border p-5 ${card}`}>
          <div className="flex items-center gap-2 mb-4">
            <MdCategory className="text-green-400" size={18} />
            <h2 className="font-bold text-sm">Albums by Type</h2>
          </div>
          {loading ? (
            <div className="h-24 skeleton-shimmer rounded-xl" />
          ) : Object.keys(typeMap).length === 0 ? (
            <p className={`text-sm ${subText}`}>No data</p>
          ) : (
            <BarChart data={typeMap} total={albums.length} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
