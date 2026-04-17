import { useContext } from "react";
import Logo from "./Logo";
import Menu from "./Menu";
import { Mygarage } from "../Context/AuthContext";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(Mygarage);

  return (
    <nav className={`sticky top-0 z-40 flex h-[70px] px-6 md:px-10 justify-between items-center backdrop-blur-md border-b transition-colors ${
      darkMode
        ? "bg-gray-950/90 border-gray-800 text-white"
        : "bg-white/90 border-gray-200 text-gray-900 shadow-sm"
    }`}>
      <Logo />
      <div className="flex items-center gap-2">
        <button
          onClick={() => setDarkMode((d) => !d)}
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          className={`p-2 rounded-full transition-all duration-200 ${
            darkMode ? "text-yellow-400 hover:bg-white/10" : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          {darkMode ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
        </button>
        <Menu />
      </div>
    </nav>
  );
};

export default Navbar;
