import { IoClose } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { Checkbox } from "@headlessui/react";
import { handleOpenModal } from "../../utils/utils";
import UpdateModal from "../UpdateModal/UpdateModal";
import { useState } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const TaskCard = ({ item, refetch, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, active } =
    useSortable({ id: item?._id });
  const handleEditTask = () => {
    setIsOpen(true);
    handleOpenModal("modelConfirmUpdate");
  };
  const handleTaskCompletion = (category) => {
    setEnabled(true);
    if (category === "to-do") {
      axios
        .patch(
          `${import.meta.env.VITE_Server_url}/updateCategory/${item?._id}`,
          { category: "in-progress" }
        )
        .then((res) => {
          refetch();
        });
    } else {
      axios
        .patch(
          `${import.meta.env.VITE_Server_url}/updateCategory/${item?._id}`,
          { category: "completed" }
        )
        .then((res) => {
          refetch();
        });
    }
  };

  const handleConfirmUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.taskTitle.value;
    const description = form.taskDescription.value;
    const taskData = {
      title,
      description,
      Timestamp: new Date(),
      category: item?.category,
      order: Date.now(),
    };
    axios
      .patch(`${import.meta.env.VITE_Server_url}/task/${item?._id}`, taskData)
      .then((res) => {
        refetch();
        setIsOpen(false);
        form.reset();
      });
  };
  const handleDelete = () => {
    axios
      .delete(`${import.meta.env.VITE_Server_url}/task/${item?._id}`)
      .then((res) => {
        refetch();
      });
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: active ? "grabbing" : "",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div
        className="bg-[#ffffff] p-5 text-black rounded-lg relative"
        style={{ touchAction: "none" }}
      >
        <h5 className="text-gray-900 font-bold text-lg">{item?.title}</h5>
        <p className="mt-2 text-gray-500 font-medium text-sm">
          {item?.description}
        </p>
        <div className="absolute top-5 right-4 flex justify-center items-center gap-2">
          {item?.category !== "completed" && (
            <>
              <Checkbox
                checked={enabled}
                onChange={() => handleTaskCompletion(item?.category)}
                className="group size-6 rounded-md bg-white/10 border-2 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white hover:-blue-600 cursor-pointer"
              >
                <FaCheck className="hidden text-[12px] fill-black group-data-[checked]:block" />
              </Checkbox>
              <MdOutlineEdit
                onClick={handleEditTask}
                className="text-2xl hover:text-blue-600 cursor-pointer"
              />
            </>
          )}
          <IoClose
            onClick={handleDelete}
            className="text-3xl hover:text-red-500 cursor-pointer"
          />
        </div>
        {/* Show modal only when isOpen is true */}
        {isOpen && (
          <UpdateModal handleConfirmUpdate={handleConfirmUpdate} item={item} />
        )}
      </div>
    </div>
  );
};
