import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Mygarage } from "../Context/AuthContext";
import { MdHome, MdSearch, MdLibraryMusic, MdFavorite, MdHistory } from "react-icons/md";

const items = [
  { to: "/albums",  icon: MdHome,         label: "Home"    },
  { to: "/search",  icon: MdSearch,       label: "Search"  },
  { to: "/library", icon: MdLibraryMusic, label: "Library" },
  { to: "/liked",   icon: MdFavorite,     label: "Liked"   },
  { to: "/recent",  icon: MdHistory,      label: "Recent"  },
];

const MobileNav = () => {
  const { darkMode, songs, currentSongIndex } = useContext(Mygarage);
  const hasPlayer = songs.length > 0 && currentSongIndex !== null;

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-30 flex md:hidden border-t ${
        darkMode ? "bg-gray-950/95 border-gray-800" : "bg-white/95 border-gray-200"
      } ${hasPlayer ? "mb-[72px]" : ""}`}
      style={{ backdropFilter: "blur(16px)" }}
    >
      {items.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/albums"}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-xs font-medium transition ${
              isActive
                ? "text-green-400"
                : darkMode ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-700"
            }`
          }
        >
          <Icon size={20} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default MobileNav;
