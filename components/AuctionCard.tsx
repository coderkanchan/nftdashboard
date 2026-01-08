export default function AuctionCard() {
  return (
    <div className="bg-linear-to-r from-purple-700 to-pink-600 rounded-3xl p-6 flex gap-6 items-center">

      <div className="w-64 h-64 bg-purple-300 rounded-2xl"></div>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Magic Bullets</h1>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-zinc-700"></div>
          <div>
            <p className="font-semibold">Debbie Reese</p>
            <p className="text-zinc-300 text-sm">@debbie111</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-4">
          <div>
            <p className="text-zinc-200 text-sm">Price per NFT</p>
            <h3 className="text-xl font-bold">80 PLAYR</h3>
          </div>
          <div>
            <p className="text-zinc-200 text-sm">Starts in</p>
            <h3 className="text-xl font-bold">02h 32m 44s</h3>
          </div>
        </div>

        <div className="flex gap-4">
          <button className="px-5 py-2 bg-white text-black rounded-lg font-semibold">
            View Rewards
          </button>
          <button className="px-5 py-2 border border-white rounded-lg font-semibold">
            View Collection
          </button>
        </div>
      </div>
    </div>
  );
}
