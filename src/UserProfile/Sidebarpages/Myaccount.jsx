import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { Mygarage } from "../../Context/AuthContext";
import { _DB } from "../../Backend/Firebase";
import { MdEdit, MdSave, MdClose } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { RiUserUnfollowLine } from "react-icons/ri";

export const Myaccount = () => {
  const { authuser, darkMode } = useContext(Mygarage);
  const uid = authuser?.uid;

  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    if (!uid) return;
    const ref = doc(_DB, "user_Profile", uid);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setProfile(snap.data());
        setForm(snap.data());
      } else {
        setProfile(null);
      }
    });
    return () => unsub();
  }, [uid]);

  async function handleSave() {
    try {
      const ref = doc(_DB, "user_Profile", uid);
      await setDoc(ref, { ...form, uid, email: authuser.email }, { merge: true });
      // update display name in Firebase Auth if changed
      if (form.userfrstname || form.usersecname) {
        await updateProfile(authuser, {
          displayName: `${form.userfrstname || ""} ${form.usersecname || ""}`.trim(),
        });
      }
      toast.success("Profile updated");
      setEditing(false);
    } catch (e) {
      toast.error("Update failed: " + e.message);
    }
  }

  const card = darkMode ? "bg-gray-800/60 border-gray-700/50" : "bg-white border-gray-200 shadow-sm";
  const inputCls = darkMode
    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:border-green-500"
    : "bg-gray-50 border-gray-300 text-gray-900 focus:border-green-500";

  const fields = [
    { key: "userfrstname", label: "First Name",    type: "text"   },
    { key: "usersecname",  label: "Last Name",     type: "text"   },
    { key: "userage",      label: "Age",           type: "number" },
    { key: "userdob",      label: "Date of Birth", type: "date"   },
    { key: "userlanguage", label: "Language",      type: "text"   },
    { key: "userstate",    label: "State",         type: "text"   },
    { key: "usercity",     label: "City",          type: "text"   },
    { key: "useraddress",  label: "Address",       type: "text"   },
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black gradient-text">My Account</h1>
          <p className={`text-sm mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Manage your personal information</p>
        </div>
        {profile && !editing && (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-green-500 hover:bg-green-400 text-black font-semibold rounded-xl text-sm transition hover:scale-105"
          >
            <MdEdit size={16} /> Edit
          </button>
        )}
        {editing && (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 bg-green-500 hover:bg-green-400 text-black font-semibold rounded-xl text-sm transition"
            >
              <MdSave size={16} /> Save
            </button>
            <button
              onClick={() => { setEditing(false); setForm(profile); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm transition ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"}`}
            >
              <MdClose size={16} /> Cancel
            </button>
          </div>
        )}
      </div>

      {/* Auth info card */}
      <div className={`rounded-2xl border p-4 mb-4 flex items-center gap-4 ${card}`}>
        <img
          src={authuser?.photoURL || `https://ui-avatars.com/api/?name=${authuser?.displayName || "U"}&background=22c55e&color=000&size=80`}
          alt="avatar"
          className="w-16 h-16 rounded-full object-cover ring-2 ring-green-500"
        />
        <div>
          <p className="font-bold text-lg">{authuser?.displayName || "—"}</p>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{authuser?.email}</p>
          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full mt-1 inline-block">
            {authuser?.emailVerified ? "✓ Verified" : "Not verified"}
          </span>
        </div>
      </div>

      {!profile ? (
        <div className={`rounded-2xl border p-10 flex flex-col items-center gap-4 ${card}`}>
          <RiUserUnfollowLine size={64} className="text-gray-600" />
          <p className={`text-lg font-semibold ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Profile not set up yet</p>
          <NavLink to="/profile/addprofile">
            <button className="px-6 py-2 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl transition">
              Add Details
            </button>
          </NavLink>
        </div>
      ) : (
        <div className={`rounded-2xl border p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 ${card}`}>
          {fields.map(({ key, label, type }) => (
            <div key={key} className="flex flex-col gap-1">
              <label className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{label}</label>
              {editing ? (
                <input
                  type={type}
                  value={form[key] || ""}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className={`px-3 py-2 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-green-500/40 transition ${inputCls}`}
                />
              ) : (
                <p className={`text-sm font-medium px-3 py-2 rounded-xl ${darkMode ? "bg-gray-700/50 text-white" : "bg-gray-100 text-gray-800"}`}>
                  {profile[key] || <span className="text-gray-500 italic">Not set</span>}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
