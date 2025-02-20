import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

export const TaskCard = () => {
  return (
    <div className="bg-[#ffffff] p-5 text-black rounded-lg relative">
      <h5 className="text-gray-900 font-bold text-lg">Design User Interface</h5>
      <p className="mt-2 text-gray-500 font-medium text-sm">
        Create wireframes and high-fidelity designs for the app's main
        screens.Create wireframes and high-fidelity designs for the app's main
        screens.Create wireframes and high-fidelity designs for the app's main
        screens.
      </p>
      <div className="absolute top-5 right-4 flex justify-center items-center gap-1">
        <MdEdit className="text-2xl hover:text-blue-600 cursor-pointer" />
        <IoClose className="text-3xl hover:text-red-500 cursor-pointer" />
      </div>
    </div>
  );
};
