"use client";

import { GitCommitVertical } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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
    <>
      {/* <Card>
        <CardHeader>
          <CardTitle>Expenses</CardTitle>
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
      </Card> */}
      <Card>
        <CardHeader>
          <CardTitle>Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="w-full h-[60vh]">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
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
              <Line
                dataKey="NGN_expenses"
                type="natural"
                stroke="#054753"
                strokeWidth={2}
                dot={({ cx, cy, payload }) => {
                  const r = 24;
                  return (
                    <GitCommitVertical
                      key={payload.period}
                      x={cx - r / 2}
                      y={cy - r / 2}
                      width={r}
                      height={r}
                      fill="#054753"
                      stroke="#054753"
                    />
                  );
                }}
              />
              <Line
                dataKey="USD_expenses"
                type="natural"
                stroke="#9ef769"
                strokeWidth={2}
                dot={({ cx, cy, payload }) => {
                  const r = 24;
                  return (
                    <GitCommitVertical
                      key={payload.period}
                      x={cx - r / 2}
                      y={cy - r / 2}
                      width={r}
                      height={r}
                      fill="#9ef769"
                      stroke="#9ef769"
                    />
                  );
                }}
              />
              <Line
                dataKey="GBP_expenses"
                type="natural"
                stroke="#ff9933"
                strokeWidth={2}
                dot={({ cx, cy, payload }) => {
                  const r = 24;
                  return (
                    <GitCommitVertical
                      key={payload.period}
                      x={cx - r / 2}
                      y={cy - r / 2}
                      width={r}
                      height={r}
                      fill="#ff9933"
                      stroke="#ff9933"
                    />
                  );
                }}
              />
              <Line
                dataKey="EUR_expenses"
                type="natural"
                stroke="#fee300"
                strokeWidth={2}
                dot={({ cx, cy, payload }) => {
                  const r = 24;
                  return (
                    <GitCommitVertical
                      key={payload.period}
                      x={cx - r / 2}
                      y={cy - r / 2}
                      width={r}
                      height={r}
                      fill="#fee300"
                      stroke="#fee300"
                    />
                  );
                }}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
