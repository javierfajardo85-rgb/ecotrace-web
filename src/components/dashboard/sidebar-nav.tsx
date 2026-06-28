"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BadgeCheck, LineChart, Truck, FileText, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/compliance", label: "Compliance", icon: BadgeCheck },
  { href: "/dashboard/operations", label: "Operations", icon: LineChart },
  { href: "/dashboard/certificates", label: "Certificates", icon: ShieldCheck },
  { href: "/dashboard/fleet", label: "Fleet & routes", icon: Truck },
  { href: "/dashboard/reports", label: "Reports", icon: FileText },
];

export function SidebarNav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1 p-2 text-sm">
      {items.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted",
              active && "bg-accent/10 font-medium text-foreground border-l-2 border-accent",
            )}
          >
            <Icon className="size-4" aria-hidden /> {label}
          </Link>
        );
      })}
    </nav>
  );
}
