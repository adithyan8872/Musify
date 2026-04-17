import React from "react";
import { NavLink } from "react-router-dom";


const Adminsidebar = () => {
  return (
    <section className='w-[18%] h-swv bg-slate-500 text-white'>
      <nav>
        <ul className="px-5 ">
          <li>
            <NavLink
              to="/admin"
              className="hover:bg-slate-400 py-3 pl-2 w-full rounded flex"
            >
              {/* <MdAccountBox className="text-2xl pr-1" /> */}

              <h1>Create album</h1>
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/profile/changepassword"
              className="hover:bg-slate-400 py-3 pl-2 w-full rounded flex"
            >
              <TbPasswordUser className="text-xl pr-1"/>

              Change password
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile/addprofile"
              className="hover:bg-slate-400 py-3 pl-2 w-full flex rounded"
            >
              <MdPersonAddAlt1 className="text-2xl pr-1"/>

              Add Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile/settings"
              className="hover:bg-slate-400 py-3 pl-2 w-full flex rounded"
            >
              <IoSettingsOutline className="text-2xl pr-1"/>
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile/uploadphoto"
              className="hover:bg-slate-400 py-2 pl-2 w-full flex rounded"
            >
              <MdAddPhotoAlternate className="text-2xl pr-1"/>
              Uploadphoto
            </NavLink>
          </li> */}
        </ul>
      </nav>
    </section>
  );
};

export default Adminsidebar;
