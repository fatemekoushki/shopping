import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("tokenLogin");
    if (pathname.startsWith("/cart")) {
        if (!token?.value) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
    }
    if(token?.value){
        if(pathname.startsWith("/auth/login")){
            return NextResponse.redirect(new URL("/", request.url));
        }
    }
}

export const config = {
    matcher: ["/cart" , "/auth/login"],
};
