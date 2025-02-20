import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useNavigate } from "react-router";
import GoogleLogin from "../Component/GoogleLogin/GoogleLogin";

export default function Login() {
  const { loginWithEmail } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    loginWithEmail(email, password)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        const message = err.message.split(":");
        setError(message[1]);
      });
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mx-auto flex w-full flex-col justify-center px-5 pt-0">
        <div className="my-auto mb-auto mt-8 flex flex-col md:mt-[70px] w-[350px] max-w-[450px] mx-auto md:max-w-[450px] lg:mt-[130px] lg:min-w-[450px] bg-[#ffffff] p-10">
          <p className="text-[32px] font-bold text-black">Sign In</p>
          <p className="mb-2.5 mt-2.5 font-normal text-zinc-700">
            Enter your email and password to sign in!
          </p>
          <div className="mt-8">
            <GoogleLogin />
          </div>
          <div className="relative my-4">
            <div className="relative flex items-center py-1">
              <div className="grow border-t border-zinc-800"></div>
              <div className="grow border-t border-zinc-800"></div>
            </div>
          </div>
          <div>
            <form className="mb-4" onSubmit={handleLogin}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <label className="text-black">Email</label>
                  <input
                    className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border bg-zinc-950 text-black border-zinc-800 px-4 py-3 text-sm font-medium placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-black dark:placeholder:text-zinc-400"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    name="email"
                  />
                  <label className="text-zinc-950 mt-2 dark:text-black">
                    Password
                  </label>
                  <input
                    placeholder="Password"
                    type="password"
                    autoComplete="current-password"
                    className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border bg-zinc-950 text-black border-zinc-800 px-4 py-3 text-sm font-medium placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-black dark:placeholder:text-zinc-400"
                    name="password"
                  />
                  {error && <p>{error}</p>}
                </div>
                <button
                  className="whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#4186F4] text-white hover:bg-white/90 active:bg-white/80 flex w-full max-w-full mt-6 items-center justify-center rounded-lg px-4 py-4 text-base font-medium"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
            </form>
            <Link to="/register" className="font-medium text-black text-sm">
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
