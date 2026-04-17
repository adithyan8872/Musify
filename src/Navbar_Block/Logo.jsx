import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Mygarage } from "../Context/AuthContext";

function Logo() {
  const { darkMode } = useContext(Mygarage);
  return (
    <NavLink to="/albums" className="flex items-center gap-2 group">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition">
        <span className="text-black font-black text-sm">M</span>
      </div>
      <span className={`font-black text-2xl tracking-tight ${darkMode ? "text-white" : "text-gray-900"}`}>
        Musify
      </span>
    </NavLink>
  );
}

export default Logo;
