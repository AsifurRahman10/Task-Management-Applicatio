import { Navigate, Outlet } from "react-router";
import Navbar from "../Component/Navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

export default function MainLayout() {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="relative">
          <div className="w-12 h-12 rounded-full absolute border-8 border-solid border-gray-200"></div>
          <div className="w-12 h-12 rounded-full animate-spin absolute  border-8 border-solid border-[#4186F4] border-t-transparent"></div>
        </div>
      </div>
    );
  }
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
