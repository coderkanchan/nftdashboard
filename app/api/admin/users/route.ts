// import { getServerSession } from "next-auth";
// import { NextResponse } from "next/server";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";

// export async function GET() {
//   const session = await getServerSession(authOptions);

//   if (!session || session.user.role !== "admin") {
//     return NextResponse.json(
//       { error: "Unauthorized" },
//       { status: 403 }
//     );
//   }

//   await connectDB();
//   const users = await User.find().select("-password");
//   return NextResponse.json(users);
// }



// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";

// export async function GET() {
//   await connectDB();
//   const users = await User.find().select("-password");
//   return NextResponse.json(users);
// }





// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";

// export async function GET() {
//   const session = await getServerSession(authOptions);

//   if (!session || session.user.role !== "admin") {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   await connectDB();

//   const users = await User.find().sort({ createdAt: -1 });

//   return NextResponse.json({ users });
// }




import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  await connectDB();
  const users = await User.find().sort({ createdAt: -1 });

  return NextResponse.json({ users });
}
