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
