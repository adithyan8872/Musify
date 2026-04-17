import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Mygarage } from "../Context/AuthContext";
import {
  MdAccountCircle, MdAddPhotoAlternate, MdLock,
  MdPersonAdd, MdSettings,
} from "react-icons/md";

const links = [
  { to: "/profile/myaccount",      icon: MdAccountCircle,    label: "My Account"       },
  { to: "/profile/changepassword", icon: MdLock,             label: "Change Password"  },
  { to: "/profile/addprofile",     icon: MdPersonAdd,        label: "Add Profile"      },
  { to: "/profile/settings",       icon: MdSettings,         label: "Settings"         },
  { to: "/profile/uploadphoto",    icon: MdAddPhotoAlternate,label: "Upload Photo"     },
];

const ProfileSidebar = () => {
  const { darkMode, authuser } = useContext(Mygarage);

  return (
    <aside className={`w-60 shrink-0 flex flex-col border-r ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
      {/* Avatar */}
      <div className="p-6 flex flex-col items-center gap-3 border-b border-gray-800/50">
        <div className="relative">
          <img
            src={authuser?.photoURL || `https://ui-avatars.com/api/?name=${authuser?.displayName || "U"}&background=22c55e&color=000&size=80`}
            alt="avatar"
            className="w-16 h-16 rounded-full object-cover ring-2 ring-green-500 shadow-lg"
          />
          <NavLink to="/profile/uploadphoto"
            className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow"
            title="Change photo">
            <MdAddPhotoAlternate size={14} className="text-black" />
          </NavLink>
        </div>
        <div className="text-center">
          <p className={`font-semibold text-sm ${darkMode ? "text-white" : "text-gray-900"}`}>
            {authuser?.displayName || "User"}
          </p>
          <p className={`text-xs truncate max-w-[160px] mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {authuser?.email}
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3">
        <ul className="flex flex-col gap-1">
          {links.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-green-500/15 text-green-400 shadow-inner"
                      : darkMode
                        ? "text-gray-400 hover:text-white hover:bg-white/8"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
