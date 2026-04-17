import { useContext } from "react";
import { Outlet } from "react-router-dom";
import ProfileSidebar from "./Sidebar";
import { Mygarage } from "../Context/AuthContext";

const Profilecontainer = () => {
  const { darkMode } = useContext(Mygarage);
  return (
    <section className={`min-h-[calc(100vh-70px)] flex pb-24 ${darkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}`}>
      <ProfileSidebar />
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </section>
  );
};

export default Profilecontainer;
