// import { getServerSession } from "next-auth";
// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";

// export async function GET() {
//   const session = await getServerSession();

//   if (!session) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   await connectDB();

//   const user = await User.findOne({ email: session.user.email }).select("-password");

//   return NextResponse.json({
//     user,
//     wallet: {
//       balance: 24500,
//       currency: "USD",
//     },
//     transactions: [
//       { id: 1, amount: -230, title: "NFT Purchase" },
//       { id: 2, amount: +1200, title: "NFT Sale" },
//     ],
//   });
// }









// import { getServerSession } from "next-auth";
// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";

// export async function GET() {
//   const session = await getServerSession();

//   if (!session?.user?.email) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   await connectDB();

//   const user = await User.findOne({
//     email: session.user.email,
//   }).select("-password");

//   return NextResponse.json({
//     user,
//     wallet: {
//       balance: 24500,
//     },
//     transactions: [
//       { id: 1, title: "NFT Purchase", amount: -230 },
//       { id: 2, title: "NFT Sale", amount: 1200 },
//     ],
//     nfts: [
//       { id: 1, name: "CryptoPunk #123" },
//       { id: 2, name: "BoredApe #456" },
//     ],
//   });
// }



// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// export async function GET() {
//   const session = await getServerSession(authOptions);

//   if (!session || !session.user) {
//     return NextResponse.json(
//       { message: "Unauthorized" },
//       { status: 401 }
//     );
//   }

//   // ✅ Dummy data (later DB se la sakti ho)
//   const data = {
//     wallet: {
//       balance: 2450,
//     },
//     nfts: [
//       { id: 1, name: "Crypto Punk #123" },
//       { id: 2, name: "Bored Ape #456" },
//     ],
//   };

//   return NextResponse.json(data);
// }









// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { headers } from "next/headers";

// export async function GET() {
//   const session = await getServerSession(authOptions);

//   if (!session || !session.user) {
//     return NextResponse.json(
//       { message: "Unauthorized" },
//       { status: 401 }
//     );
//   }

//   // ✅ fake data (later DB se laoge)
//   const data = {
//     wallet: {
//       balance: 2.54,
//     },
//     nfts: [
//       { id: 1, name: "Crypto Punk #1" },
//       { id: 2, name: "Crypto Punk #2" },
//     ],
//   };

//   return NextResponse.json(data);
// }
