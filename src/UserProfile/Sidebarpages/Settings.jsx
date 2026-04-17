import { useContext, useState } from "react";
import { Mygarage } from "../../Context/AuthContext";
import { storage } from "../../utils/storage";
import { MdDarkMode, MdLightMode, MdNotifications, MdNotificationsOff, MdVolumeUp } from "react-icons/md";
import { FaRandom, FaRedo } from "react-icons/fa";

const Settings = () => {
  const { darkMode, setDarkMode, volume, setVolume, shuffle, setShuffle, repeat, setRepeat, audioRef } = useContext(Mygarage);

  const [notif, setNotif] = useState(() => storage.get("musify_notif", true));
  const [autoplay, setAutoplay] = useState(() => storage.get("musify_autoplay", true));
  const [quality, setQuality] = useState(() => storage.get("musify_quality", "high"));

  function toggle(setter, storageKey, current) {
    setter(!current);
    storage.set(storageKey, !current);
  }

  function handleVolChange(e) {
    const v = Number(e.target.value);
    setVolume(v);
    audioRef.current.volume = v / 100;
  }

  const card = darkMode ? "bg-gray-800/60 border-gray-700/50" : "bg-white border-gray-200 shadow-sm";
  const rowCls = `flex items-center justify-between py-3 border-b ${darkMode ? "border-gray-700/50 last:border-0" : "border-gray-100 last:border-0"}`;
  const labelCls = `text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`;
  const subCls = `text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`;

  function ToggleSwitch({ on, onClick }) {
    return (
      <button
        onClick={onClick}
        className={`w-10 h-5 rounded-full relative transition-colors ${on ? "bg-green-500" : darkMode ? "bg-gray-600" : "bg-gray-300"}`}
      >
        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
      </button>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black gradient-text">Settings</h1>
        <p className={`text-sm mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Customise your Musify experience</p>
      </div>

      {/* Appearance */}
      <div className={`rounded-2xl border p-4 mb-4 ${card}`}>
        <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Appearance</p>
        <div className={rowCls}>
          <div>
            <p className={labelCls}>Dark Mode</p>
            <p className={subCls}>Switch between dark and light theme</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${darkMode ? "bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30" : "bg-gray-800 text-white hover:bg-gray-700"}`}
          >
            {darkMode ? <MdLightMode size={14} /> : <MdDarkMode size={14} />}
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>
      </div>

      {/* Playback */}
      <div className={`rounded-2xl border p-4 mb-4 ${card}`}>
        <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Playback</p>
        <div className={rowCls}>
          <div>
            <p className={labelCls}>Volume</p>
            <p className={subCls}>{volume}%</p>
          </div>
          <div className="flex items-center gap-2">
            <MdVolumeUp className={darkMode ? "text-gray-400" : "text-gray-500"} />
            <input
              type="range" min="0" max="100" value={volume}
              onChange={handleVolChange}
              className="w-24 h-1.5 accent-green-400 cursor-pointer"
            />
          </div>
        </div>
        <div className={rowCls}>
          <div>
            <p className={labelCls}>Shuffle</p>
            <p className={subCls}>Randomise song order</p>
          </div>
          <ToggleSwitch on={shuffle} onClick={() => setShuffle(!shuffle)} />
        </div>
        <div className={rowCls}>
          <div>
            <p className={labelCls}>Repeat</p>
            <p className={subCls}>Current: {repeat}</p>
          </div>
          <button
            onClick={() => setRepeat(r => r === "off" ? "all" : r === "all" ? "one" : "off")}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition ${repeat !== "off" ? "bg-green-500/20 text-green-400" : darkMode ? "bg-gray-700 text-gray-400" : "bg-gray-200 text-gray-500"}`}
          >
            {repeat === "off" ? "Off" : repeat === "all" ? "All" : "One"}
          </button>
        </div>
        <div className={rowCls}>
          <div>
            <p className={labelCls}>Auto-play</p>
            <p className={subCls}>Play next song automatically</p>
          </div>
          <ToggleSwitch on={autoplay} onClick={() => toggle(setAutoplay, "musify_autoplay", autoplay)} />
        </div>
      </div>

      {/* Notifications */}
      <div className={`rounded-2xl border p-4 mb-4 ${card}`}>
        <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Notifications</p>
        <div className={rowCls}>
          <div className="flex items-center gap-2">
            {notif ? <MdNotifications size={18} className="text-green-400" /> : <MdNotificationsOff size={18} className="text-gray-500" />}
            <div>
              <p className={labelCls}>Toast Notifications</p>
              <p className={subCls}>Song liked, added to playlist, etc.</p>
            </div>
          </div>
          <ToggleSwitch on={notif} onClick={() => toggle(setNotif, "musify_notif", notif)} />
        </div>
      </div>

      {/* Audio quality (mock) */}
      <div className={`rounded-2xl border p-4 ${card}`}>
        <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Audio Quality</p>
        <div className="flex gap-2">
          {["low", "medium", "high"].map((q) => (
            <button
              key={q}
              onClick={() => { setQuality(q); storage.set("musify_quality", q); }}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize transition ${quality === q ? "bg-green-500 text-black" : darkMode ? "bg-gray-700 text-gray-400 hover:bg-gray-600" : "bg-gray-200 text-gray-500 hover:bg-gray-300"}`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
