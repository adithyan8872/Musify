import React from 'react'
import Adminsidebar from './Adminsidebar'
import Admincontext from './Admincontext'

const Admincontainer = () => {
  return (
    <section className='w-full min-h-[calc(100vh-70px)] bg-slate-800 flex'>
        {/* <h1>jhhasckjbzclln</h1> */}
        
        <Adminsidebar/>
        <Admincontext/>
    </section>
  )
}

export default Admincontainer