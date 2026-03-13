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

  if (loading) {
    return (
      <div className="text-center py-10 text-zinc-400 text-lg">
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-400 text-lg">
        {error}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-10 text-zinc-400 text-lg">
        No users found
      </div>
    );
  }

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
