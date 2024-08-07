import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: ["/", "/api/uploadthing"], // Add the root route to publicRoutes
  ignoredRoutes: ["/((?!api|trpc))(_next|.+\\..+)(.*)", "/"], // Add necessary ignored routes

  // Custom afterAuth function
  afterAuth: (auth, req) => {
    if (!auth.userId) {
      // Custom behavior for unauthenticated users
      if (req.nextUrl.pathname === "/") {
        // Allow access to the root route
        return NextResponse.next();
      }
      // Redirect to login page for other routes
      return NextResponse.redirect("/login");
    }
    // Allow access for authenticated users
    return NextResponse.next();
  },

  debug: true, // Enable debug mode for development
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
