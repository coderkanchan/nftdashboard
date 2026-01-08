

// type WalletCardProps = {
//   balance: number;
// };



export default function WalletCard({ balance }:  { balance: number }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">

      <div>Balance: {balance}</div>
      
      <p className="text-sm text-zinc-400">Your Balance</p>
      <h2 className="text-3xl font-bold mt-2">ETH 21.533.10</h2>

      <div className="mt-6">
        <p className="text-zinc-400 text-sm">Earnings</p>
        <p className="text-green-400 text-xl font-bold">7.048 ETH</p>
      </div>

      <div className="mt-6">
        <p className="text-zinc-400 text-sm">Spendings</p>
        <p className="text-red-400 text-xl font-bold">2.013 ETH</p>
      </div>
    </div>
  );
}
