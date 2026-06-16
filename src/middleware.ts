import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Password-gates the customer dashboard ONLY. Scoped by `config.matcher` so the
// public marketing site (home, blog, product, etc.) is never touched.
export const config = { matcher: ["/dashboard", "/dashboard/:path*"] };

export function middleware(req: NextRequest) {
  const expectedUser = process.env.DASHBOARD_USER ?? "ecotrace";
  const expectedPass = process.env.DASHBOARD_PASSWORD;

  // No password configured → deny rather than expose the dashboard.
  if (!expectedPass) {
    return new NextResponse("Dashboard access is not configured.", { status: 503 });
  }

  const header = req.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    try {
      const [user, pass] = atob(header.slice(6)).split(":");
      if (user === expectedUser && pass === expectedPass) {
        return NextResponse.next();
      }
    } catch {
      // malformed header → fall through to 401
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="EcoTrace dashboard", charset="UTF-8"' },
  });
}
