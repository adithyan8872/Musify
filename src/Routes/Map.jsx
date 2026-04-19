import { createBrowserRouter } from "react-router-dom";
import Layout from "../Navbar_Block/Layout";
import { Home } from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Resetpassword from "../Pages/Resetpassword";
import Search from "../Pages/Search";
import Library from "../Pages/Library";
import LikedSongs from "../Pages/LikedSongs";
import RecentlyPlayed from "../Pages/RecentlyPlayed";
import PlaylistDetail from "../Pages/PlaylistDetail";
import MoviePlaylistDetail from "../Pages/MoviePlaylistDetail";
import Profilecontainer from "../UserProfile/Profilecontainer";
import { Myaccount } from "../UserProfile/Sidebarpages/Myaccount";
import Changepassword from "../UserProfile/Sidebarpages/Changepassword";
import Addprofile from "../UserProfile/Sidebarpages/Addprofile";
import Settings from "../UserProfile/Sidebarpages/Settings";
import Uploadphoto from "../UserProfile/Sidebarpages/Uploadphoto";
import Admincontainer from "../Admin/Admincontainer";
import Createalbum from "../Admin/Album/Createalbum";
import AdminDashboard from "../Admin/Pages/AdminDashboard";
import ManageAlbums from "../Admin/Pages/ManageAlbums";
import AdminStats from "../Admin/Pages/AdminStats";
import AlbumContainer from "../Albumlandingpages/AlbumContainer";
import Albums from "../Albumlandingpages/Albumpages/Albums";
import AlbumDetails from "../Albumlandingpages/Albumpages/AlbumDetails";
import RequireAdmin from "./RequireAdmin";

export const mymap = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/",              element: <Home />           },
      { path: "/login",         element: <Login />          },
      { path: "/reset",         element: <Resetpassword />  },
      { path: "/register",      element: <Register />       },
      { path: "/search",        element: <Search />         },
      { path: "/liked",         element: <LikedSongs />     },
      { path: "/recent",        element: <RecentlyPlayed /> },
      { path: "/playlist/:id",       element: <PlaylistDetail />      },
      { path: "/movie-playlist/:id", element: <MoviePlaylistDetail /> },
      { path: "/library",       element: <Library />        },

      // ── Profile ──────────────────────────────────────────────────────
      {
        path: "/profile",
        element: <Profilecontainer />,
        children: [
          { path: "myaccount",      element: <Myaccount />      },
          { path: "changepassword", element: <Changepassword /> },
          { path: "Addprofile",     element: <Addprofile />     },
          { path: "settings",       element: <Settings />       },
          { path: "uploadphoto",    element: <Uploadphoto />    },
        ],
      },

      // ── Admin (role-protected) ────────────────────────────────────────
      {
        path: "/admin",
        element: <RequireAdmin><Admincontainer /></RequireAdmin>,
        children: [
          { index: true,          element: <AdminDashboard /> },
          { path: "upload",       element: <Createalbum />    },
          { path: "manage",       element: <ManageAlbums />   },
          { path: "stats",        element: <AdminStats />     },
        ],
      },

      // ── Albums ────────────────────────────────────────────────────────
      {
        path: "/albums",
        element: <AlbumContainer />,
        children: [
          { index: true,                    element: <Albums />      },
          { path: "albumDetails/:title",    element: <AlbumDetails /> },
        ],
      },
    ],
  },
]);
