"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function WelcomeClient({ name }: { name: string }) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/dashboard"); // ⛔ no back history
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-3">
          Welcome, <span className="text-purple-400">{name}</span> 👋
        </h1>
        <p className="text-zinc-400 text-lg">
          Preparing your dashboard...
        </p>
      </motion.div>
    </div>
  );
}
