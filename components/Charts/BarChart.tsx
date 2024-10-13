"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple bar chart";

const chartData = [
  { month: "January", spent: 186, earned: 80 },
  { month: "February", spent: 305, earned: 200 },
  { month: "March", spent: 237, earned: 120 },
  { month: "April", spent: 73, earned: 190 },
  { month: "May", spent: 209, earned: 130 },
  { month: "June", spent: 214, earned: 140 },
  { month: "July", spent: 204, earned: 120 },
  { month: "August", spent: 224, earned: 140 },
  { month: "September", spent: 304, earned: 240 },
  { month: "October", spent: 200, earned: 400 },
  { month: "November", spent: 100, earned: 400 },
  { month: "December", spent: 200, earned: 300 },
];

const chartConfig = {
  spent: {
    label: "Amount spent",
    color: "#FF5D7A",
  },
  earned: {
    label: "Amount earned",
    color: "#25C269",
  },
} satisfies ChartConfig;

export function BarCharts() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="sm:text-2xl text-lg">
          Earnings Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[50vh]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="spent" fill="#FF5D7A" radius={4} />
            <Bar dataKey="earned" fill="#25C269" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
