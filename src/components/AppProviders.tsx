"use client";

import * as React from "react";

import { ContactModalProvider } from "@/components/contact/ContactModalProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <ContactModalProvider>{children}</ContactModalProvider>;
}
