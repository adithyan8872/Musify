import { useContext, useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { _DB } from "../../Backend/Firebase";
import { Mygarage } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { MdDelete, MdSearch, MdAlbum } from "react-icons/md";
import { FaMusic } from "react-icons/fa";

const ManageAlbums = () => {
  const { darkMode } = useContext(Mygarage);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchAlbums();
  }, []);

  async function fetchAlbums() {
    setLoading(true);
    try {
      const snap = await getDocs(collection(_DB, "music_musify"));
      setAlbums(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (e) {
      toast.error("Failed to load albums");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(albumId, albumTitle) {
    if (!window.confirm(`Delete "${albumTitle}"? This cannot be undone.`)) return;
    setDeleting(albumId);
    try {
      await deleteDoc(doc(_DB, "music_musify", albumId));
      setAlbums((prev) => prev.filter((a) => a.id !== albumId));
      toast.success(`"${albumTitle}" deleted`);
    } catch (e) {
      toast.error("Delete failed: " + e.message);
    } finally {
      setDeleting(null);
    }
  }

  const filtered = albums.filter((a) =>
    a.title?.toLowerCase().includes(search.toLowerCase()) ||
    a.lang?.toLowerCase().includes(search.toLowerCase())
  );

  const card = darkMode ? "bg-gray-800/60 border-gray-700/50" : "bg-white border-gray-200 shadow-sm";
  const subText = darkMode ? "text-gray-400" : "text-gray-500";
  const inputCls = darkMode
    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400";

  return (
    <div className="flex-1 p-6 overflow-y-auto pb-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black">Manage Albums</h1>
          <p className={`text-sm mt-0.5 ${subText}`}>{albums.length} albums in database</p>
        </div>
        <div className="relative">
          <MdSearch className={`absolute left-3 top-1/2 -translate-y-1/2 ${subText}`} size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search albums..."
            className={`pl-9 pr-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition w-52 ${inputCls}`}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <MdAlbum size={48} className="mx-auto text-gray-600 mb-3" />
          <p className={subText}>{search ? `No albums matching "${search}"` : "No albums yet"}</p>
        </div>
      ) : (
        <div className={`rounded-2xl border overflow-hidden ${card}`}>
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b text-xs uppercase tracking-wider ${darkMode ? "border-gray-700 text-gray-500" : "border-gray-100 text-gray-400"}`}>
                <th className="px-4 py-3 text-left">Album</th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">Language</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">Type</th>
                <th className="px-4 py-3 text-right hidden sm:table-cell">Songs</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((album) => (
                <tr
                  key={album.id}
                  className={`border-b last:border-0 transition ${darkMode ? "border-gray-700/50 hover:bg-white/5" : "border-gray-50 hover:bg-gray-50"}`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={album.Thumbnail || "https://placehold.co/40x40/111827/4b5563?text=♪"}
                        alt={album.title}
                        className="w-10 h-10 rounded-xl object-cover shrink-0"
                      />
                      <div className="overflow-hidden">
                        <p className="font-semibold truncate max-w-[160px]">{album.title}</p>
                        <p className={`text-xs truncate ${subText}`}>{album.daterelease || "—"}</p>
                      </div>
                    </div>
                  </td>
                  <td className={`px-4 py-3 hidden sm:table-cell ${subText}`}>{album.lang || "—"}</td>
                  <td className={`px-4 py-3 hidden md:table-cell ${subText}`}>{album.albumtype || "—"}</td>
                  <td className={`px-4 py-3 text-right hidden sm:table-cell ${subText}`}>
                    <span className="flex items-center justify-end gap-1">
                      <FaMusic size={10} /> {album.songs?.length || 0}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(album.id, album.title)}
                      disabled={deleting === album.id}
                      className="flex items-center gap-1 ml-auto text-xs text-red-400 hover:text-red-300 disabled:opacity-40 transition px-2 py-1 rounded-lg hover:bg-red-500/10"
                    >
                      {deleting === album.id ? (
                        <div className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <MdDelete size={15} />
                      )}
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageAlbums;
