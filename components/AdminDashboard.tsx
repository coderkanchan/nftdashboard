
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { redirect } from "next/navigation";

// export default async function DashboardPage() {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     redirect("/login");
//   }

//   return (

//       <div className="mt-10 border border-red-500 p-6 rounded-xl">
//         <h2 className="text-xl font-bold text-red-400">
//           Admin Panel
//         </h2>

//         <ul className="mt-4 space-y-2">
//           <li>✔ View all users</li>
//           <li>✔ Delete / block users</li> 
//           <li>✔ View audit logs</li>
//         </ul>
//       </div>

//   );
// }










// "use client";

// import { useEffect, useState } from "react";

// export default function AdminDashboard() {
//   const [users, setUsers] = useState<any[]>([]);

//   useEffect(() => {
//     fetch("/api/admin/users")
//       .then(res => res.json())
//       .then(setUsers);
//   }, []);

//   const handleAction = async (userId: string, action: string) => {
//     await fetch("/api/admin/user-action", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ userId, action }),
//     });
//     location.reload();
//   };

//   return (
//     <div className="bg-zinc-900 p-6 rounded-xl mt-10">
//       <h2 className="text-2xl font-bold mb-6 text-purple-400">
//         Admin Panel
//       </h2>

//       <table className="w-full text-left text-sm">
//         <thead className="border-b border-zinc-700 text-zinc-400">
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Provider</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {users.map(user => (
//             <tr key={user._id} className="border-b border-zinc-800">
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>{user.provider}</td>
//               <td>
//                 {user.isBlocked ? "Blocked" : "Active"}
//               </td>
//               <td className="space-x-2">
//                 {!user.isBlocked ? (
//                   <button
//                     onClick={() =>
//                       handleAction(user._id, "block")
//                     }
//                     className="text-red-400"
//                   >
//                     Block
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() =>
//                       handleAction(user._id, "unblock")
//                     }
//                     className="text-green-400"
//                   >
//                     Unblock
//                   </button>
//                 )}
//                 <button
//                   onClick={() =>
//                     handleAction(user._id, "delete")
//                   }
//                   className="text-red-600"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



import AdminUserTable from "./AdminUserTable";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="mt-10 ">

      <h2 className="text-4xl my-6  font-bold text-purple-400">
        Admin Control Panel
      </h2>

      <div>

        <AdminUserTable />

        <Link href="/admin/audit-logs" className="text-blue-500 hover:underline pt-10">
          Audit Logs
        </Link>

      </div>

    </div>
  );
}

