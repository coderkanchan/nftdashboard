
// type NFT = {
//   id: number;
//   name: string;
// };

// type NFTCardProps = {
//   nft: NFT;
// };



export default function NFTCard({ nft }: { nft: any }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
      <div className="h-40 bg-zinc-700 rounded-xl mb-4"></div>
      <h4 className="font-semibold">NFT Artwork {nft.name}</h4>
      <p className="text-sm text-zinc-400">Last Bid: 1.57 ETH</p>

      <button className="mt-4 w-full py-2 bg-linear-to-r from-purple-600 to-pink-600 rounded-lg font-semibold">
        Place a Bid
      </button>
    </div>
  );
}
