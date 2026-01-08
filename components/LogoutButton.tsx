"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
    >
      Logout
    </button>
  );
}
