import { useContext } from "react";
import Adminsidebar from "./Adminsidebar";
import Admincontext from "./Admincontext";
import { Mygarage } from "../Context/AuthContext";

const Admincontainer = () => {
  const { darkMode } = useContext(Mygarage);
  return (
    <section className={`w-full min-h-[calc(100vh-70px)] flex ${darkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}`}>
      <Adminsidebar />
      <Admincontext />
    </section>
  );
};

export default Admincontainer;
