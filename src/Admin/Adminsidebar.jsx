import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Mygarage } from "../Context/AuthContext";
import {
  MdDashboard, MdLibraryAdd, MdPlaylistAdd,
  MdBarChart, MdArrowBack,
} from "react-icons/md";

const links = [
  { to: "/admin",         icon: MdDashboard,    label: "Dashboard",      end: true },
  { to: "/admin/upload",  icon: MdLibraryAdd,   label: "Create Album"             },
  { to: "/admin/manage",  icon: MdPlaylistAdd,  label: "Manage Albums"            },
  { to: "/admin/stats",   icon: MdBarChart,     label: "Stats"                    },
];

const Adminsidebar = () => {
  const { darkMode, authuser } = useContext(Mygarage);

  const bg = darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200";
  const active = "bg-purple-500/15 text-purple-400";
  const inactive = darkMode
    ? "text-gray-400 hover:text-white hover:bg-white/8"
    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100";

  return (
    <aside className={`w-56 shrink-0 flex flex-col border-r min-h-[calc(100vh-70px)] ${bg}`}>
      {/* Admin badge */}
      <div className={`p-5 border-b ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Admin Panel</span>
        </div>
        <p className={`text-xs truncate ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
          {authuser?.email}
        </p>
      </div>

      {/* Nav links */}
      <nav className="flex-1 p-3">
        <ul className="flex flex-col gap-0.5">
          {links.map(({ to, icon: Icon, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? active : inactive}`
                }
              >
                <Icon size={18} className="shrink-0" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Back to app */}
      <div className={`p-3 border-t ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
        <NavLink
          to="/albums"
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${inactive}`}
        >
          <MdArrowBack size={16} />
          Back to App
        </NavLink>
      </div>
    </aside>
  );
};

export default Adminsidebar;
