import { sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { _Auth } from '../backend/firebase'
import toast from 'react-hot-toast'

const Resetpassword = () => {


    let [email,setemail]=useState("")
    function handlechange(e){
        setemail(e.target.value)

    }

    async function handleSubmit(e){
        // console.log(email)
        e.preventDefault()
        try {
            await sendPasswordResetEmail(_Auth,email)
            toast.success(`link send to ${email}`)
        } catch (error) {
            console.log(error)
            toast.error("error "+error.code)
        }
    }



  return (
    <>
        <div className="w-full h-[calc(100vh-70px)] bg-slate-700 flex items-center justify-center flex-col">
       <h1 className='text-white text-[20px] mb-5 tracking-wider'>Reset Password</h1>
            <form className='bg-gray-800 h-[220px] w-[300px] p-5' onSubmit={handleSubmit} >
       
        <div className="py-2 ">
            <label className="block text-white mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handlechange}
              placeholder="Enter the email"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-purple-400 placeholder:text-white"
              required
            />
          </div>


          <button
            type="submit"
            className="w-full mt-4 bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition duration-200"
          >
            Register
          </button>


          <p className="text-violet-400 mt-3 text-center"><NavLink to="/login" className="hover:text-blue-300 hover:underline ">back to login?</NavLink></p>




          </form>
        </div>
        
        
    
    </>
  )
}

export default Resetpassword  