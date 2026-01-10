import AdminUserTable from "./AdminUserTable";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function AdminDashboard() {
  return (
    <div className="mt-10 ">

      <h2 className="text-4xl my-6  font-bold text-purple-400">
        Admin Control Panel
      </h2>

      <div>

        <AdminUserTable />

        <div className="max-w-40 mt-10 bg-gray-700 px-4 py-3 text-center rounded-full ">
          <Link href="/admin/audit-logs" className=" flex items-center text-white hover:text-blue-600 text-xl  hover:underline">
            Audit Logs <IoIosArrowRoundForward size={30}/>
          </Link>
        </div>

      </div>

    </div>
  );
}

