
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import WalletCard from "@/components/WalletCard";
import NFTCard from "@/components/NFTCard";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const data = {
    wallet: {
      balance: 2.54,
    },
    nfts: [
      { id: 1, name: "Crypto Punk #1" },
      { id: 2, name: "Crypto Punk #2" },
    ],
  };

  return (
    <div className="space-y-6">

      <WalletCard balance={data.wallet.balance} />

      <div className="grid grid-cols-3 gap-6">
        {data.nfts.map((nft) => (
          <NFTCard key={nft.id} nft={nft} />
        ))}
      </div>


    </div >
  );
}