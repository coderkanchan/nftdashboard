// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function middleware(req: NextRequest) {
//   const token = await getToken({ req });
//   const { pathname } = req.nextUrl;

//   // 🔒 Protect dashboard routes
//   if (pathname.startsWith("/dashboard")) {
//     if (!token) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   }

//   // 🔁 Logged-in user shouldn't see login/signup again
//   if (token && (pathname === "/login" || pathname === "/signup")) {
//     return NextResponse.redirect(new URL("/dashboard", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/login", "/signup"],
// };















// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function middleware(req: NextRequest) {
//   const token = await getToken({ req });
//   const { pathname } = req.nextUrl;

//   // 🔒 Dashboard protection
//   if (pathname.startsWith("/dashboard")) {
//     if (!token) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   }

//   // 🔐 Admin protection
//   if (pathname.startsWith("/admin")) {
//     if (!token || token.role !== "admin") {
//       return NextResponse.redirect(new URL("/dashboard", req.url));
//     }
//   }

//   // 🔁 Logged-in user shouldn't access auth pages
//   if (token && (pathname === "/login" || pathname === "/signup")) {
//     return NextResponse.redirect(new URL("/dashboard", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/signup"],
// };















// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function middleware(req: NextRequest) {
//   const token = await getToken({ req });
//   const { pathname } = req.nextUrl;

//   if (!token && pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   if (!token && pathname.startsWith("/admin")) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   if (token && pathname.startsWith("/admin")) {
//     if (token.role !== "admin") {
//       return NextResponse.redirect(new URL("/dashboard", req.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   //matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/signup"],
//   matcher: ["/dashboard/:path*", "/admin/:path*"],
// };




// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function middleware(req: NextRequest) {
//   const token = await getToken({ req });
//   const { pathname } = req.nextUrl;

//   if (!token && pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   if (token && pathname.startsWith("/admin") && token.role !== "admin") {
//     return NextResponse.redirect(new URL("/dashboard", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/admin/:path*"],
// };



import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // 🔐 NOT LOGGED IN
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🚫 HARD BLOCK (AUTO LOGOUT)
  if (token?.isBlocked) {
    return NextResponse.redirect(
      new URL("/login?error=blocked", req.url)
    );
  }

  // 🔐 ADMIN GUARD
  if (pathname.startsWith("/admin")) {
    if (!token || token.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
