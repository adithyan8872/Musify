import { useContext, useState } from "react";
import { Mygarage } from "../Context/AuthContext";
import { NavLink } from "react-router-dom";
import { MdLogout, MdAdminPanelSettings, MdPerson } from "react-icons/md";

const Menu = () => {
  const { authuser, logout, darkMode, isAdmin } = useContext(Mygarage);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const linkBase = `px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150`;
  const linkStyle = darkMode
    ? `${linkBase} text-gray-300 hover:text-white hover:bg-white/10`
    : `${linkBase} text-gray-600 hover:text-gray-900 hover:bg-gray-100`;

  if (!authuser) {
    return (
      <ul className="flex items-center gap-2">
        <li>
          <NavLink to="/login" className={linkStyle}>Login</NavLink>
        </li>
        <li>
          <NavLink
            to="/register"
            className="px-4 py-1.5 rounded-full text-sm font-semibold bg-green-500 hover:bg-green-400 text-black transition"
          >
            Sign Up
          </NavLink>
        </li>
      </ul>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Admin link — only shown when role === "admin" */}
      {isAdmin && (
        <NavLink
          to="/admin"
          className={`flex items-center gap-1.5 ${linkStyle}`}
        >
          <MdAdminPanelSettings size={16} />
          Admin
        </NavLink>
      )}

      {/* Avatar dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen((o) => !o)}
          className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-white/10 transition"
        >
          {authuser.photoURL ? (
            <img
              src={authuser.photoURL}
              alt={authuser.displayName}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-green-500"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
              <MdPerson size={18} className="text-white" />
            </div>
          )}
          <span className={`text-sm font-medium hidden md:block ${darkMode ? "text-white" : "text-gray-800"}`}>
            {authuser.displayName || authuser.email?.split("@")[0]}
          </span>
        </button>

        {dropdownOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
            <div className={`absolute right-0 top-11 w-52 rounded-xl shadow-2xl z-50 overflow-hidden border ${darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}>
              {/* User info */}
              <div className={`px-4 py-3 border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                <p className={`text-sm font-semibold truncate ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {authuser.displayName || "User"}
                </p>
                <p className={`text-xs truncate mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {authuser.email}
                </p>
              </div>
              <NavLink
                to="/profile/myaccount"
                onClick={() => setDropdownOpen(false)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm transition ${darkMode ? "text-gray-300 hover:bg-gray-800 hover:text-white" : "text-gray-700 hover:bg-gray-50"}`}
              >
                <MdPerson size={16} /> Profile
              </NavLink>
              <button
                onClick={() => { setDropdownOpen(false); logout(); }}
                className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition text-red-400 hover:text-red-300 ${darkMode ? "hover:bg-gray-800" : "hover:bg-red-50"}`}
              >
                <MdLogout size={16} /> Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
