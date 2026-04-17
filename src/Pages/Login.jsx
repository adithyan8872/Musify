import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { _Auth } from "../Backend/Firebase";

// import { FaEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
  let navigate = useNavigate();
  let [data, setdata] = useState({
    email: "",
    password: "",
  });

  let { email, password } = data;

  function handleChange(e) {
    setdata({ ...data, [e.target.name]: e.target.value });
  }

  // const [eye1, seteye1] = useState(false);

  // function handleclick() {
  //   seteye1(!eye1);
  // }

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(data)
    try {
      let userdata = await signInWithEmailAndPassword(_Auth, email, password);
      console.log(userdata);
      if (userdata.user.emailVerified == true) {
        navigate("/albums")
        // window.location.assign("/albums")
        // toast.success("login successful")
      } else {
        toast.error("invalid crentials");
      }
    } catch (error) {
      toast.error("error" + error.code);
    }
  }

  return (
    <section className="w-full h-[calc(100vh-70px)] bg-slate-700 flex items-center justify-center flex-col">
      <header>
        <h1 className="text-3xl text-purple-300 font-bold tracking-wider">
          Login
        </h1>
      </header>
      <main>
        <form
          className="w-[400px] bg-slate-800 border-b-2 h-auto mt-4 p-5 rounded-lg "
          onSubmit={handleSubmit}
        >
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

          <div className="py-2">
            <label className="block text-white mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="enter the password"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:bg-gray-800 focus:outline-none focus:border-purple-400 shadow-[inset_0_0_0_100px_theme(colors.gray.800)]"

              // { <span onClick={handleclick}>
              //   {eye1 ? <FaEye /> : <FaEyeSlash />}
              // </span>}
            />
          </div>

          <div className="flex text-violet-400 justify-between">
            <p>
              <NavLink
                to="/register"
                className="hover:text-blue-300 hover:underline"
              >
                Forgot password
              </NavLink>
            </p>
            <p>
              <NavLink
                to="/reset"
                className="hover:text-blue-300 hover:underline"
              >
                Reset password
              </NavLink>
            </p>
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </main>
    </section>
  );
};

export default Login;
