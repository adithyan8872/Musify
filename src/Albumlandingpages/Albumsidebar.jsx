import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Mygarage } from "../Context/AuthContext";
import {
  MdHome, MdSearch, MdLibraryMusic, MdFavorite,
  MdHistory, MdMusicNote,
} from "react-icons/md";

const navItems = [
  { to: "/albums",  icon: MdHome,         label: "Home"            },
  { to: "/search",  icon: MdSearch,       label: "Search"          },
  { to: "/library", icon: MdLibraryMusic, label: "Library"         },
  { to: "/liked",   icon: MdFavorite,     label: "Liked Songs"     },
  { to: "/recent",  icon: MdHistory,      label: "Recently Played" },
];

// Gradient placeholder for playlists without a cover image
function PlaylistThumb({ pl }) {
  const colors = [
    "from-purple-600 to-blue-600",
    "from-green-600 to-teal-600",
    "from-red-600 to-pink-600",
    "from-orange-500 to-yellow-500",
    "from-indigo-600 to-purple-600",
  ];
  const gradient = colors[pl.name.charCodeAt(0) % colors.length];
  if (pl.songs[0]?.songThumbnail) {
    return <img src={pl.songs[0].songThumbnail} alt="" className="w-6 h-6 rounded object-cover shrink-0" />;
  }
  return (
    <div className={`w-6 h-6 rounded bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}>
      <MdMusicNote size={12} className="text-white/80" />
    </div>
  );
}

const Albumsidebar = () => {
  const { playlists, darkMode, likedSongs } = useContext(Mygarage);

  const sidebarBg = darkMode
    ? "bg-gray-950 border-gray-800/60"
    : "bg-white border-gray-200";

  const activeLink = "bg-green-500/15 text-green-400";
  const inactiveLink = darkMode
    ? "text-gray-400 hover:text-white hover:bg-white/8"
    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100";

  return (
    <aside className={`w-56 shrink-0 flex flex-col border-r min-h-[calc(100vh-70px)] ${sidebarBg}`}>
      {/* Main nav */}
      <nav className="p-3 pb-2">
        <ul className="flex flex-col gap-0.5">
          {navItems.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/albums"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? activeLink : inactiveLink}`
                }
              >
                <Icon size={18} className="shrink-0" />
                <span className="truncate">{label}</span>
                {label === "Liked Songs" && likedSongs.length > 0 && (
                  <span className="ml-auto text-xs bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full">
                    {likedSongs.length}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Divider */}
      <div className={`mx-3 border-t ${darkMode ? "border-gray-800" : "border-gray-100"}`} />

      {/* Playlists */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-3 pt-2">
        <p className={`text-xs font-bold uppercase tracking-widest px-2 mb-2 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
          Playlists
        </p>
        {playlists.length === 0 && (
          <p className={`text-xs px-2 py-1 ${darkMode ? "text-gray-700" : "text-gray-400"}`}>
            No playlists yet
          </p>
        )}
        <ul className="flex flex-col gap-0.5">
          {playlists.map((pl) => (
            <li key={pl.id}>
              <NavLink
                to={`/playlist/${pl.id}`}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-2 py-2 rounded-xl text-sm transition-all ${isActive ? activeLink : inactiveLink}`
                }
              >
                <PlaylistThumb pl={pl} />
                <span className="truncate flex-1">{pl.name}</span>
                {pl.songs.length > 0 && (
                  <span className={`text-xs shrink-0 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
                    {pl.songs.length}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Albumsidebar;
