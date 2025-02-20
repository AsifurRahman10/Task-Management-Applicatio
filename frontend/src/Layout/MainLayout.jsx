import { Navigate } from "react-router";
import Navbar from "../Component/Navbar/Navbar";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Button, Field, Input, Label, Textarea } from "@headlessui/react";
import TodoSection from "../Component/TodoSection/TodoSection";
import InProgress from "../Component/InProgress/InProgress";
import CompletedSection from "../Component/CompletedSection/CompletedSection";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Modal } from "../Component/Modal/Modal";
import { closeModal, handleOpenModal } from "../utils/utils";

export default function MainLayout() {
  const { user, loading } = useContext(AuthContext);
  console.log(user);

  // get all the data
  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_Server_url}/all-tasks/${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // filter data category wise
  const todoTasks = tasks.filter((task) => task.category === "to-do");
  const inProgressTasks = tasks.filter(
    (task) => task.category === "in-progress"
  );
  const doneTasks = tasks.filter((task) => task.category === "completed");

  // loading if user is loading
  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="relative">
          <div className="w-12 h-12 rounded-full absolute border-8 border-solid border-gray-200"></div>
          <div className="w-12 h-12 rounded-full animate-spin absolute  border-8 border-solid border-[#4186F4] border-t-transparent"></div>
        </div>
      </div>
    );
  }

  // navigate to login if user is not available
  if (!user?.displayName) {
    return <Navigate to="/login"></Navigate>;
  }

  // handle add task
  const handleAddTask = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.taskTitle.value;
    const description = form.taskDescription.value;
    const taskData = {
      title,
      description,
      Timestamp: new Date(),
      category: "to-do",
      order: Date.now(),
      email: user.email,
    };

    // sending data to db
    axios
      .post(`${import.meta.env.VITE_Server_url}/add-task`, taskData)
      .then((res) => {
        refetch();
        closeModal("modelConfirm");
        form.reset();
      });
  };

  return (
    <div>
      <Navbar />
      <section className="bg-[#f2f4f7] min-h-[calc(100vh-60px)]">
        <div className="w-9/12 mx-auto">
          <div className="flex justify-between items-center  pt-10">
            <h3 className="text-2xl font-semibold text-blue-950">My Tasks</h3>
            <div>
              <Button
                onClick={() => handleOpenModal("modelConfirm")}
                className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
              >
                Add tasks
              </Button>
            </div>
          </div>

          {/* main section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* todo section */}
            <TodoSection todoTasks={todoTasks} refetch={refetch} />

            {/* inProgress section */}
            <InProgress inProgressTasks={inProgressTasks} refetch={refetch} />

            {/* completed section */}
            <CompletedSection doneTasks={doneTasks} refetch={refetch} />

            {/* modal */}

            <Modal handleAddTask={handleAddTask} />
          </div>
        </div>
      </section>
    </div>
  );
}
