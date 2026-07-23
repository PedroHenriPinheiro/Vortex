import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar/index"

export default function AppLayout() {
    return (
        <>
            <Navbar/>
            
            <Outlet/>
            
        </>
    )
}