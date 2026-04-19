import { useContext, useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { _DB } from "../../Backend/Firebase";
import { Mygarage } from "../../Context/AuthContext";
import { NavLink } from "react-router-dom";
import { MdLibraryAdd, MdPlaylistAdd, MdBarChart, MdAlbum } from "react-icons/md";
import { FaMusic } from "react-icons/fa";

const AdminDashboard = () => {
  const { darkMode, playlists } = useContext(Mygarage);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(_DB, "music_musify"))
      .then((snap) => setAlbums(snap.docs.map((d) => ({ id: d.id, ...d.data() }))))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalSongs = albums.reduce((acc, a) => acc + (a.songs?.length || 0), 0);

  const card = darkMode ? "bg-gray-800/60 border-gray-700/50" : "bg-white border-gray-200 shadow-sm";
  const subText = darkMode ? "text-gray-400" : "text-gray-500";

  const stats = [
    { label: "Total Albums",    value: albums.length,    icon: MdAlbum,       color: "text-purple-400", bg: "bg-purple-500/10" },
    { label: "Total Songs",     value: totalSongs,       icon: FaMusic,       color: "text-green-400",  bg: "bg-green-500/10"  },
    { label: "My Playlists",    value: playlists.length, icon: MdPlaylistAdd, color: "text-blue-400",   bg: "bg-blue-500/10"   },
  ];

  const quickLinks = [
    { to: "/admin/upload",  icon: MdLibraryAdd,  label: "Create Album",  desc: "Upload a new album with songs",  color: "from-purple-600 to-indigo-600" },
    { to: "/admin/manage",  icon: MdPlaylistAdd, label: "Manage Albums", desc: "Edit or delete existing albums", color: "from-green-600 to-teal-600"    },
    { to: "/admin/stats",   icon: MdBarChart,    label: "View Stats",    desc: "See upload and play statistics", color: "from-orange-500 to-red-500"    },
  ];

  return (
    <div className="flex-1 p-6 overflow-y-auto pb-10">
      <div className="mb-6">
        <h1 className="text-2xl font-black">Admin Dashboard</h1>
        <p className={`text-sm mt-0.5 ${subText}`}>Manage your Musify content</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`rounded-2xl border p-5 flex items-center gap-4 ${card}`}>
            <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center`}>
              <Icon size={22} className={color} />
            </div>
            <div>
              <p className={`text-xs font-semibold uppercase tracking-wider ${subText}`}>{label}</p>
              <p className="text-2xl font-black mt-0.5">{loading ? "—" : value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <h2 className={`text-sm font-bold uppercase tracking-widest mb-3 ${subText}`}>Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {quickLinks.map(({ to, icon: Icon, label, desc, color }) => (
          <NavLink key={to} to={to}>
            <div className={`group rounded-2xl bg-gradient-to-br ${color} p-5 cursor-pointer hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl`}>
              <Icon size={28} className="text-white mb-3" />
              <p className="text-white font-bold text-base">{label}</p>
              <p className="text-white/70 text-xs mt-1">{desc}</p>
            </div>
          </NavLink>
        ))}
      </div>

      {/* Recent albums */}
      <h2 className={`text-sm font-bold uppercase tracking-widest mb-3 ${subText}`}>Recent Albums</h2>
      <div className={`rounded-2xl border overflow-hidden ${card}`}>
        {loading ? (
          <div className="p-6 text-center">
            <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : albums.length === 0 ? (
          <p className={`text-center py-8 text-sm ${subText}`}>No albums yet. Create one!</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b text-xs uppercase tracking-wider ${darkMode ? "border-gray-700 text-gray-500" : "border-gray-100 text-gray-400"}`}>
                <th className="px-4 py-3 text-left">Album</th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">Language</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">Type</th>
                <th className="px-4 py-3 text-right">Songs</th>
              </tr>
            </thead>
            <tbody>
              {albums.slice(0, 8).map((album) => (
                <tr key={album.id} className={`border-b last:border-0 ${darkMode ? "border-gray-700/50 hover:bg-white/5" : "border-gray-50 hover:bg-gray-50"}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={album.Thumbnail || "https://placehold.co/36x36/111827/4b5563?text=♪"}
                        alt={album.title}
                        className="w-9 h-9 rounded-lg object-cover shrink-0"
                      />
                      <span className="font-medium truncate max-w-[140px]">{album.title}</span>
                    </div>
                  </td>
                  <td className={`px-4 py-3 hidden sm:table-cell ${subText}`}>{album.lang || "—"}</td>
                  <td className={`px-4 py-3 hidden md:table-cell ${subText}`}>{album.albumtype || "—"}</td>
                  <td className={`px-4 py-3 text-right ${subText}`}>{album.songs?.length || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
