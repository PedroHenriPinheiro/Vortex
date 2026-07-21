import { BrowserRouter, Route, Routes } from "react-router-dom";

export function AppRoutes() {
    return(
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/profile" element={<Profile />} />

                <Route path="/ads" element={<Ads />} />

                <Route path="/ads/:id" element={<AdDetails />} />

                <Route path="/create-ad" element={<CreateAd />} />

                <Route path="/my-ads" element={<MyAds />} />

            </Routes>

        </BrowserRouter>
    )
}