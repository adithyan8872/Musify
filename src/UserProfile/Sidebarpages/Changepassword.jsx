import { useContext, useState } from "react";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import toast from "react-hot-toast";
import { Mygarage } from "../../Context/AuthContext";
import { MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";

const Changepassword = () => {
  const { authuser, darkMode } = useContext(Mygarage);

  const [form, setForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [show, setShow] = useState({ old: false, new: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.oldPassword) e.oldPassword = "Required";
    if (form.newPassword.length < 6) e.newPassword = "Minimum 6 characters";
    if (form.newPassword !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const credential = EmailAuthProvider.credential(authuser.email, form.oldPassword);
      await reauthenticateWithCredential(authuser, credential);
      await updatePassword(authuser, form.newPassword);
      toast.success("Password updated successfully");
      setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setErrors({ oldPassword: "Incorrect current password" });
      } else {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  const card = darkMode ? "bg-gray-800/60 border-gray-700/50" : "bg-white border-gray-200 shadow-sm";
  const inputCls = darkMode
    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500"
    : "bg-gray-50 border-gray-300 text-gray-900";

  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black gradient-text">Change Password</h1>
        <p className={`text-sm mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Keep your account secure</p>
      </div>

      <div className={`rounded-2xl border p-6 ${card}`}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {[
            { key: "oldPassword",     label: "Current Password",  showKey: "old"     },
            { key: "newPassword",     label: "New Password",      showKey: "new"     },
            { key: "confirmPassword", label: "Confirm Password",  showKey: "confirm" },
          ].map(({ key, label, showKey }) => (
            <div key={key} className="flex flex-col gap-1">
              <label className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                {label}
              </label>
              <div className="relative">
                <MdLock size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
                <input
                  type={show[showKey] ? "text" : "password"}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  className={`w-full pl-9 pr-10 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-green-500/40 transition ${inputCls} ${errors[key] ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShow({ ...show, [showKey]: !show[showKey] })}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-400 hover:text-gray-700"}`}
                >
                  {show[showKey] ? <MdVisibilityOff size={16} /> : <MdVisibility size={16} />}
                </button>
              </div>
              {errors[key] && <p className="text-red-400 text-xs">{errors[key]}</p>}
            </div>
          ))}

          {/* Strength indicator */}
          {form.newPassword && (
            <div className="flex gap-1 mt-1">
              {[1,2,3,4].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition ${
                    form.newPassword.length >= i * 3
                      ? i <= 2 ? "bg-yellow-400" : "bg-green-400"
                      : darkMode ? "bg-gray-700" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-2.5 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold text-sm transition disabled:opacity-50 hover:scale-[1.01]"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Changepassword;
