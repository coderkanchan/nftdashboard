import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AdminDashboard from "@/components/AdminDashboard";
import UserDashboard from '@/components/UserDashboard';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) return <div>Please login</div>;

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold">
        Welcome {session.user.email}
      </h1>

      {session.user.role === "admin" ? (
        <div className="">
          <p className="mt-6 text-zinc-400">
            You are logged in as a admin
          </p>


          <AdminDashboard />
        </div>

      ) : (

        <div className="">
          <p className="mt-6 text-zinc-400">
            You are logged in as a user
          </p>


          <UserDashboard />
        </div>
      )}
    </div>
  );
}
