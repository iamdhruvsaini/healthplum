import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

import Footer from "./components/Footer";

function App() {
  return (
    <>
      
        <Navbar />
        <main className="xl:w-[1300px] mx-auto px-4">
          <Outlet>

          </Outlet>
        </main>
        <Footer/>
     
    </>
  );
}

export default App;
