import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const logout1=async()=>{
    await logout();
  }

  return (
    <nav className="bg-gray-900 text-white px-4 py-10 w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <div className="text-2xl font-semibold">
          {user ? user.fullName : "My App"}
        <span className="border ml-6 bg-gray-50 rounded text-black text-center"> {user.role}</span>
        </div>

        
        <div className="hidden md:flex items-center gap-8">
          {user && user?.role === "admin" && (
            <button onClick={() => navigate("/admin")}>Admin</button>
          )}

          {user && (
            <button onClick={() => navigate("/profile")}>Profile</button>
          )}

          {user && (
            <button
              onClick={logout1}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          )}
        </div>
       
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>
        {open && (
        <div className="md:hidden bg-gray-800 px-4 py-4 flex flex-col gap-4">
          {user?.role === "admin" && (
            <button onClick={() => navigate("/admin")}>Admin</button>
          )}

          {user && (
            <button onClick={() => navigate("/profile")}>Profile</button>
          )}

          {!user ? (
            <button onClick={() => navigate("/login")}>Login</button>
          ) : (
            <button
              onClick={async () => {
                await logout();
                setOpen(false);
                navigate("/login");
              }}
            >
              Logout
            </button>
          )}
        </div>
      )}
      
    </nav>
  );
};

export default Navbar