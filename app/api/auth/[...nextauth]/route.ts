// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";

// export const authOptions = {
//   session: {
//     strategy: "jwt",
//   },

//   providers: [
//     CredentialsProvider({
//       name: "credentials",

//       credentials: {
//         email: {},
//         password: {},
//       },

//       async authorize(credentials: any) {
//         await connectDB();

//         const user = await User.findOne({ email: credentials.email });

//         if (!user) throw new Error("User not found");

//         const isMatch = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!isMatch) throw new Error("Invalid credentials");

//         return {
//           id: user._id.toString(),
//           name: user.name,
//           email: user.email,
//           role: user.role
//         };
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.user = {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//         };
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       session.user = token.user as {
//         id: string;
//         name: string;
//         email: string;
//       };
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };









// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";

// /**
//  * 🔐 NextAuth Configuration
//  */
// export const authOptions: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//   },

//   providers: [
//     CredentialsProvider({
//       name: "Credentials",

//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Missing credentials");
//         }

//         await connectDB();

//         const user = await User.findOne({ email: credentials.email });

//         if (!user) {
//           throw new Error("User not found");
//         }

//         const isPasswordCorrect = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!isPasswordCorrect) {
//           throw new Error("Invalid password");
//         }

//         // ✅ Returned object becomes `user` in callbacks
//         return {
//           id: user._id.toString(),
//           name: user.name,
//           email: user.email,
//           role: user.role, // 👈 VERY IMPORTANT
//         };
//       },
//     }),
//   ],

//   callbacks: {
//     /**
//      * 🔑 JWT callback
//      */
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//         token.email = user.email;
//         token.role = (user as any).role;
//       }
//       return token;
//     },

//     /**
//      * 🧠 Session callback
//      */
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         session.user.role = token.role as string;
//       }
//       return session;
//     },
//   },

//   pages: {
//     signIn: "/login",
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// };

// /**
//  * 🚀 NextAuth Handler
//  */
// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };











// import NextAuth, { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";

// export const authOptions: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//   },

//   providers: [
//     // 🔵 GOOGLE LOGIN
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),

//     // 🔐 EMAIL / PASSWORD LOGIN
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;

//         await connectDB();

//         const user = await User.findOne({ email: credentials.email });
//         if (!user) return null;

//         const isMatch = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!isMatch) return null;

//         return {
//           id: user._id.toString(),
//           name: user.name,
//           email: user.email,
//           role: user.role,
//         };
//       },
//     }),
//   ],

//   callbacks: {
//     // 🔐 JWT
//     // async jwt({ token, user }) {
//     //   if (user) {
//     //     token.id = user.id;
//     //     token.role = (user as any).role || "user";
//     //   }
//     //   return token;
//     // },

//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }

//       if (token.email) {
//         await connectDB();
//         const dbUser = await User.findOne({ email: token.email });
//         token.role = dbUser?.role || "user";
//       }

//       return token;
//     }

//     // 🧠 SESSION
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         session.user.role = token.role as "user" | "admin";
//       }
//       return session;
//     },

//     // 🔵 Google user DB save
//     async signIn({ user, account }) {
//       if (account?.provider === "google") {
//         await connectDB();

//         const existingUser = await User.findOne({ email: user.email });

//         if (!existingUser) {
//           await User.create({
//             name: user.name,
//             email: user.email,
//             password: "",
//             role: "user", // default
//           });
//         }
//       }
//       return true;
//     },
//   },

//   pages: {
//     signIn: "/login",
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };










// import NextAuth, { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";

// export const authOptions: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//   },

//   providers: [
//     // 🔵 GOOGLE LOGIN
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),

//     // 🔐 EMAIL / PASSWORD LOGIN
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;

//         await connectDB();

//         const user = await User.findOne({ email: credentials.email });
//         if (!user || !user.password) return null;

//         const isMatch = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!isMatch) return null;

//         return {
//           id: user._id.toString(),
//           email: user.email,
//           name: user.name,
//           role: user.role,
//         };
//       },
//     }),
//   ],

//   callbacks: {
//     // 🔐 JWT TOKEN
//     async jwt({ token, user }) {
//       // First login
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//       }

//       // 🔥 ALWAYS sync role from DB (important)
//       if (token.email) {
//         await connectDB();
//         const dbUser = await User.findOne({ email: token.email });
//         token.role = dbUser?.role || "user";
//       }

//       return token;
//     },

//     // 🧠 SESSION OBJECT
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         session.user.role = token.role as "user" | "admin";
//       }
//       return session;
//     },

//     // 🔵 GOOGLE SIGN-IN → SAVE USER IN DB
//     async signIn({ user, account }) {
//       if (account?.provider === "google") {
//         await connectDB();

//         const existingUser = await User.findOne({ email: user.email });

//         if (!existingUser) {
//           await User.create({
//             name: user.name,
//             email: user.email,
//             password: "", // Google users don't need password
//             role: "user", // default role
//           });
//         }
//       }
//       return true;
//     },
//   },

//   pages: {
//     signIn: "/login",
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };










// import NextAuth, { AuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import bcrypt from "bcryptjs";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";

// export const authOptions: AuthOptions = {
//   session: {
//     strategy: "jwt",
//   },

//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {},
//         password: {},
//       },

//       async authorize(credentials) {
//         await connectDB();

//         const user = await User.findOne({
//           email: credentials?.email,
//         });

//         if (!user) throw new Error("User not found");

//         if (user.isBlocked)
//           throw new Error("Account blocked by admin");

//         const isMatch = await bcrypt.compare(
//           credentials!.password,
//           user.password
//         );

//         if (!isMatch) throw new Error("Wrong password");

//         return {
//           id: user._id.toString(),
//           name: user.name,
//           email: user.email,
//           role: user.role,
//         };
//       },
//     }),

//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],

//   callbacks: {
//     async signIn({ user, account }) {
//       if (account?.provider === "google") {
//         await connectDB();

//         let existingUser = await User.findOne({
//           email: user.email,
//         });

//         if (existingUser?.isBlocked) return false;

//         if (!existingUser) {
//           await User.create({
//             name: user.name,
//             email: user.email,
//             provider: "google",
//           });
//         }
//       }
//       return true;
//     },

//     async jwt({ token, user }) {
//       if (user) {
//         token.role = (user as any).role;
//       }
//       return token;
//     },

//     // async session({ session, token }) {
//     //   session.user.role = token.role as string;
//     //   return session;
//     // },

//     async session({ session, token }) {
//       session.user.role = token.role as "user" | "admin";
//       return session;
//     },
//   },

//   pages: {
//     signIn: "/login",
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };



// import NextAuth , { AuthOptions }  from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";

// export const authOptions: AuthOptions = {
//   session: {
//     strategy: "jwt",
//   },

//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),

//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {},
//         password: {},
//       },
//       async authorize(credentials) {
//         await connectDB();

//         const user = await User.findOne({ email: credentials?.email });
//         if (!user) return null;

//         // password check logic yaha hoga
//         return user;
//       },
//     }),
//   ],

//   callbacks: {
//     // 🔐 JWT CALLBACK
//     async jwt({ token, user }) {
//       await connectDB();

//       // first login
//       if (user) {
//         token.id = user._id.toString();
//       }

//       // ✅ ALWAYS get fresh role from DB
//       if (token?.id) {
//         const dbUser = await User.findById(token.id).select("role isBlocked");
//         if (dbUser) {
//           token.role = dbUser.role;
//           token.isBlocked = dbUser.isBlocked;
//         }
//       }

//       return token;
//     },

//     // 🧠 SESSION CALLBACK
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         session.user.role = token.role as "user" | "admin";
//         session.user.isBlocked = token.isBlocked as boolean;
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };







// import NextAuth, { AuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";

// export const authOptions: AuthOptions = {
//   session: {
//     strategy: "jwt",
//   },

//   providers: [
//     // 🔵 GOOGLE LOGIN
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),

//     // 🔐 EMAIL / PASSWORD LOGIN
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null;
//         }

//         await connectDB();

//         const user = await User.findOne({ email: credentials.email });
//         if (!user) return null;

//         // ⚠️ password check yaha hoga (bcrypt)
//         return user;
//       },
//     }),
//   ],

//   callbacks: {
//     // 🔑 JWT CALLBACK (MOST IMPORTANT)
//     async jwt({ token, user }) {
//       await connectDB();

//       // first login
//       if (user) {
//         token.id = user._id.toString();
//       }

//       // ✅ ALWAYS GET LATEST DATA FROM DB
//       if (token?.id) {
//         const dbUser = await User.findById(token.id).select("role isBlocked");
//         if (dbUser) {
//           token.role = dbUser.role;
//           token.isBlocked = dbUser.isBlocked;
//         }
//       }

//       return token;
//     },

//     // 🧠 SESSION CALLBACK
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         session.user.role = token.role as "user" | "admin";
//         session.user.isBlocked = token.isBlocked as boolean;
//       }
//       return session;
//     },
//   },

//   pages: {
//     signIn: "/login",
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };




// import NextAuth, { AuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";

// export const authOptions: AuthOptions = {
//   session: { strategy: "jwt" },

//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),

//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {},
//         password: {},
//       },
//       async authorize(credentials) {
//         await connectDB();
//         const user = await User.findOne({ email: credentials?.email });
//         if (!user || user.isBlocked) return null;
//         return user;
//       },
//     }),
//   ],

//   callbacks: {
//     // ✅ GOOGLE + CREDENTIALS BOTH FIXED
//     async jwt({ token, user }) {
//       await connectDB();

//       // first time login
//       if (user?.email) {
//         const dbUser = await User.findOne({ email: user.email });

//         if (dbUser) {
//           token.id = dbUser._id.toString();
//           token.role = dbUser.role;
//           token.isBlocked = dbUser.isBlocked;
//         }
//       }

//       return token;
//     },

//     async session({ session, token }) {
//       session.user.id = token.id as string;
//       session.user.role = token.role as "user" | "admin";
//       session.user.isBlocked = token.isBlocked as boolean;
//       return session;
//     },

//     // 🔁 IMPORTANT FOR GOOGLE REDIRECT
//     // async redirect({ baseUrl }) {
//     //   return `${baseUrl}/dashboard`;
//     // },
//   },

//   pages: {
//     signIn: "/login",
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };




// import NextAuth, { AuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";

// export const authOptions: AuthOptions = {
//   session: { strategy: "jwt" },

//   providers: [
//     // 🔵 GOOGLE PROVIDER
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),

//     // 🔐 CREDENTIALS PROVIDER
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {},
//         password: {},
//       },
//       async authorize(credentials) {
//         await connectDB();

//         const user = await User.findOne({
//           email: credentials?.email,
//         });

//         if (!user) {
//           throw new Error("INVALID_CREDENTIALS");
//         }

//         if (user.isBlocked) {
//           throw new Error("ACCOUNT_BLOCKED");
//         }

//         return user;
//       },
//     }),
//   ],

//   callbacks: {
//     // 🔐 JWT CALLBACK (GOOGLE + CREDENTIALS)
//     async jwt({ token, user }) {
//       await connectDB();

//       if (user?.email) {
//         const dbUser = await User.findOne({ email: user.email });

//         if (dbUser) {
//           if (dbUser.isBlocked) {
//             throw new Error("ACCOUNT_BLOCKED");
//           }

//           token.id = dbUser._id.toString();
//           token.role = dbUser.role;
//           token.isBlocked = dbUser.isBlocked;
//         }
//       }

//       return token;
//     },

//     // 🧾 SESSION CALLBACK
//     async session({ session, token }) {
//       if (token.isBlocked) {
//         return null;
//       }

//       session.user.id = token.id as string;
//       session.user.role = token.role as "user" | "admin";
//       session.user.isBlocked = token.isBlocked as boolean;

//       return session;
//     },
//   },

//   pages: {
//     signIn: "/login",
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };














// import NextAuth, { AuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";

// export const authOptions: AuthOptions = {
//   session: { strategy: "jwt" },

//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),

//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {},
//         password: {},
//       },
//       async authorize(credentials) {
//         await connectDB();

//         const user = await User.findOne({ email: credentials?.email });

//         if (!user) {
//           throw new Error("INVALID_CREDENTIALS");
//         }

//         if (user.isBlocked) {
//           throw new Error("ACCOUNT_BLOCKED");
//         }

//         return user;
//       },
//     }),
//   ],

//   callbacks: {
//     // 🔐 JWT CALLBACK (BLOCK CHECK HERE)
//     async jwt({ token, user }) {
//       await connectDB();

//       if (user?.email) {
//         const dbUser = await User.findOne({ email: user.email });

//         if (!dbUser) return token;

//         if (dbUser.isBlocked) {
//           token.isBlocked = true;
//           return token;
//         }

//         token.id = dbUser._id.toString();
//         token.role = dbUser.role;
//         token.isBlocked = dbUser.isBlocked;
//       }

//       return token;
//     },

//     // ✅ SESSION CALLBACK (NEVER RETURN NULL)
//     async session({ session, token }) {
//       session.user.id = token.id as string;
//       session.user.role = token.role as "user" | "admin";
//       session.user.isBlocked = token.isBlocked as boolean;

//       return session; // ✅ ALWAYS RETURN SESSION
//     },
//   },

//   pages: {
//     signIn: "/login",
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };











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
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
