import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
function App() {
    return (
        <div>
            <Navbar />
            <main className="pb-16">
                <Outlet />
            </main>
           

            <Footer />
        </div>
    );
}

export default App;
