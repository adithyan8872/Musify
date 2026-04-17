import { useContext, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { Mygarage } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { _DB } from "../../Backend/Firebase";

const fields = [
  { key: "userfrstname", label: "First Name",    type: "text",   half: true  },
  { key: "usersecname",  label: "Last Name",     type: "text",   half: true  },
  { key: "userage",      label: "Age",           type: "number", half: true  },
  { key: "userdob",      label: "Date of Birth", type: "date",   half: true  },
  { key: "userlanguage", label: "Language",      type: "text",   half: true  },
  { key: "userstate",    label: "State",         type: "text",   half: true  },
  { key: "usercity",     label: "City",          type: "text",   half: true  },
  { key: "useraddress",  label: "Address",       type: "text",   half: false },
];

const Addprofile = () => {
  const navigate = useNavigate();
  const { authuser, darkMode } = useContext(Mygarage);
  const uid = authuser?.uid;

  const [data, setData] = useState({
    userfrstname: "", usersecname: "", userage: "",
    userdob: "", useraddress: "", userlanguage: "",
    userstate: "", usercity: "", role: "user",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const ref = doc(_DB, "user_Profile", uid);
      await setDoc(ref, {
        ...data,
        email: authuser.email,
        displayName: authuser.displayName,
        photoURL: authuser.photoURL,
        uid,
      });
      toast.success("Profile saved");
      navigate("/profile/myaccount");
    } catch (err) {
      toast.error("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  const card = darkMode ? "bg-gray-800/60 border-gray-700/50" : "bg-white border-gray-200 shadow-sm";
  const inputCls = darkMode
    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:border-green-500"
    : "bg-gray-50 border-gray-300 text-gray-900 focus:border-green-500";

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black gradient-text">Add Profile</h1>
        <p className={`text-sm mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Fill in your details to personalise your experience</p>
      </div>

      <form onSubmit={handleSubmit} className={`rounded-2xl border p-6 ${card}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map(({ key, label, type, half }) => (
            <div key={key} className={`flex flex-col gap-1 ${!half ? "sm:col-span-2" : ""}`}>
              <label className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                {label}
              </label>
              <input
                type={type}
                name={key}
                value={data[key]}
                onChange={handleChange}
                placeholder={`Enter ${label.toLowerCase()}`}
                className={`px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-green-500/40 transition ${inputCls}`}
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full py-3 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold text-sm transition disabled:opacity-50 hover:scale-[1.01]"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
};

export default Addprofile;
