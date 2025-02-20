import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { handleOpenModal } from "../../utils/utils";
import UpdateModal from "../UpdateModal/UpdateModal";
import { useState } from "react";
import axios from "axios";

export const TaskCard = ({ item, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleEditTask = () => {
    setIsOpen(true);
    handleOpenModal("modelConfirmUpdate");
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
      category: "to-do",
      order: Date.now(),
    };
    axios
      .patch(`${import.meta.env.VITE_Server_url}/task/${item?._id}`, taskData)
      .then((res) => {
        console.log(res.data);
        refetch();
        setIsOpen(false);
      });
  };
  const handleDelete = () => {
    axios
      .delete(`${import.meta.env.VITE_Server_url}/task/${item?._id}`)
      .then((res) => {
        console.log(res.data);
        refetch();
      });
  };

  return (
    <div className="bg-[#ffffff] p-5 text-black rounded-lg relative">
      <h5 className="text-gray-900 font-bold text-lg">{item?.title}</h5>
      <p className="mt-2 text-gray-500 font-medium text-sm">
        {item?.description}
      </p>
      <div className="absolute top-5 right-4 flex justify-center items-center gap-1">
        <MdEdit
          onClick={handleEditTask}
          className="text-2xl hover:text-blue-600 cursor-pointer"
        />
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
  );
};
