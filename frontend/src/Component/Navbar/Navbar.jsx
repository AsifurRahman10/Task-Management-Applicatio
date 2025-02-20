import { Button } from "@headlessui/react";

export default function Navbar() {
  return (
    <div className="flex justify-between w-9/12 mx-auto py-2 bg-[#ffffff]">
      <h3 className="text-2xl font-semibold text-blue-950">Your tasks</h3>
      <Button className="bg-[#4186F4] rounded py-2 px-8 font-bold text-white ">
        Login
      </Button>
    </div>
  );
}
