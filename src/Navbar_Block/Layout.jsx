import { useContext, useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AudioPlayer from "../Components/AudioPlayer";
import Albumsidebar from "../Albumlandingpages/Albumsidebar";
import { Mygarage } from "../Context/AuthContext";

const SIDEBAR_PATHS = ["/albums", "/search", "/library", "/liked", "/recent", "/playlist", "/movie-playlist"];

const Layout = () => {
  const { darkMode } = useContext(Mygarage);
  const location = useLocation();
  const showSidebar = SIDEBAR_PATHS.some((p) => location.pathname.startsWith(p));

  // Apply dark class to <html> so Tailwind dark: variants work globally
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gradient-to-br from-gray-950 via-gray-900 to-slate-900" : "bg-gradient-to-br from-slate-100 via-purple-50 to-indigo-50"}`}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: darkMode ? "#1f2937" : "#fff",
            color: darkMode ? "#fff" : "#111",
            border: darkMode ? "1px solid #374151" : "1px solid #e5e7eb",
          },
        }}
      />
      <Navbar />
      {showSidebar ? (
        <section className="flex min-h-[calc(100vh-70px)]">
          <Albumsidebar />
          <div className="flex-1 overflow-hidden min-w-0">
            <Outlet />
          </div>
        </section>
      ) : (
        <Outlet />
      )}
      <AudioPlayer />
    </div>
  );
};

export default Layout;
