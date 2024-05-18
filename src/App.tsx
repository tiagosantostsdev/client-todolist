import { Outlet } from "react-router-dom";

export default function App(){
    return(
        <main className="w-full h-screen">
            <Outlet/>
        </main>
    )
}