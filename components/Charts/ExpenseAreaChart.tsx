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
  NGN_expenses: {
    label: "Naira",
    color: "hsl(var(--chart-1))",
  },
  USD_expenses: {
    label: "Dollar",
    color: "hsl(var(--chart-2))",
  },
  GBP_expenses: {
    label: "Pounds",
    color: "hsl(var(--chart-2))",
  },
  EUR_expenses: {
    label: "Euro",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ExpenseAreaChart({ earnings }: any) {
  const chartData = earnings?.earningsStatistics;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses</CardTitle>
        {/* <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription> */}
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
              dataKey="NGN_expenses"
              type="natural"
              fill="#054753"
              fillOpacity={0.4}
              stroke="#054753"
              stackId="a"
            />
            <Area
              dataKey="USD_expenses"
              type="natural"
              fill="#9ef769"
              fillOpacity={0.4}
              stroke="#9ef769"
              stackId="a"
            />
            <Area
              dataKey="EUR_expenses"
              type="natural"
              fill="#FF5D7A"
              fillOpacity={0.4}
              stroke="#FF5D7A"
              stackId="a"
            />
            <Area
              dataKey="GBP_expenses"
              type="natural"
              fill="#ff9933"
              fillOpacity={0.4}
              stroke="#ff9933"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  );
}
