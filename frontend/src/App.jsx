import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

function App() {
  const { user, loading } = useAuth();
  
  return (
    <BrowserRouter>
      {user && <Navbar />}
      <Routes>

        <Route
          path="/"
          element={
            !user ? (
              <Login />
            ) : user.role === "admin" ? (
              <Suspense fallback={<h1>Loading data...</h1>}>
                <AdminDashboard />
              </Suspense>
            ) : (
              <Profile />
            )
          }
        />

        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Suspense fallback={<h1>Loading data...</h1>}>
                <AdminDashboard />
              </Suspense>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
