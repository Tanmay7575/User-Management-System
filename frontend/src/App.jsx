import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import { Suspense ,lazy} from "react";
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
import Profile from "./pages/Profile";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  const token=localStorage.getItem('token');
  const {user,loading}=useAuth();

  if(loading){
    return <h1>Loading....</h1>
  }
  return (
    
    <BrowserRouter>

    {token && <Navbar/>}

    <Routes>  
        <Route path="/" element=
        { !token ?
         <Login/>
        :
        user?.role === "admin"?
        <Suspense fallback={<h1>Loading data...</h1>}>
           <AdminDashboard/>
        </Suspense>
        :
        <Profile/>
        }/>

        <Route path="/signup" element={<Signup/>}/>
        
         <Route path="/login" element={
           token ? <Navigate to="/"/>
           :
          <Login/>}/>

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        }/>
        
         <Route path="/admin" element={
          <ProtectedRoute>
            
           <AdminDashboard/>
      
          </ProtectedRoute>
        }/>

    </Routes>

    </BrowserRouter>
  );
}

export default App;
