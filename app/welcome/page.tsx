import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import WelcomeClient from "./welcome-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function WelcomePage() {
  const session = await getServerSession();

  // 🔒 NOT LOGGED IN
  if (!session) {
    redirect("/login");
  }

  return <WelcomeClient name={session.user?.name || "User"} />;
}
