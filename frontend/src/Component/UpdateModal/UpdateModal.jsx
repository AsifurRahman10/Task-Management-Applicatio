import { closeModal } from "../../utils/utils";
import { Button, Field, Input, Label, Textarea } from "@headlessui/react";

export default function UpdateModal({ handleEditTask, item }) {
  return (
    <div
      id="modelConfirmUpdate"
      className="fixed hidden z-50 bg-black/50 inset-0 bg-opacity-60 overflow-y-auto h-full w-full px-4 "
    >
      <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">
        <div className="flex justify-end p-2">
          {/* close button */}
          <button
            onClick={() => closeModal("modelConfirmUpdate")}
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div className="p-6 pt-0">
          <h4 className="text-lg font-bold mb-2 text-blue-950">
            Update Task details
          </h4>
          <form className="space-y-6 w-full" onSubmit={handleEditTask}>
            {/* Task Title Field */}
            <Field>
              <Label className="text-sm font-medium text-gray-900">
                Task Title
              </Label>
              <Input
                defaultValue={item?.title}
                name="taskTitle"
                placeholder="Enter task title"
                className="mt-2 block w-full rounded-lg border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </Field>

            {/* Task Description Field */}
            <Field>
              <Label className="text-sm font-medium text-gray-900">
                Task Description
              </Label>
              <Textarea
                defaultValue={item?.description}
                name="taskDescription"
                placeholder="Enter task description"
                rows="4"
                className="mt-2 block w-full rounded-lg border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </Field>
            <Button
              type="submit"
              className="text-white bg-[#4186F4] focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2 text-center mr-2"
            >
              Yes, I'm sure
            </Button>
          </form>

          {/* button */}
        </div>
      </div>
    </div>
  );
}
