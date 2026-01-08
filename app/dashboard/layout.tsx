// import Sidebar from "@/components/Sidebar";
// import Navbar from "@/components/Navbar";

// export default function DashboardLayout({children,}: {children: React.ReactNode;}) {
//   return (
//     <div className="flex min-h-screen bg-[#0c0c0e]">
//       <Sidebar />

//       <div className="flex-1 flex flex-col">
//         <Navbar />
//         <main className="p-6">{children}</main>
//       </div>
//     </div>
//   );
// }




"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    // ❌ session missing
    if (!session) {
      router.replace("/login");
      return;
    }

    // 🚫 BLOCKED USER → FORCE LOGOUT
    if (session.user.isBlocked) {
      signOut({
        callbackUrl: "/login?blocked=true",
      });
    }
  }, [session, status, router]);

  return (
    <div className="flex min-h-screen bg-[#0c0c0e]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
