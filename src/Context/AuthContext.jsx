import { createContext, useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { _Auth } from "../Backend/Firebase";
import { storage, addToRecentlyPlayed } from "../utils/storage";

export const Mygarage = createContext();

export const AuthContext = ({ children }) => {
  // ── Auth ──────────────────────────────────────────────────────────────
  const [authuser, setAuthuser] = useState(null);

  // ── Player state ──────────────────────────────────────────────────────
  const [songs, setSongs] = useState([]);           // current album/queue source
  const [queue, setQueue] = useState([]);           // "Up Next" queue
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [shuffle, setShuffle] = useState(() => storage.get("musify_shuffle", false));
  const [repeat, setRepeat] = useState(() => storage.get("musify_repeat", "off")); // off | one | all
  const [volume, setVolume] = useState(() => storage.get("musify_volume", 80));
  const audioRef = useRef(new Audio());

  // ── User data (persisted) ─────────────────────────────────────────────
  const [likedSongs, setLikedSongs] = useState(() => storage.get("musify_liked", []));
  const [playlists, setPlaylists] = useState(() => storage.get("musify_playlists", []));
  const [recentlyPlayed, setRecentlyPlayed] = useState(() => storage.get("musify_recent", []));

  // ── UI state ──────────────────────────────────────────────────────────
  const [darkMode, setDarkMode] = useState(() => storage.get("musify_dark", true));
  const [searchQuery, setSearchQuery] = useState("");

  // ── Auth listener ─────────────────────────────────────────────────────
  useEffect(() => {
    const unsub = onAuthStateChanged(_Auth, (user) => {
      setAuthuser(user && user.emailVerified ? user : null);
    });
    return () => unsub();
  }, []);

  // ── Persist preferences ───────────────────────────────────────────────
  useEffect(() => { storage.set("musify_shuffle", shuffle); }, [shuffle]);
  useEffect(() => { storage.set("musify_repeat", repeat); }, [repeat]);
  useEffect(() => { storage.set("musify_volume", volume); audioRef.current.volume = volume / 100; }, [volume]);
  useEffect(() => { storage.set("musify_dark", darkMode); }, [darkMode]);
  useEffect(() => { storage.set("musify_liked", likedSongs); }, [likedSongs]);
  useEffect(() => { storage.set("musify_playlists", playlists); }, [playlists]);

  // ── Load + play when song changes ─────────────────────────────────────
  useEffect(() => {
    if (currentSongIndex === null || songs.length === 0) return;
    const song = songs[currentSongIndex];
    if (!song?.url) return;
    audioRef.current.src = song.url;
    audioRef.current.load();
    audioRef.current.play().catch((e) => console.error("Playback error:", e));
    setIsPlaying(true);
    // Track recently played
    const entry = { ...song, playedAt: Date.now() };
    addToRecentlyPlayed(entry);
    setRecentlyPlayed(storage.get("musify_recent", []));
  }, [currentSongIndex, songs]);

  // ── Sync play/pause ───────────────────────────────────────────────────
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // ── Set initial volume ────────────────────────────────────────────────
  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, []);

  // ── Keyboard shortcuts ────────────────────────────────────────────────
  useEffect(() => {
    function handleKey(e) {
      const tag = e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.code === "Space") { e.preventDefault(); setIsPlaying((p) => !p); }
      if (e.code === "ArrowRight") handleNext();
      if (e.code === "ArrowLeft") handlePrev();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentSongIndex, songs]);

  // ── Navigation helpers ────────────────────────────────────────────────
  const handleNext = useCallback(() => {
    if (songs.length === 0) return;
    if (repeat === "one") {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
      return;
    }
    if (shuffle) {
      const next = Math.floor(Math.random() * songs.length);
      setCurrentSongIndex(next);
    } else if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex((i) => i + 1);
    } else if (repeat === "all") {
      setCurrentSongIndex(0);
    } else {
      setIsPlaying(false);
    }
  }, [currentSongIndex, songs, shuffle, repeat]);

  const handlePrev = useCallback(() => {
    if (audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }
    if (currentSongIndex > 0) setCurrentSongIndex((i) => i - 1);
  }, [currentSongIndex]);

  // ── Like / Unlike ─────────────────────────────────────────────────────
  const toggleLike = useCallback((song) => {
    setLikedSongs((prev) => {
      const exists = prev.find((s) => s.id === song.id);
      if (exists) {
        toast("Removed from Liked Songs");
        return prev.filter((s) => s.id !== song.id);
      }
      toast.success("Added to Liked Songs ❤️");
      return [song, ...prev];
    });
  }, []);

  const isLiked = useCallback((songId) => likedSongs.some((s) => s.id === songId), [likedSongs]);

  // ── Playlists ─────────────────────────────────────────────────────────
  const createPlaylist = useCallback((name) => {
    const newPl = { id: Date.now().toString(), name, songs: [], createdAt: Date.now() };
    setPlaylists((prev) => {
      const updated = [newPl, ...prev];
      storage.set("musify_playlists", updated);
      return updated;
    });
    toast.success(`Playlist "${name}" created`);
    return newPl.id;
  }, []);

  const deletePlaylist = useCallback((id) => {
    setPlaylists((prev) => prev.filter((p) => p.id !== id));
    toast("Playlist deleted");
  }, []);

  const addSongToPlaylist = useCallback((playlistId, song) => {
    setPlaylists((prev) =>
      prev.map((pl) => {
        if (pl.id !== playlistId) return pl;
        if (pl.songs.find((s) => s.id === song.id)) {
          toast("Already in playlist");
          return pl;
        }
        toast.success("Added to playlist");
        return { ...pl, songs: [...pl.songs, song] };
      })
    );
  }, []);

  const removeSongFromPlaylist = useCallback((playlistId, songId) => {
    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.id === playlistId ? { ...pl, songs: pl.songs.filter((s) => s.id !== songId) } : pl
      )
    );
  }, []);

  // ── Queue ─────────────────────────────────────────────────────────────
  const addToQueue = useCallback((song) => {
    setQueue((prev) => [...prev, song]);
    toast.success("Added to queue");
  }, []);

  const clearQueue = useCallback(() => setQueue([]), []);

  // ── Auth ──────────────────────────────────────────────────────────────
  async function logout() {
    await signOut(_Auth);
    setAuthuser(null);
    audioRef.current.pause();
    toast.success("Logged out successfully");
    window.location.assign("/");
  }

  return (
    <Mygarage.Provider
      value={{
        // auth
        authuser, logout,
        // player
        songs, setSongs,
        queue, setQueue, addToQueue, clearQueue,
        isPlaying, setIsPlaying,
        currentSongIndex, setCurrentSongIndex,
        shuffle, setShuffle,
        repeat, setRepeat,
        volume, setVolume,
        audioRef,
        handleNext, handlePrev,
        // user data
        likedSongs, toggleLike, isLiked,
        playlists, createPlaylist, deletePlaylist, addSongToPlaylist, removeSongFromPlaylist,
        recentlyPlayed,
        // ui
        darkMode, setDarkMode,
        searchQuery, setSearchQuery,
      }}
    >
      {children}
    </Mygarage.Provider>
  );
};
