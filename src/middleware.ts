import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware() {
  const response = NextResponse.next();
  response.cookies.set("nama", "habsyi", {
    maxAge: 10,
    httpOnly: true,
  });
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};
