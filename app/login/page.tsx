"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TbEyeClosed } from "react-icons/tb";
import { IoMdEye } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
      callbackUrl: "/welcome",
    });

    if (res?.error === "ACCOUNT_BLOCKED") {
      setLoading(false);
      setError("Your account has been blocked. Please contact support.");
      return;
    }

    if (res?.error) {
      setLoading(false);
      setError("Invalid email or password");
      return;
    }

    router.push(res?.url || "/welcome");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-zinc-900 p-10 py-16 rounded-2xl max-w-2xl w-full shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-10">
          Log in to your account
        </h2>

        {/* 🔵 GOOGLE LOGIN */}
        <button
          type="button"
          onClick={() =>
            signIn("google", {
              callbackUrl: "/welcome",
            })
          }
          className="w-full flex items-center justify-center gap-2.5 bg-white text-black text-2xl py-4 rounded-lg font-semibold hover:bg-gray-200 transition cursor-pointer"
        >
          <FcGoogle size={35} />
          Continue with Google
        </button>

        <div className="text-center text-xl w-full h-0.5 bg-gray-500 flex items-center justify-center my-10">
          <div className="text-zinc-400 bg-zinc-900 px-2">or</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <p className="text-red-400 text-center text-lg bg-red-950 p-2 rounded">
              {error}
            </p>
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full p-3 py-4 rounded text-xl bg-zinc-800 outline-none"
            required
          />

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full p-3 py-4 rounded text-xl bg-zinc-800 outline-none"
              required
            />

            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 cursor-pointer text-gray-300 text-3xl"
            >
              {showPass ? <IoMdEye /> : <TbEyeClosed />}
            </span>
          </div>

          <button
            disabled={loading}
            className={`w-full py-3 rounded-lg text-xl font-semibold transition ${loading
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center mt-5 text-xl font-semibold">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
