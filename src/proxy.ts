import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "minto_session";
const ROLE_COOKIE = "minto_role";

const customerRoutes = ["/account", "/cart", "/orders"];
const partnerRoutes = ["/partner"];
const adminRoutes = ["/admin"];
const deliveryRoutes = ["/delivery"];

function matches(pathname: string, routes: string[]) {
  return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get(SESSION_COOKIE)?.value;
  const role = request.cookies.get(ROLE_COOKIE)?.value?.toLowerCase();

  if ((matches(pathname, customerRoutes) || matches(pathname, partnerRoutes) || matches(pathname, adminRoutes) || matches(pathname, deliveryRoutes)) && !session) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  if (matches(pathname, partnerRoutes) && role !== "shop_partner" && role !== "partner") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (matches(pathname, adminRoutes) && role !== "admin" && role !== "super_admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (matches(pathname, deliveryRoutes) && !session) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }
  if (matches(pathname, deliveryRoutes) && role !== "delivery_partner") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if ((pathname === "/login" || pathname === "/register") && session) {
    if (role === "admin" || role === "super_admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    if (role === "shop_partner" || role === "partner") {
      return NextResponse.redirect(new URL("/partner", request.url));
    }
    if (role === "delivery_partner") {
      return NextResponse.redirect(new URL("/delivery", request.url));
    }
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/cart/:path*", "/orders/:path*", "/partner/:path*", "/delivery/:path*", "/admin/:path*", "/login", "/register"],
};
