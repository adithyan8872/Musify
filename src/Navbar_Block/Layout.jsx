import { useContext, useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AudioPlayer from "../Components/AudioPlayer";
import Albumsidebar from "../Albumlandingpages/Albumsidebar";
import RightPanel from "../Components/RightPanel";
import MobileNav from "../Components/MobileNav";
import { Mygarage } from "../Context/AuthContext";

// Paths that show the music sidebar + right panel
const MUSIC_PATHS = ["/albums", "/search", "/library", "/liked", "/recent", "/playlist", "/movie-playlist"];
// Paths that never show the music sidebar
const EXCLUDED_PATHS = ["/admin", "/profile", "/login", "/register", "/reset"];

const Layout = () => {
  const { darkMode, showRightPanel, songs, currentSongIndex } = useContext(Mygarage);
  const location = useLocation();

  const isMusicArea = MUSIC_PATHS.some((p) => location.pathname.startsWith(p))
    && !EXCLUDED_PATHS.some((p) => location.pathname.startsWith(p));

  // Show right panel only when a song is loaded AND we're in the music area
  const hasActiveSong = songs.length > 0 && currentSongIndex !== null;
  const showRight = isMusicArea && showRightPanel && hasActiveSong;

  // Apply dark class to <html> for Tailwind dark: variants
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const pageBg = darkMode
    ? "bg-gradient-to-br from-gray-950 via-gray-900 to-slate-900"
    : "bg-gradient-to-br from-slate-100 via-purple-50 to-indigo-50";

  return (
    <div className={`min-h-screen ${pageBg}`}>
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

      {isMusicArea ? (
        /* ── 3-column music layout ── */
        <div className="flex min-h-[calc(100vh-70px)]">
          {/* Left: Navigation sidebar */}
          <Albumsidebar />

          {/* Centre: Page content */}
          <main className="flex-1 overflow-hidden min-w-0">
            <Outlet />
          </main>

          {/* Right: Song details panel — only when a song is active */}
          {showRight && (
            <div className="hidden lg:block shrink-0 sticky top-[70px] h-[calc(100vh-70px)]">
              <RightPanel />
            </div>
          )}
        </div>
      ) : (
        /* ── Full-width layout (home, profile, admin, auth) ── */
        <Outlet />
      )}

      <AudioPlayer />
      {/* Mobile bottom nav — only in music area */}
      {isMusicArea && <MobileNav />}
    </div>
  );
};

export default Layout;
