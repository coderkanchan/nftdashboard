// import NextAuth, { DefaultSession } from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       role?: "user" | "admin";
//     } & DefaultSession["user"];
//   }

//   interface User {
//     role?: "user" | "admin";
//   }
// }





// import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       role: string;
//       name?: string | null;
//       email?: string | null;
//     };
//   }

//   interface User {
//     role: string;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id: string;
//     role: string;
//   }
// }




// import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       role: "user" | "admin";
//       name?: string | null;
//       email?: string | null;
//     };
//   }

//   interface User {
//     id: string;
//     role: "user" | "admin";
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id: string;
//     role: "user" | "admin";
//   }
// }






// import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       email: string;
//       role: "user" | "admin";
//     };
//   }

//   interface User {
//     role: "user" | "admin";
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     role: "user" | "admin";
//   }
// }




// import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       role: "user" | "admin";
//       isBlocked: boolean;
//     };
//   }

//   interface User {
//     role: "user" | "admin";
//     isBlocked: boolean;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id: string;
//     role: "user" | "admin";
//     isBlocked: boolean;
//   }
// }





// import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       role: "user" | "admin";
//       isBlocked: boolean;
//     };
//   }

//   interface User {
//     role: "user" | "admin";
//     isBlocked: boolean;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id: string;
//     role: "user" | "admin";
//     isBlocked: boolean;
//   }
// }




import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role: "user" | "admin";
      isBlocked: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "user" | "admin";
    isBlocked: boolean;
  }
}
