"use client";
import { Area, AreaChart, ResponsiveContainer, XAxis } from "recharts";
import type { MonthlyPoint } from "@/lib/dashboard";

export function Co2eTrendChart({ data }: { data: MonthlyPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={120}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
        <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} />
        <Area type="monotone" dataKey="co2eT" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.12} strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
