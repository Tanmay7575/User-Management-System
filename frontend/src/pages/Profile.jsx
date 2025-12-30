import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const {user,setUser}=useAuth()
  const [name, setName] = useState(user?.fullName);
  const [email, setEmail] = useState(user?.email);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [oldPassword,setOldPassword]=useState("");
  const [newPassword,setNewPassword]=useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  const updateProfile = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await api.put("/api/users/me", {
        fullName: name,
        email,
      });
      setUser(res.data);
       
      setMessage("Profile updated successfully");
    } catch {
      setMessage("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const changePassword=async()=>{
     if (!oldPassword || !newPassword ) {
      setMessage("Please fill all password fields");
      return;
    }
    if(newPassword.length < 8){
      setMessage("Password must greater then 8 Char")
      return;
    }

       setPasswordLoading(true);
    setMessage("");

        try {
      await api.put("/api/users/change-password", {
        oldPassword,
        newPassword,
      });

      setMessage("Password changed successfully");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to change password"
      );
    } finally {
      setPasswordLoading(false);
    }
  }

  

  return (
     <div className="min-h-screen bg-gray-100 flex items-start justify-center px-4 py-8">
      <div className="w-full max-w-lg bg-white p-6 md:p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          My Profile
        </h2>

        {message && (
          <div className="mb-4 text-sm text-center text-blue-600 bg-blue-50 p-2 rounded">
            {message}
          </div>
        )}

        {/* -------- Profile Info -------- */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            onClick={updateProfile}
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* -------- Change Password -------- */}
        <div className="mt-8 border-t pt-6 space-y-4">
          <h3 className="text-lg font-semibold text-center">
            Change Password
          </h3>

          <div>
            <label className="block text-sm font-medium mb-1">
              Old Password
            </label>
            <input
              type="password"
              value={oldPassword}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <button
            onClick={changePassword}
            disabled={passwordLoading}
            className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-50"
          >
            {passwordLoading ? "Updating..." : "Change Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
