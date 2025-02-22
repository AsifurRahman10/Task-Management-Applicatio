import { Navigate } from "react-router";
import Navbar from "../Component/Navbar/Navbar";
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Button } from "@headlessui/react";
import TodoSection from "../Component/TodoSection/TodoSection";
import InProgress from "../Component/InProgress/InProgress";
import CompletedSection from "../Component/CompletedSection/CompletedSection";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Modal } from "../Component/Modal/Modal";
import { closeModal, handleOpenModal } from "../utils/utils";
import {
  closestCenter,
  DndContext,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function MainLayout() {
  const { user, loading } = useContext(AuthContext);

  // Fetch tasks
  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axios.get(
        `${import.meta.env.VITE_Server_url}/all-tasks/${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Memoize derived state
  const todoTasks = useMemo(
    () => tasks.filter((task) => task.category === "to-do"),
    [tasks]
  );
  const inProgressTasks = useMemo(
    () => tasks.filter((task) => task.category === "in-progress"),
    [tasks]
  );
  const doneTasks = useMemo(
    () => tasks.filter((task) => task.category === "completed"),
    [tasks]
  );

  // Memoize task IDs for SortableContext
  const todoTaskIds = useMemo(
    () => todoTasks.map((task) => task._id),
    [todoTasks]
  );
  const inProgressTaskIds = useMemo(
    () => inProgressTasks.map((task) => task._id),
    [inProgressTasks]
  );
  const doneTaskIds = useMemo(
    () => doneTasks.map((task) => task._id),
    [doneTasks]
  );

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

  // Handle drag end
  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (!active || !over || active.id === over.id) return;

    const originalPosition = tasks.findIndex((task) => task._id === active.id);
    const latestPosition = tasks.findIndex((task) => task._id === over.id);

    if (originalPosition === -1 || latestPosition === -1) return;

    const updatedTasks = arrayMove(tasks, originalPosition, latestPosition);
    // Update state or send to backend
  };

  // Initialize sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3 } }),
    useSensor(TouchSensor, { disableScrollLock: true }),
    useSensor(MouseSensor)
  );

  // Loading state
  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="relative">
          <div className="w-12 h-12 rounded-full absolute border-8 border-solid border-gray-200"></div>
          <div className="w-12 h-12 rounded-full animate-spin absolute border-8 border-solid border-[#4186F4] border-t-transparent"></div>
        </div>
      </div>
    );
  }

  // Redirect if user is not logged in
  if (!user?.displayName) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Navbar />
      <section className="bg-[#f2f4f7] min-h-[calc(100vh-60px)]">
        <div className="w-9/12 mx-auto">
          <div className="flex justify-between items-center pt-10">
            <h3 className="text-2xl font-semibold text-blue-950">My Tasks</h3>
            <Button
              onClick={() => handleOpenModal("modelConfirm")}
              className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
            >
              Add tasks
            </Button>
          </div>

          {/* Main section */}
          <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              {/* Todo section */}
              <SortableContext
                items={todoTaskIds} // Use memoized task IDs
                strategy={verticalListSortingStrategy}
              >
                <TodoSection todoTasks={todoTasks} refetch={refetch} />
              </SortableContext>

              {/* InProgress section */}
              <SortableContext
                items={inProgressTaskIds} // Use memoized task IDs
                strategy={verticalListSortingStrategy}
              >
                <InProgress
                  inProgressTasks={inProgressTasks}
                  refetch={refetch}
                />
              </SortableContext>

              {/* Completed section */}
              <SortableContext
                items={doneTaskIds} // Use memoized task IDs
                strategy={verticalListSortingStrategy}
              >
                <CompletedSection doneTasks={doneTasks} refetch={refetch} />
              </SortableContext>
            </div>
          </DndContext>

          {/* Modal */}
          <Modal handleAddTask={handleAddTask} />
        </div>
      </section>
    </div>
  );
}
