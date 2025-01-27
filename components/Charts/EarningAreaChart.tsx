"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  NGN: {
    label: "Naira",
    color: "hsl(var(--chart-1))",
  },
  USD: {
    label: "Dollar",
    color: "hsl(var(--chart-2))",
  },
  GBP: {
    label: "Pounds",
    color: "hsl(var(--chart-2))",
  },
  EUR: {
    label: "Euro",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function EarningAreaChart({ earnings }: any) {
  const chartData = earnings?.earningsStatistics;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Earnings</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[60vh]">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -20,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 8)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="NGN"
              type="natural"
              fill="#054753"
              fillOpacity={0.4}
              stroke="#054753"
              stackId="a"
            />
            <Area
              dataKey="USD"
              type="natural"
              fill="#9ef769"
              fillOpacity={0.4}
              stroke="#9ef769"
              stackId="a"
            />
            <Area
              dataKey="GBP"
              type="natural"
              fill="#ff9933"
              fillOpacity={0.4}
              stroke="#ff9933"
              stackId="a"
            />
            <Area
              dataKey="EUR"
              type="natural"
              fill="#fee300"
              fillOpacity={0.4}
              stroke="#fee300"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
