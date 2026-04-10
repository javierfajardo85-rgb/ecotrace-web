"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { useContactModal } from "@/components/contact/ContactModalProvider";
import { useSwallowHeaderMotion } from "@/hooks/useSwallowHeaderMotion";
import { BrandWordmark } from "@/components/BrandWordmark";
import Image from "next/image";

const navItems = [
  { label: "Solutions", href: "#motores" },
  { label: "Technology", href: "#tecnologia" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "About us", href: "#about" },
  { label: "Contact", href: "#contacto" },
] as const;

export function HeaderNav() {
  const [open, setOpen] = React.useState(false);
  const { openContactModal } = useContactModal();
  const pathname = usePathname();
  const { yPx, opacity, hidden } = useSwallowHeaderMotion();
  const isOurMarkets = pathname === "/nuestros-mercados";
  const isHome = pathname === "/";

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[100]",
        isOurMarkets && "bg-white/92 backdrop-blur supports-[backdrop-filter]:bg-white/75",
        hidden && "pointer-events-none",
      )}
      style={{
        transform: `translate3d(0, ${yPx}px, 0)`,
        opacity,
      }}
    >
      <div className="flex h-[85px] w-full items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="group inline-flex max-w-[72vw] items-center gap-2 text-sm font-medium tracking-tight text-foreground sm:max-w-none"
        >
          <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full border border-foreground/20 bg-white/50 backdrop-blur">
            <Image
              src="/images/ecotrace-symbol.png"
              alt=""
              width={18}
              height={18}
              className="h-[18px] w-[18px]"
              priority
            />
          </span>
          <span className="min-w-0 leading-none">
            <span className="opacity-95">
              <BrandWordmark />
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-12 md:flex lg:gap-14">
          {navItems.map((item) =>
            item.label === "Contact" ? (
              <button
                key={item.label}
                type="button"
                onClick={() => openContactModal("general")}
                className="text-[10px] font-medium uppercase tracking-[0.14em] text-foreground/70 transition-colors hover:text-foreground/90"
              >
                <span className="relative">
                  {item.label}
                </span>
              </button>
            ) : (
              <a
                key={item.href}
                href={isHome ? item.href : `/${item.href}`}
                className="text-[10px] font-medium uppercase tracking-[0.14em] text-foreground/70 transition-colors hover:text-foreground/90"
              >
                <span className="relative">
                  {item.label}
                </span>
              </a>
            ),
          )}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-foreground/20 bg-white/50 px-3 py-2 text-xs font-medium uppercase tracking-[0.14em] text-foreground/80 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/70 hover:text-foreground hover:shadow-md md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="mx-4 rounded-2xl border border-foreground/10 bg-white/85 p-3 backdrop-blur sm:mx-6">
          <div className="flex flex-col gap-1">
            {navItems.map((item) =>
              item.label === "Contact" ? (
                <button
                  key={item.label}
                  type="button"
                  className="w-full rounded-xl px-3 py-3 text-left text-sm font-medium uppercase tracking-[0.14em] text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground/90"
                  onClick={() => {
                    setOpen(false);
                    openContactModal("general");
                  }}
                >
                  {item.label}
                </button>
              ) : (
                <a
                  key={item.href}
                  href={isHome ? item.href : `/${item.href}`}
                  className="rounded-xl px-3 py-3 text-left text-sm font-medium uppercase tracking-[0.14em] text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground/90"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

