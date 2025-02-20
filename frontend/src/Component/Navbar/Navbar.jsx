import { Button } from "@headlessui/react";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

export default function Navbar() {
  const { user, handleSignout } = useContext(AuthContext);
  return (
    <div className="flex justify-between w-9/12 mx-auto py-2 bg-[#ffffff]">
      <h3 className="text-2xl font-semibold text-blue-950">Your tasks</h3>
      {user ? (
        <div className="flex justify-center items-center gap-6">
          <p>{user?.displayName}</p>
          <Button
            onClick={handleSignout}
            className="bg-[#4186F4] rounded py-2 px-8 font-bold text-white cursor-pointer"
          >
            logout
          </Button>
        </div>
      ) : (
        <Button className="bg-[#4186F4] rounded py-2 px-8 font-bold text-white cursor-pointer">
          Login
        </Button>
      )}
    </div>
  );
}
