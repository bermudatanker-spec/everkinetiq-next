"use client";

import * as React from "react";
import type {
  TooltipProps,
  LegendProps,
  ResponsiveContainerProps,
} from "recharts";
import { ResponsiveContainer, Tooltip, Legend } from "recharts";

import { cn } from "@/lib/utils";

/**
 * Shadcn-style Chart wrapper (TS safe)
 * - No wildcard "RechartsPrimitive" import (that causes TS grief in some setups)
 * - Works with Recharts v2.x
 */

type ChartConfigItem = {
  label?: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
} & (
  | { color: string; theme?: never }
  | { color?: never; theme: Record<"light" | "dark", string> }
);

export type ChartConfig = Record<string, ChartConfigItem>;

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const ctx = React.useContext(ChartContext);
  if (!ctx) throw new Error("useChart must be used within <ChartContainer />");
  return ctx;
}

function resolveColor(item?: ChartConfigItem) {
  if (!item) return undefined;
  if ("color" in item && item.color) return item.color;
  if ("theme" in item && item.theme) {
    // Prefer CSS vars for theme colors; you can map these in globals if you want
    // Here we just pick light by default; most charts are on dark backgrounds anyway.
    return item.theme.dark ?? item.theme.light;
  }
  return undefined;
}

export function ChartContainer({
  config,
  className,
  children,
  ...props
}: React.PropsWithChildren<
  { config: ChartConfig } & ResponsiveContainerProps & { className?: string }
>) {
  return (
    <ChartContext.Provider value={{ config }}>
      <div className={cn("w-full", className)}>
        <ResponsiveContainer {...props}>{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

export function ChartTooltip({
  className,
  ...props
}: TooltipProps<number, string> & { className?: string }) {
  return (
    <Tooltip
      {...props}
      contentStyle={{
        borderRadius: 12,
        border: "1px solid hsl(var(--border))",
        background: "hsl(var(--card))",
        color: "hsl(var(--foreground))",
      }}
      wrapperStyle={{ outline: "none" }}
      cursor={{ fill: "hsl(var(--muted) / 0.35)" } as any}
      labelStyle={{ color: "hsl(var(--muted-foreground))" }}
      itemStyle={{ color: "hsl(var(--foreground))" }}
      // className isn't supported by Tooltip; we keep it for API parity
    />
  );
}

export function ChartLegend({
  className,
  ...props
}: LegendProps & { className?: string }) {
  return (
    <Legend
      {...props}
      wrapperStyle={{
        color: "hsl(var(--muted-foreground))",
        fontSize: 12,
      }}
    />
  );
}

export function ChartStyle({ id }: { id: string }) {
  const { config } = useChart();

  const css = Object.entries(config)
    .map(([key, item]) => {
      const color = resolveColor(item);
      if (!color) return "";
      return `
        [data-chart="${id}"] [data-series="${key}"] {
          --chart-color: ${color};
        }
      `;
    })
    .join("\n");

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

/**
 * Helper to read series meta from config inside custom tooltip/legend
 */
export function getChartItem(config: ChartConfig, key?: string) {
  if (!key) return undefined;
  return config[key];
}
