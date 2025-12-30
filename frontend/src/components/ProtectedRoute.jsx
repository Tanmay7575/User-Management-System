import { children } from 'react';
import {Navigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const isAuthenticated= ()=>{
    return !!localStorage.getItem('token');
}

const ProtectedRoute = ({children}) => {
    const {user} = useAuth();
    const token=localStorage.getItem('token');

    if(!token) return <Navigate to="/login"/>

    return children;
}

export default ProtectedRoute;