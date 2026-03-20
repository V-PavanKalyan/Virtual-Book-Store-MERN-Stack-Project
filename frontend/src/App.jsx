import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from './context/AuthContext.jsx'
import ScrollToTop from "./components/ScrollToTop.jsx";

function App() {
  return (
    <>
    <AuthProvider>
      <ScrollToTop />
      <Navbar/>
        <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-10 font-primary">
          <Outlet/>
        </main>
      <Footer/>
    </AuthProvider>
    </>
  )
}

export default App;
