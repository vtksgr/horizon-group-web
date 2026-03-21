import { Outlet } from "react-router-dom";
import Topbar from "../components/ui/navbar/Topbar";    
import Navbar from "../components/ui/navbar/Navbar";
import Footer from "../components/ui/footer/Footer";


export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
        <Topbar />
        <Navbar />
        <main className="pt-[108px] flex-1">
            <Outlet />
        </main>
        <footer className="mt-auto">
          <Footer />
        </footer>
    </div>
  )
}
