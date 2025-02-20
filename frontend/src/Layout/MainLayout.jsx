import { Navigate, Outlet } from "react-router";
import Navbar from "../Component/Navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Button } from "@headlessui/react";
import TodoSection from "../Component/TodoSection/TodoSection";
import InProgress from "../Component/InProgress/InProgress";
import CompletedSection from "../Component/CompletedSection/CompletedSection";

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
        <div className="w-9/12 mx-auto">
          <div className="flex justify-between items-center  pt-10">
            <h3 className="text-2xl font-semibold text-blue-950">My Tasks</h3>
            <div>
              <Button className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
                Add tasks
              </Button>
            </div>
          </div>

          {/* main section */}
          <div className="grid grid-cols-3 gap-8 mt-8">
            {/* todo section */}
            <TodoSection />

            {/* inProgress section */}
            <InProgress />

            {/* completed section */}
            <CompletedSection />
          </div>
        </div>
      </section>
    </div>
  );
}

{
  /* <Outlet></Outlet> */
}
