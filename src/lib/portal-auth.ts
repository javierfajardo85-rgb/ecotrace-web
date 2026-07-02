import { redirect } from "next/navigation";
import { auth } from "./auth";

/** Page guard: redirect unauthenticated visitors to /portal/login. Returns the client name. */
export async function requireClientSession(): Promise<string> {
  const session = await auth();
  const clientName = (session?.user as any)?.clientName as string | undefined;
  if (!clientName) redirect("/portal/login");
  return clientName;
}
