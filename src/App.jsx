import React from "react";
// import Navbar from "./Navbar_Block/Navbar";
import { RouterProvider } from "react-router-dom";
import { mymap } from "./Routes/Map";
import { AuthContext } from "./Context/AuthContext";
const App = () => {
  return (
    // <div className="bg-red-100">App</div>
    <AuthContext>
      
      <RouterProvider router={mymap} />
    </AuthContext>
  );
};

export default App;
