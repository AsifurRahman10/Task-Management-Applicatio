import { Button } from "@headlessui/react";

export default function Navbar() {
  return (
    <div className="flex justify-end w-9/12 mx-auto py-2 bg-[#ffffff]">
      <Button className="bg-[#4186F4] rounded py-2 px-8 font-bold text-white ">
        Login
      </Button>
    </div>
  );
}
