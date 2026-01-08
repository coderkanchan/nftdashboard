// import { getServerSession } from "next-auth";
// import AuctionCard from "@/components/AuctionCard";
// import WalletCard from "@/components/WalletCard";
// import NFTCard from "@/components/NFTCard";
// import { redirect } from "next/navigation";


// export default async function DashboardPage() {
//    const session = await getServerSession();

//   if (!session) {
//     redirect("/login");
//   }



//   return (
//     <div className="space-y-10 w-full mx-auto">

//       <AuctionCard />

//       {/* Wallet + Transactions Grid */}
//       <div className="grid grid-cols-12 gap-6">
//         <div className="col-span-4">
//           <WalletCard />
//         </div>

//         <div className="col-span-8 bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">
//           <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>

//           <div className="space-y-4">
//             {[1,2,3,4].map((i)=>(
//               <div key={i} className="flex items-center justify-between p-4 bg-zinc-800 rounded-xl">
//                 <div className="flex items-center gap-4">
//                   <div className="w-10 h-10 bg-orange-500 rounded-full"></div>
//                   <div>
//                     <p className="font-semibold">0.55 BTC</p>
//                     <p className="text-zinc-400 text-sm">$21,533.10</p>
//                   </div>
//                 </div>

//                 <p className="font-bold text-red-400">- $2360</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Featured NFTs */}
//       <div>
//         <h2 className="text-xl font-bold mb-4">Featured NFTs</h2>
//         <div className="grid grid-cols-3 gap-6">
//           {[1,2,3].map((id)=>(
//             <NFTCard key={id} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }




// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import AuctionCard from "@/components/AuctionCard";
// import WalletCard from "@/components/WalletCard";
// import NFTCard from "@/components/NFTCard";

// async function getDashboardData() {
//   //   const res = await fetch("http://localhost:3000/api/dashboard", {
//   //     cache: "no-store",
//   //   });

//   //   if (!res.ok) {
//   //     throw new Error("Failed to fetch dashboard data");
//   //   }

//   //   return res.json();
//   // } 

//   // export default async function DashboardPage() {
//   //   const session = await getServerSession();

//   //   if (!session) {
//   //     redirect("/login");
//   //   }

//   //   const data = await getDashboardData();

//   const res = await fetch("http://localhost:3000/api/dashboard", {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch dashboard data");
//   }

//   return res.json();
// }

// export default async function DashboardPage() {
//   let data;

//   try {
//     data = await getDashboardData();
//   } catch (error) {
//     redirect("/login");
//   }

//   return (
//     <div className="space-y-10 w-full mx-auto">

//       {/* Auction Section */}
//       <AuctionCard />

//       {/* Wallet + Transactions */}
//       <div className="grid grid-cols-12 gap-6">
//         <div className="col-span-4">
//           <WalletCard balance={data.wallet.balance} />
//         </div>

//         <div className="col-span-8 bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">
//           <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>

//           <div className="space-y-4">
//             {data.transactions.length === 0 ? (
//               <p className="text-zinc-400">No transactions yet</p>
//             ) : (
//               data.transactions.map((tx: any) => (
//                 <div
//                   key={tx.id}
//                   className="flex items-center justify-between p-4 bg-zinc-800 rounded-xl"
//                 >
//                   <div>
//                     <p className="font-semibold">{tx.title}</p>
//                   </div>

//                   <p
//                     className={`font-bold ${tx.amount < 0 ? "text-red-400" : "text-green-400"
//                       }`}
//                   >
//                     {tx.amount}
//                   </p>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Featured NFTs */}
//       <div>
//         <h2 className="text-xl font-bold mb-4">Featured NFTs</h2>
//         <div className="grid grid-cols-3 gap-6">
//           {data.nfts.map((nft: any) => (
//             <NFTCard key={nft.id} nft={nft} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }





// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { redirect } from "next/navigation";
// import WalletCard from "@/components/WalletCard";
// import NFTCard from "@/components/NFTCard";

// async function getDashboardData() {
//   const res = await fetch("http://localhost:3000/api/dashboard", {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch dashboard data");
//   }

//   return res.json();
// }

// export default async function DashboardPage() {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     redirect("/login");
//   }

//   const data = await getDashboardData();

//   return (
//     <div className="space-y-6">
//       <WalletCard balance={data.wallet.balance} />

//       <div className="grid grid-cols-3 gap-6">
//         {data.nfts.map((nft: any) => (
//           <NFTCard key={nft.id} nft={nft} />
//         ))}
//       </div>
//     </div>
//   );
// }







// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { redirect } from "next/navigation";
// import WalletCard from "@/components/WalletCard";
// import NFTCard from "@/components/NFTCard";

// export default async function DashboardPage() {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     redirect("/login");
//   }

//   const role = session.user.role;

//   const data = {
//     wallet: {
//       balance: 2.54,
//     },
//     nfts: [
//       { id: 1, name: "Crypto Punk #1" },
//       { id: 2, name: "Crypto Punk #2" },
//     ],
//   };

//   return (
//     <div className="space-y-6">

//       <h1 className="text-2xl font-bold">
//         Welcome {session.user.name}
//       </h1>



//       <p className="text-zinc-400 text-sm">
//         Logged in as: <b>{session.user.role}</b>
//       </p>

//       <WalletCard balance={data.wallet.balance} />

//       <div className="grid grid-cols-3 gap-6">
//         {data.nfts.map((nft) => (
//           <NFTCard key={nft.id} nft={nft} />
//         ))}
//       </div>


//       {role === "admin" && <AdminDashboard />}
//     </div>
//   );
// }






// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "@/lib/auth";
// import WalletCard from "@/components/WalletCard";
// import NFTCard from "@/components/NFTCard";
// import AuctionCard from "@/components/AuctionCard";

// async function getDashboardData() {
//   const res = await fetch("http://localhost:3000/api/dashboard", {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch dashboard data");
//   }

//   return res.json();
// }

// export default async function DashboardPage() {
//   const session = await getServerSession(authOptions);

//   if (!session) redirect("/login");

//   const data = await getDashboardData();

//   return (
//     <div className="space-y-10">
//       <AuctionCard />

//       <WalletCard balance={data.wallet.balance} />

//       <div className="grid grid-cols-3 gap-6">
//         {data.nfts.map((nft: any) => (
//           <NFTCard key={nft.id} nft={nft} />
//         ))}
//       </div>
//     </div>
//   );
// }







// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import UserDashboard from '@/components/UserDashboard';
// import AdminDashboard from '@/components/AdminDashboard';

// export default async function DashboardPage() {
//   const session = await getServerSession(authOptions);

//   if (!session) redirect("/login");

//   const role = session.user.role; // 🔥 KEY LINE

//   return (
//     <div>
//       <p className="text-zinc-400 text-sm">
//         Logged in as: <b>{session.user.role}</b>
//       </p>

//       <h1 className="text-2xl font-bold">
//         Welcome {session.user.name}
//       </h1>

//       {/* USER FEATURES */}
//       <UserDashboard />

//       {/* ADMIN FEATURES */}

//       {role === "admin" && <AdminDashboard />}
//     </div>
//   );
// }







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
