import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export const authOptions: AuthOptions = {
  session: { strategy: "jwt" },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials?.email });

        // ❌ USER NOT FOUND
        if (!user) return null;

        // 🚫 BLOCKED USER → LOGIN FAIL
        if (user.isBlocked) {
          throw new Error("ACCOUNT_BLOCKED");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          isBlocked: user.isBlocked,
        };
      },
    }),
  ],

  callbacks: {
    // 🔐 JWT
    async jwt({ token, user }) {
      await connectDB();

      if (user?.email) {
        const dbUser = await User.findOne({ email: user.email });

        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.role;
          token.isBlocked = dbUser.isBlocked;
        }
      }

      return token;
    },

    // 🧠 SESSION (❌ NEVER return null)
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as "user" | "admin";
      session.user.isBlocked = token.isBlocked as boolean;
      return session;
    },

    // async redirect({ baseUrl }) {
    //   return `${baseUrl}/dashboard`;
    // },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
