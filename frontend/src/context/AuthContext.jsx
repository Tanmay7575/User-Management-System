import { createContext } from "react";
import api from "../services/api";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";


const AuthContext = createContext();

export const AuthProvider =({children})=>{
    
    const [user,setUser] = useState(null);
      const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
    try {
      const res = await api.get("/api/auth/me");
      setUser(res.data);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
    
    const login = async(email, password)=>{
        try {
    const res = await api.post("/api/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    localStorage.setImtem("user",res.data.user)
    await fetchUser(); 
        } catch (error) {
            throw error
        }
    }
    const logout = ()=>{
        localStorage.clear();
        setUser(null);
    }


  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
        fetchUser();
    }
  },[]);

  return (
      <AuthContext.Provider
      value= {{user,login,logout,setUser,loading}}
      >
        {children}
      </AuthContext.Provider>
  );

}

export const useAuth = ()=> useContext(AuthContext);