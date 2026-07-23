import {BrowserRouter, Route, Routes} from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import CreateAd from "../pages/CreateAd";
import AdsList from "../pages/AdsList";
import AdDetails from "../pages/AdDetails"
import MyAds from "../pages/MyAds";
// import NotFound from "../pages/NotFound"; se tiver tempo implemento...
import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";

export function AppRoutes() {
    return(
        <BrowserRouter>
            <Routes>

                <Route element={<AppLayout/>}>
                    <Route 
                        path="/" 
                        element={<Home/>}
                    />

                    <Route 
                        path="/adsList" 
                        element={<AdsList/>}
                    />

                    <Route 
                        path="/ads/:id" 
                        element={<AdDetails/>}
                    />

                </Route>


                <Route element={<AuthLayout/>}>

                     <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />

                </Route>

                <Route
                    element={
                        <ProtectedRoute>
                            <AppLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                    <Route
                        path="/create-ad"
                        element={<CreateAd />}
                    />

                    <Route
                        path="/my-ads"
                        element={<MyAds />}
                    />

                </Route>

            </Routes>
        </BrowserRouter>
    )
}