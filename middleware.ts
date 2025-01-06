import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { authOptions } from "./auth.config"

export default withAuth(
  function middleware(req) {
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin")
    const token = req.nextauth.token

    if (isAdminRoute && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", req.url))
    }
    
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ["/admin/:path*"]
}

