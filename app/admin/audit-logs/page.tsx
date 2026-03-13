"use client";
import { useEffect, useState } from "react";

interface AuditLog {
  _id: string;
  action: string;
  performedBy: string;
  targetUser: string;
  createdAt: string;
}

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/audit-logs", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setLogs(data.logs || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-zinc-400">Loading audit logs...</p>;
  }

  return (
    <div className="p-10">
      
      <div className="p-10">

        <h1 className="text-2xl font-semibold mb-6">Audit Logs</h1>

        <div className="overflow-x-auto border border-zinc-800 rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900">
              <tr>
                <th className="px-4 py-3 text-left">Action</th>
                <th className="px-4 py-3 text-left">Performed By</th>
                <th className="px-4 py-3 text-left">Target User</th>
                <th className="px-4 py-3 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr
                  key={log._id}
                  className="border-t border-zinc-800"
                >
                  <td className="px-4 py-3 text-yellow-400">
                    {log.action}
                  </td>
                  <td className="px-4 py-3">
                    {log.performedBy}
                  </td>
                  <td className="px-4 py-3">
                    {log.targetUser}
                  </td>
                  <td className="px-4 py-3 text-zinc-400">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
