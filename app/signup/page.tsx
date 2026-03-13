"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TbEyeClosed } from "react-icons/tb";
import { IoMdEye } from "react-icons/io";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        setLoading(false);
        return;
      }
      const login = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
        callbackUrl: "/welcome",
      });

      if (login?.error) {
        setError("Account created but login failed");
        setLoading(false);
        return;
      }

      router.push(login?.url || "/welcome");

    } catch {
      setError("Server error. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-10 py-20 rounded-2xl max-w-2xl w-full space-y-6 shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center">Create Account</h2>

        <button
          type="button"
          onClick={() =>
            signIn("google", {
              callbackUrl: "/welcome",
            })
          }
          className="w-full flex items-center justify-center gap-2.5 bg-white text-black text-xl py-4 rounded-lg font-medium hover:bg-gray-200 hover:rounded-3xl transition-all duration-200 cursor-pointer"
        >
          <FcGoogle size={35} />
          Sign up with Google
        </button>

        <div className="text-center text-xl w-full h-0.5 bg-gray-500 flex items-center justify-center my-10">
          <div className="text-zinc-400 bg-zinc-900 px-2">or</div>
        </div>

        {error && (
          <p className="bg-red-950 text-red-400 p-3 rounded text-center text-lg">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 py-4 rounded text-xl bg-zinc-800 outline-none"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 py-4 rounded text-xl bg-zinc-800 outline-none"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />

        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 py-4 rounded text-xl bg-zinc-800 outline-none"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
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
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="text-center mt-5 text-xl font-semibold">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
