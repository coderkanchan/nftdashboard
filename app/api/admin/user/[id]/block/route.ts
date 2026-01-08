

// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";
// import AuditLog from "@/models/AuditLog";

// export async function PATCH(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   // 🔐 AUTH CHECK
//   const session = await getServerSession(authOptions);
//   if (!session || session.user.role !== "admin") {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   await connectDB();

//   const user = await User.findById(params.id);
//   if (!user) {
//     return NextResponse.json({ error: "User not found" }, { status: 404 });
//   }

//   user.isBlocked = !user.isBlocked;
//   await user.save();

//   await AuditLog.create({
//     action: user.isBlocked ? "BLOCK_USER" : "UNBLOCK_USER",
//     performedBy: session.user.email,
//     targetUser: user.email,
//   });

//   return NextResponse.json({
//     success: true,
//     blocked: user.isBlocked,
//   });
// }




// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import  { connectDB } from "@/lib/db";
// import User from "@/models/User";

// export async function PATCH(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const session = await getServerSession(authOptions);

//   if (!session || session.user.role !== "admin") {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//   }

//   const { block } = await req.json();

//   await connectDB();
//   await User.findByIdAndUpdate(params.id, {
//     isBlocked: block,
//   });

//   return NextResponse.json({ success: true });
// }





// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";
// import AuditLog from "@/models/AuditLog";

// export async function PATCH(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   // 🔐 AUTH CHECK
//   const session = await getServerSession(authOptions);

//   if (!session || session.user.role !== "admin") {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   // 📩 READ BODY (FIX)
//   const { block } = await req.json();

//   if (typeof block !== "boolean") {
//     return NextResponse.json(
//       { error: "Invalid block value" },
//       { status: 400 }
//     );
//   }

//   await connectDB();

//   const user = await User.findById(params.id);
//   if (!user) {
//     return NextResponse.json({ error: "User not found" }, { status: 404 });
//   }

//   // ✅ APPLY EXACT VALUE (FIX)
//   user.isBlocked = block;
//   await user.save();

//   // 🧾 AUDIT LOG (unchanged)
//   await AuditLog.create({
//     action: block ? "BLOCK_USER" : "UNBLOCK_USER",
//     performedBy: session.user.email,
//     targetUser: user.email,
//   });

//   return NextResponse.json({
//     success: true,
//     blocked: user.isBlocked,
//   });
// }






// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";
// import AuditLog from "@/models/AuditLog";

// export async function PATCH(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     // 🔐 AUTH CHECK
//     const session = await getServerSession(authOptions);

//     if (!session || session.user.role !== "admin") {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     await connectDB();

//     const user = await User.findById(params.id);

//     if (!user) {
//       return NextResponse.json(
//         { error: "User not found" },
//         { status: 404 }
//       );
//     }

//     // ❗ ADMIN SELF-BLOCK PROTECTION
//     if (user.role === "admin") {
//       return NextResponse.json(
//         { error: "Admin cannot be blocked" },
//         { status: 400 }
//       );
//     }

//     // 🔄 TOGGLE BLOCK
//     user.isBlocked = !user.isBlocked;
//     await user.save();

//     // 🧾 AUDIT LOG
//     await AuditLog.create({
//       action: user.isBlocked ? "BLOCK_USER" : "UNBLOCK_USER",
//       performedBy: session.user.email,
//       targetUser: user.email,
//     });

//     // ✅ ALWAYS RETURN JSON
//     return NextResponse.json({
//       success: true,
//       blocked: user.isBlocked,
//     });
//   } catch (error) {
//     console.error("BLOCK USER ERROR:", error);

//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }






// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";
// import AuditLog from "@/models/AuditLog";

// export async function PATCH(
//   req: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   try {
//     // ✅ FIX: await params
//     const { id } = await context.params;

//     // 🔐 AUTH CHECK
//     const session = await getServerSession(authOptions);

//     if (!session || session.user.role !== "admin") {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     await connectDB();

//     const user = await User.findById(id);

//     if (!user) {
//       return NextResponse.json(
//         { error: "User not found" },
//         { status: 404 }
//       );
//     }

//     // ❗ Admin protection
//     if (user.role === "admin") {
//       return NextResponse.json(
//         { error: "Admin cannot be blocked" },
//         { status: 400 }
//       );
//     }

//     // 🔄 Toggle block
//     user.isBlocked = !user.isBlocked;
//     await user.save();

//     // 🧾 Audit log
//     await AuditLog.create({
//       action: user.isBlocked ? "BLOCK_USER" : "UNBLOCK_USER",
//       performedBy: session.user.email,
//       targetUser: user.email,
//     });

//     return NextResponse.json({
//       success: true,
//       blocked: user.isBlocked,
//     });
//   } catch (error) {
//     console.error("BLOCK USER ERROR:", error);

//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }




// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";
// import AuditLog from "@/models/AuditLog";
// import { sendEmail } from "@/lib/mailer";

// export async function PATCH(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const session = await getServerSession(authOptions);

//   if (!session || session.user.role !== "admin") {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   await connectDB();

//   const user = await User.findById(params.id);
//   if (!user) {
//     return NextResponse.json({ error: "User not found" }, { status: 404 });
//   }

//   // 🔁 TOGGLE BLOCK
//   user.isBlocked = !user.isBlocked;
//   await user.save();

//   // 📝 AUDIT LOG
//   await AuditLog.create({
//     action: user.isBlocked ? "BLOCK_USER" : "UNBLOCK_USER",
//     performedBy: session.user.email,
//     targetUser: user.email,
//   });

//   // 📩 EMAIL ALERT
//   if (user.isBlocked) {
//     await sendEmail(
//       user.email,
//       "Account Blocked",
//       "Your account has been blocked. Please contact support."
//     );
//   } else {
//     await sendEmail(
//       user.email,
//       "Account Reactivated",
//       "Your account has been reactivated. You can now log in."
//     );
//   }

//   return NextResponse.json({ success: true });
// }





// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";

// export async function PATCH(
//   req: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await connectDB();

//     const { id } = await context.params;

//     const user = await User.findById(id);
//     if (!user) {
//       return NextResponse.json(
//         { error: "User not found" },
//         { status: 404 }
//       );
//     }

//     user.isBlocked = true;
//     await user.save();

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error("BLOCK USER ERROR:", err);
//     return NextResponse.json(
//       { error: "Failed to block user" },
//       { status: 500 }
//     );
//   }
// }




// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";
// import AuditLog from "@/models/AuditLog";

// export async function PATCH(
//   req: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await connectDB();

//     const { id } = await context.params;

//     const user = await User.findById(id);
//     if (!user) {
//       return NextResponse.json(
//         { error: "User not found" },
//         { status: 404 }
//       );
//     }

//     // 🔁 TOGGLE BLOCK
//     user.isBlocked = !user.isBlocked;
//     await user.save();

//     // 🧾 AUDIT LOG
//     await AuditLog.create({
//       action: user.isBlocked ? "USER_BLOCKED" : "USER_UNBLOCKED",
//       performedBy: adminEmail,          // 👈 restored
//       targetUser: user.email,
//     });

//     return NextResponse.json({
//       success: true,
//       blocked: user.isBlocked, // 🔥 UI ke liye truth
//     });
//   } catch (err) {
//     console.error("BLOCK USER ERROR:", err);
//     return NextResponse.json(
//       { error: "Failed to update block status" },
//       { status: 500 }
//     );
//   }
// }






// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";
// import AuditLog from "@/models/AuditLog";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// export async function PATCH(
//   req: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await connectDB();

//     const session = await getServerSession(authOptions);
//     const adminEmail = session?.user?.email || "system";

//     const { id } = await context.params;

//     const user = await User.findById(id);
//     if (!user) {
//       return NextResponse.json(
//         { error: "User not found" },
//         { status: 404 }
//       );
//     }

//     // 🔁 TOGGLE BLOCK (unchanged logic)
//     user.isBlocked = !user.isBlocked;
//     await user.save();

//     // ✅ AUDIT LOG (RESTORED TO OLD FORMAT)
//     await AuditLog.create({
//       action: user.isBlocked ? "BLOCK_USER" : "UNBLOCK_USER",
//       performedBy: adminEmail,          // 👈 restored
//       targetUser: user.email,            // 👈 restored (email, not id)
//     });

//     return NextResponse.json({
//       success: true,
//       blocked: user.isBlocked,
//     });
//   } catch (err) {
//     console.error("BLOCK USER ERROR:", err);
//     return NextResponse.json(
//       { error: "Failed to update block status" },
//       { status: 500 }
//     );
//   }
// }






import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import AuditLog from "@/models/AuditLog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sendEmail } from "@/lib/mailer";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    const adminEmail = session?.user?.email || "system";

    const { id } = await context.params;

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // 🔁 TOGGLE BLOCK (UNCHANGED)
    user.isBlocked = !user.isBlocked;
    await user.save();

    // 🧾 AUDIT LOG (UNCHANGED)
    await AuditLog.create({
      action: user.isBlocked ? "BLOCK_USER" : "UNBLOCK_USER",
      performedBy: adminEmail,
      targetUser: user.email,
    });

    // 📧 EMAIL ALERT (NEW - SAFE ADD)
    try {
      await sendEmail(
        user.email,
        user.isBlocked
          ? "Your account has been blocked"
          : "Your account has been unblocked",
        user.isBlocked
          ? `
            <p>Hello,</p>
            <p>Your account has been <b>blocked</b> by the admin.</p>
            <p>If you believe this is a mistake, please contact support.</p>
          `
          : `
            <p>Hello,</p>
            <p>Your account has been <b>unblocked</b>.</p>
            <p>You can now login again.</p>
          `
      );
    } catch (mailError) {
      console.error("EMAIL FAILED:", mailError);
      // ❗ intentionally not failing the request
    }

    return NextResponse.json({
      success: true,
      blocked: user.isBlocked,
    });
  } catch (err) {
    console.error("BLOCK USER ERROR:", err);
    return NextResponse.json(
      { error: "Failed to update block status" },
      { status: 500 }
    );
  }
}
