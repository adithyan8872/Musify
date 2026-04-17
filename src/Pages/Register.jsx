import {createUserWithEmailAndPassword,sendEmailVerification, updateProfile,} from "firebase/auth";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { _Auth } from "../Backend/Firebase";

const Register = () => {

  let navigate = useNavigate();
  let [data, setdata] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  let { username, email, password, confirmPassword } = data;

  function handleChange(e) {
    setdata({ ...data, [e.target.name]: e.target.value });
  }

  const [eye1, seteye1] = useState(false);

  function handleclick() {
    seteye1(!eye1);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (password === confirmPassword) {
        let userdata = await createUserWithEmailAndPassword(
          _Auth,
          email,
          password
        );

        sendEmailVerification(userdata.user);
        console.log(userdata.user);
        
        toast.success("veriication complete");

        updateProfile(userdata.user,{
          displayName:username,
          photoURL:"https://imgs.search.brave.com/_ap3ygzfkN5NL_Foe4JVbYL6nUbTGMIe2tzXpJXxF7Y/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzgzLzkwLzk1/LzM2MF9GXzQ4Mzkw/OTU2OV9PSTRMS05l/RmdId3Z2Vmp1NjBm/ZWpMZDlnajQzZElj/ZC5qcGc"
        })


        navigate('/login')

      } else {
        toast.error("invalid password");
      }
    } catch (error) {
      toast.error("error find " + error.code);
    }
  



}

  return (
    <section className="w-full h-[calc(100vh-70px)] bg-slate-700 flex items-center justify-center flex-col">
      <header>
        <h1 className="text-3xl text-purple-300 font-bold tracking-wider">
          Register
        </h1>
      </header>
      <main>
        <form
          className="w-[400px] bg-slate-800 border-b-2 h-auto mt-4 p-5 rounded-lg "
          onSubmit={handleSubmit}
        >
          <div className="py-2">
            <label className="text-white tracking-widest font-bold">
              Username
            </label>

            <input
              type="text"
              id="name"
              placeholder="enter the name"
              className="w-full p-2 rounded bg-gray-800 text-black border border-gray-600 focus:outline-none focus:border-purple-400 placeholder:text-white "
              onChange={handleChange}
              value={username}
              name="username"
            />
          </div>

          <div className="py-2">
            <label className="block text-white mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter the email"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-purple-400 placeholder:text-white"
              required
            />
          </div>

          <div className="py-2 ">
            <label className="block text-white mb-1">Password</label>
            <input
              type={eye1 ?"text":"password"}
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="enter the password"
              className="w-full p-2  flex relative rounded  bg-gray-800 text-white border border-gray-600 focus:bg-gray-800 focus:outline-none focus:border-purple-400 shadow-[inset_0_0_0_100px_theme(colors.gray.800)]"
            />
             <span onClick={handleclick} className=" relative  bottom-7 left-80">
              {eye1 ? <FaEye /> : <FaEyeSlash />}
            </span> 
          </div>

          <div className="py-2">
            <label className="block text-white mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="conform password"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-purple-400 shadow-[inset_0_0_0_100px_theme(colors.gray.800)]"
              required
            />
          </div>
          <div className="flex text-violet-400">

          <p className="text-violet-400 mt-3"><NavLink to="/login" className="hover:text-blue-300 hover:underline">Already login?</NavLink></p>

          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition duration-200"
          >
            Register
          </button>
        </form>
      </main>
    </section>
  );
};

export default Register;
