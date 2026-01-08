export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#121214] border-r border-zinc-800 p-6 flex flex-col">
      <div className="text-2xl font-bold mb-10">Logo</div>

      <nav className="space-y-4">
        <a className="flex items-center gap-3 py-3 px-4 rounded-xl bg-linear-to-r from-pink-500 to-purple-600 font-semibold cursor-pointer">
          Dashboard
        </a>
        <a className="block py-3 px-4 hover:bg-zinc-800 rounded-xl">Auctions</a>
        <a className="block py-3 px-4 hover:bg-zinc-800 rounded-xl">Inbox</a>
        <a className="block py-3 px-4 hover:bg-zinc-800 rounded-xl">Favorites</a>
      </nav>

      <div className="mt-10 text-sm text-zinc-500">WALLETS</div>
      <div className="space-y-3 mt-3">
        <div className="p-3 rounded-lg bg-zinc-900">Bitcoin</div>
        <div className="p-3 rounded-lg bg-zinc-900">Ethereum</div>
        <div className="p-3 rounded-lg bg-zinc-900">USD Coin</div>
      </div>
    </aside>
  );
}
