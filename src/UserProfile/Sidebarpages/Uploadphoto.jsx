import { useContext, useState } from "react";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { Mygarage } from "../../Context/AuthContext";
import { MdCloudUpload, MdCheckCircle } from "react-icons/md";

const Uploadphoto = () => {
  const { authuser, darkMode } = useContext(Mygarage);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(authuser?.photoURL || null);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  function handleFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) { toast.error("Please select an image file"); return; }
    if (f.size > 5 * 1024 * 1024) { toast.error("File too large (max 5MB)"); return; }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setUploaded(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) { toast.error("Please select a photo first"); return; }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "music_musify");
      formData.append("cloud_name", "dp3o3zo13");

      const res = await fetch("https://api.cloudinary.com/v1_1/dp3o3zo13/image/upload", { method: "POST", body: formData });
      const result = await res.json();

      await updateProfile(authuser, { photoURL: result.url });
      toast.success("Photo updated");
      setUploaded(true);
      setFile(null);
    } catch (err) {
      toast.error("Upload failed: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  const card = darkMode ? "bg-gray-800/60 border-gray-700/50" : "bg-white border-gray-200 shadow-sm";
  const dropzone = darkMode
    ? "border-gray-600 hover:border-green-500 bg-gray-700/40"
    : "border-gray-300 hover:border-green-500 bg-gray-50";

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black gradient-text">Upload Photo</h1>
        <p className={`text-sm mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Update your profile picture</p>
      </div>

      <div className={`rounded-2xl border p-6 ${card}`}>
        {/* Current / preview */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={preview || `https://ui-avatars.com/api/?name=${authuser?.displayName || "U"}&background=22c55e&color=000&size=128`}
              alt="preview"
              className="w-28 h-28 rounded-full object-cover ring-4 ring-green-500/40 shadow-xl"
            />
            {uploaded && (
              <div className="absolute -bottom-1 -right-1 text-green-400">
                <MdCheckCircle size={24} />
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Drop zone */}
          <label
            htmlFor="photo-upload"
            className={`flex flex-col items-center gap-2 border-2 border-dashed rounded-xl p-6 cursor-pointer transition ${dropzone}`}
          >
            <MdCloudUpload size={36} className="text-gray-400" />
            <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              {file ? file.name : "Click to choose a photo"}
            </span>
            <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>PNG, JPG, WEBP · Max 5MB</span>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
            />
          </label>

          <button
            type="submit"
            disabled={loading || !file}
            className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold text-sm transition disabled:opacity-40 hover:scale-[1.01]"
          >
            {loading ? "Uploading..." : "Upload Photo"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Uploadphoto;
