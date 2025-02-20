import { Navigate, Outlet } from "react-router";
import Navbar from "../Component/Navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

export default function MainLayout() {
  const { user } = useContext(AuthContext);
  console.log(user);
  if (!user?.displayName) {
    return <Navigate to="/login"></Navigate>;
  }
  return (
    <div>
      <Navbar />
      <section className="bg-[#f2f4f7] min-h-[calc(100vh-60px)]">
        <Outlet></Outlet>
      </section>
    </div>
  );
}
