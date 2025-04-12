import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <AuthProvider>
        <main className="xl:w-[1300px] mx-auto px-4">
          <Navbar />
          <Outlet></Outlet>
        </main>
        <Footer/>
      </AuthProvider>
    </>
  );
}

export default App;
