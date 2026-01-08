// "use client";

// import { useEffect, useState } from "react";

// export default function AdminUserTable() {
//   const [users, setUsers] = useState<any[]>([]);

//   const loadUsers = async () => {
//     const res = await fetch("/api/admin/users");
//     setUsers(await res.json());
//   };

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   const blockUser = async (id: string) => {
//     await fetch(`/api/admin/user/${id}/block`, { method: "PATCH" });
//     loadUsers();
//   };

//   const deleteUser = async (id: string) => {
//     if (!confirm("Delete user?")) return;
//     await fetch(`/api/admin/user/${id}/delete`, { method: "DELETE" });
//     loadUsers();
//   };

//   return (
//     <table className="w-full mt-6 text-left">
//       <thead>
//         <tr className="text-zinc-400">
//           <th>Email</th>
//           <th>Role</th>
//           <th>Status</th>
//           <th>Actions</th>
//         </tr>
//       </thead>

//       <tbody>
//         {users.map((u) => (
//           <tr key={u._id} className="border-b border-zinc-700">
//             <td>{u.email}</td>
//             <td>{u.role}</td>
//             <td>{u.isBlocked ? "Blocked" : "Active"}</td>
//             <td className="space-x-2">
//               <button
//                 onClick={() => blockUser(u._id)}
//                 className="text-yellow-400 cursor-pointer"
//               >
//                 {u.isBlocked ? "Unblock" : "Block"}
//               </button>
//               <button
//                 onClick={() => deleteUser(u._id)}
//                 className="text-red-400 cursor-pointer"
//               >
//                 Delete
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }




// "use client";

// import { useEffect, useState } from "react";

// type User = {
//   _id: string;
//   name: string;
//   email: string; 
//   role: "user" | "admin";
//   isBlocked: boolean;
//   createdAt: string;
// };

// export default function AdminUserTable() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState<string | null>(null);

//   // 🔄 Load all users
//   const loadUsers = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/admin/users");
//       const data = await res.json();
//       setUsers(data.users);
//     } catch (err) {
//       console.error("Failed to load users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   // 🚫 Block / Unblock user
//   const toggleBlockUser = async (id: string) => {
//     setActionLoading(id);

//     const res = await fetch(`/api/admin/user/${id}/block`, {
//       method: "PATCH",
//     });

//     if (!res.ok) {
//       alert("Failed to update user status");
//       setActionLoading(null);
//       return;
//     }

//     await loadUsers();
//     setActionLoading(null);
//   };

//   // 🗑️ Delete user
//   const deleteUser = async (id: string) => {
//     const confirmDelete = confirm(
//       "Are you sure? This user will be permanently deleted."
//     );
//     if (!confirmDelete) return;

//     setActionLoading(id);

//     const res = await fetch(`/api/admin/user/${id}/delete`, {
//       method: "DELETE",
//     });

//     if (!res.ok) {
//       alert("Failed to delete user");
//       setActionLoading(null);
//       return;
//     }

//     await loadUsers();
//     setActionLoading(null);
//   };

//   if (loading) {
//     return (
//       <div className="text-zinc-400 mt-10">
//         Loading users...
//       </div>
//     );
//   }

//   return (
//     <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
//       <h2 className="text-xl font-bold text-white p-4 border-b border-zinc-800">
//         👑 Admin — User Management
//       </h2>

//       <table className="w-full text-left text-sm">
//         <thead className="bg-zinc-800 text-zinc-300">
//           <tr>
//             <th className="p-3">Name</th>
//             <th className="p-3">Email</th>
//             <th className="p-3">Role</th>
//             <th className="p-3">Status</th>
//             <th className="p-3 text-right">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {users.map((user) => (
//             <tr
//               key={user._id}
//               className="border-b border-zinc-800 hover:bg-zinc-800/40"
//             >
//               <td className="p-3 text-white">{user.name}</td>
//               <td className="p-3 text-zinc-400">{user.email}</td>
//               <td className="p-3">
//                 <span
//                   className={`px-2 py-1 rounded text-xs font-semibold ${user.role === "admin"
//                     ? "bg-purple-600 text-white"
//                     : "bg-zinc-700 text-zinc-200"
//                     }`}
//                 >
//                   {user.role}
//                 </span>
//               </td>
//               <td className="p-3">
//                 {user.isBlocked ? (
//                   <span className="text-red-400 font-medium">Blocked</span>
//                 ) : (
//                   <span className="text-green-400 font-medium">Active</span>
//                 )}
//               </td>

//               <td className="p-3 flex justify-end gap-2">
//                 {/* BLOCK / UNBLOCK */}
//                 <button
//                   disabled={actionLoading === user._id}
//                   onClick={() => toggleBlockUser(user._id)}
//                   className={`px-3 py-1 rounded text-xs font-semibold transition ${user.isBlocked
//                     ? "bg-green-600 hover:bg-green-700"
//                     : "bg-yellow-600 hover:bg-yellow-700"
//                     } text-white disabled:opacity-50`}
//                 >
//                   {user.isBlocked ? "Unblock" : "Block"}
//                 </button>

//                 {/* DELETE */}
//                 <button
//                   disabled={actionLoading === user._id}
//                   onClick={() => deleteUser(user._id)}
//                   className="px-3 py-1 rounded text-xs font-semibold bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}

//           {users.length === 0 && (
//             <tr>
//               <td
//                 colSpan={5}
//                 className="p-6 text-center text-zinc-500"
//               >
//                 No users found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }





// "use client";

// import { useEffect, useState } from "react";

// interface User {
//   _id: string;
//   name?: string;
//   email: string;
//   role: "user" | "admin";
//   isBlocked: boolean;
//   createdAt?: string;
// }

// export default function AdminUserTable() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState<string | null>(null);
//   const [error, setError] = useState("");

//   // 🔄 LOAD USERS
//   const loadUsers = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/admin/users");

//       if (!res.ok) {
//         throw new Error("Failed to fetch users");
//       }

//       const data = await res.json();

//       // 🛡️ SAFETY CHECK
//       if (Array.isArray(data.users)) {
//         setUsers(data.users);
//       } else if (Array.isArray(data)) {
//         setUsers(data);
//       } else {
//         setUsers([]);
//       }
//     } catch (err) {
//       console.error("Load users error:", err);
//       setError("Failed to load users");
//       setUsers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   // 🚫 BLOCK / UNBLOCK
//   const toggleBlock = async (userId: string, block: boolean) => {
//     if (!confirm(`Are you sure you want to ${block ? "block" : "unblock"} this user?`)) {
//       return;
//     }

//     setActionLoading(userId);

//     try {
//       const res = await fetch(`/api/admin/user/${userId}/block`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ block }),
//       });

//       if (!res.ok) {
//         throw new Error("Block failed");
//       }

//       // 🔄 Update UI instantly
//       setUsers((prev) =>
//         prev.map((u) =>
//           u._id === userId ? { ...u, isBlocked: block } : u
//         )
//       );
//     } catch (err) {
//       alert("Failed to update block status");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   // 🗑️ DELETE USER
//   const deleteUser = async (userId: string) => {
//     if (!confirm("This will permanently delete the user. Continue?")) return;

//     setActionLoading(userId);

//     try {
//       const res = await fetch(`/api/admin/user/${userId}/delete`, {
//         method: "DELETE",
//       });

//       if (!res.ok) {
//         throw new Error("Delete failed");
//       }

//       // 🔥 Remove from UI
//       setUsers((prev) => prev.filter((u) => u._id !== userId));
//     } catch (err) {
//       alert("Failed to delete user");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   // ⏳ LOADING STATE
//   if (loading) {
//     return (
//       <div className="text-center py-10 text-zinc-400 text-lg">
//         Loading users...
//       </div>
//     );
//   }

//   // ❌ ERROR STATE
//   if (error) {
//     return (
//       <div className="text-center py-10 text-red-400 text-lg">
//         {error}
//       </div>
//     );
//   }

//   // 📭 EMPTY STATE
//   if (!Array.isArray(users) || users.length === 0) {
//     return (
//       <div className="text-center py-10 text-zinc-400 text-lg">
//         No users found
//       </div>
//     );
//   }

//   // ✅ TABLE
//   return (
//     <div className="overflow-x-auto rounded-xl border border-zinc-800">
//       <table className="w-full text-left text-sm">
//         <thead className="bg-zinc-900 text-zinc-300">
//           <tr>
//             <th className="px-4 py-3">Name</th>
//             <th className="px-4 py-3">Email</th>
//             <th className="px-4 py-3">Role</th>
//             <th className="px-4 py-3">Status</th>
//             <th className="px-4 py-3 text-right">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {Array.isArray(users) &&
//             users.map((user) => (
//               <tr
//                 key={user._id}
//                 className="border-t border-zinc-800 hover:bg-zinc-800/40"
//               >
//                 <td className="px-4 py-3">
//                   {user.name || "—"}
//                 </td>

//                 <td className="px-4 py-3">
//                   {user.email}
//                 </td>

//                 <td className="px-4 py-3 capitalize">
//                   {user.role}
//                 </td>

//                 <td className="px-4 py-3">
//                   {user.isBlocked ? (
//                     <span className="text-red-400">Blocked</span>
//                   ) : (
//                     <span className="text-green-400">Active</span>
//                   )}
//                 </td>

//                 <td className="px-4 py-3 text-right space-x-2">
//                   <button
//                     disabled={actionLoading === user._id}
//                     onClick={() => toggleBlock(user._id, !user.isBlocked)}
//                     className={`px-3 py-1 rounded text-xs font-semibold ${user.isBlocked
//                         ? "bg-green-600 hover:bg-green-700"
//                         : "bg-yellow-600 hover:bg-yellow-700"
//                       } disabled:opacity-50`}
//                   >
//                     {user.isBlocked ? "Unblock" : "Block"}
//                   </button>

//                   <button
//                     disabled={actionLoading === user._id}
//                     onClick={() => deleteUser(user._id)}
//                     className="px-3 py-1 rounded text-xs font-semibold bg-red-600 hover:bg-red-700 disabled:opacity-50"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }







"use client";

import { useEffect, useState } from "react";

interface User {
  _id: string;
  name?: string;
  email: string;
  role: "user" | "admin";
  isBlocked: boolean;
  createdAt?: string;
}

export default function AdminUserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  // 🔄 LOAD USERS
  const loadUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();
      setUsers(Array.isArray(data.users) ? data.users : []);
    } catch (err) {
      setError("Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // 🚫 BLOCK / UNBLOCK
  // const toggleBlock = async (userId: string) => {
  //   if (!confirm("Are you sure?")) return;

  //   setActionLoading(userId);

  //   try {
  //     const res = await fetch(`/api/admin/user/${userId}/block`, {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       credentials: "include", // 🔥 IMPORTANT
  //     });

  //     if (!res.ok) throw new Error("Block failed");

  //     const data = await res.json();

  //     // ✅ use backend response
  //     setUsers((prev) =>
  //       prev.map((u) =>
  //         u._id === userId ? { ...u, isBlocked: data.blocked } : u
  //       )
  //     );
  //   } catch {
  //     alert("Failed to update block status");
  //   } finally {
  //     setActionLoading(null);
  //   }
  // };

  const toggleBlock = async (userId: string) => {
    if (!confirm("Are you sure?")) return;

    setActionLoading(userId);

    try {
      const res = await fetch(`/api/admin/user/${userId}/block`, {
        method: "PATCH",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Block failed");

      const data = await res.json();

      // ✅ DB TRUTH → UI
      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, isBlocked: data.blocked } : u
        )
      );
    } catch {
      alert("Failed to update block status");
    } finally {
      setActionLoading(null);
    }
  };


  // 🗑️ DELETE USER
  const deleteUser = async (userId: string) => {
    if (!confirm("This will permanently delete the user. Continue?")) return;

    setActionLoading(userId);

    try {
      const res = await fetch(`/api/admin/user/${userId}/delete`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Delete failed");

      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch {
      alert("Failed to delete user");
    } finally {
      setActionLoading(null);
    }
  };

  // ⏳ LOADING
  if (loading) {
    return (
      <div className="text-center py-10 text-zinc-400 text-lg">
        Loading users...
      </div>
    );
  }

  // ❌ ERROR
  if (error) {
    return (
      <div className="text-center py-10 text-red-400 text-lg">
        {error}
      </div>
    );
  }

  // 📭 EMPTY
  if (users.length === 0) {
    return (
      <div className="text-center py-10 text-zinc-400 text-lg">
        No users found
      </div>
    );
  }

  // ✅ TABLE
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-900 text-zinc-300">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="border-t border-zinc-800 hover:bg-zinc-800/40"
            >
              <td className="px-4 py-3">{user.name || "—"}</td>
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3 capitalize">{user.role}</td>
              <td className="px-4 py-3">
                {user.isBlocked ? (
                  <span className="text-red-400">Blocked</span>
                ) : (
                  <span className="text-green-400">Active</span>
                )}
              </td>

              <td className="px-4 py-3 text-right space-x-2">
                <button
                  disabled={actionLoading === user._id}
                  onClick={() => toggleBlock(user._id)}
                  className={`px-3 py-1 rounded text-xs font-semibold ${user.isBlocked
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-yellow-600 hover:bg-yellow-700"
                    } disabled:opacity-50`}
                >
                  {user.isBlocked ? "Unblock" : "Block 🚫"}
                </button>

                <button
                  disabled={actionLoading === user._id}
                  onClick={() => deleteUser(user._id)}
                  className="px-3 py-1 rounded text-xs font-semibold bg-red-600 hover:bg-red-700 disabled:opacity-50"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
