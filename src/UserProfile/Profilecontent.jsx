import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Mygarage } from "../Context/AuthContext";

const Profilecontent = () => {
  let { authuser } = useContext(Mygarage);
  return (
    <section className="w-full h-screen">
      <Outlet />

{/* <div className="flex flex-col items-center justiy-center absolute  h-[calc(100vh-70px)]">
  <h1 className="text-5xl text-white ">hello,</h1>
<img
        src={authuser?.photoURL}
        alt=""
        className="w-[220px] h-[220px] rounded-full top-[-25px] "

      />
</div> */}

    </section>
  );
};

export default Profilecontent;
