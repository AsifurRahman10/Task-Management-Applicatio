import { Outlet } from "react-router";
import Navbar from "../Component/Navbar/Navbar";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <section className="bg-[#f2f4f7] min-h-screen flex justify-center items-center">
        <Outlet></Outlet>
      </section>
    </div>
  );
}
