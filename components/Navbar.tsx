import { LogoutButton } from "@/components/LogoutButton";

export default function Navbar() {
  
  return (
    <header className="flex items-center justify-between p-5 border-b border-zinc-800">
      <input
        type="text"
        placeholder="Search..."
        className="bg-zinc-900 px-4 py-2 rounded-lg w-80 outline-none"
      />

      <div className="flex items-center gap-5">

        <LogoutButton />

        <button className="p-2 rounded-full bg-zinc-900">🔔</button>
        <div className="w-10 h-10 bg-zinc-700 rounded-full"></div>
      </div>
    </header>
  );
}
