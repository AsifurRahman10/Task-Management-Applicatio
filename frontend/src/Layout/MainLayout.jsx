import { Outlet } from "react-router";
import Navbar from "../Component/Navbar/Navbar";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <section className="bg-[#f2f4f7] min-h-[calc(100vh-60px)]">
        <Outlet></Outlet>
      </section>
    </div>
  );
}
