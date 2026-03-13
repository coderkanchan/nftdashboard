"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogoutButton } from "@/components/LogoutButton";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (session) router.push("/dashboard");
    else router.push("/login");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-black via-zinc-900 to-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl "
      >

        {status === "loading" && (
          <p className="text-zinc-400 mb-6 animate-pulse">
            Checking your session...
          </p>
        )}

        <h1 className="text-5xl font-extrabold mb-4 bg-linear-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          NFT Dashboard
        </h1>

        <p className="text-zinc-400 mb-8 text-lg leading-relaxed">
          Track your NFT assets, monitor real-time stats, explore collections,
          and manage your digital portfolio — all in one place.
        </p>

        <motion.button
          whileTap={{ scale: 0.94 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleClick}
          className="bg-purple-600 px-8 py-3 text-lg rounded-xl hover:bg-purple-700 transition font-medium shadow-lg shadow-purple-700/30 mx-10"
        >
          {session ? "Continue to Dashboard →" : "Get Started"}
        </motion.button>

        <LogoutButton />


        {session && (
          <p className="mt-4 text-zinc-500">
            Logged in as <span className="text-purple-400">{session.user?.name}</span>
          </p>
        )}
      </motion.div>

    </div>
  );
}
