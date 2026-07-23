import {BrowserRouter, Route, Routes} from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";

export function AppRoutes() {
    return(
        <BrowserRouter>
            <Routes>

                <Route 
                path="/login" 
                element={<Login/>}
                />

                <Route 
                path="/register" 
                element={<Register/>}
                />

                <Route 
                path="/" 
                element={
                    <ProtectedRoute>
                            <Home/>
                    </ProtectedRoute>
                    }
                />

                <Route 
                path="/profile" 
                element={
                    <ProtectedRoute>
                            <Profile/>
                    </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    )
}