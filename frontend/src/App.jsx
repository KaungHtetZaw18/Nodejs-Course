import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <Navbar />
      <div className="p-5 bg-[#F1F1F1] h-screen ">
        <Outlet />
      </div>
    </>
  );
}

export default App;
