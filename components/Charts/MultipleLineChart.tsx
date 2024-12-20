"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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

interface MultipleLineChartProps {
  chartData: any;
}

export const description = "A multiple line chart";

const chartConfig = {
  totalJobs: {
    label: "New",
    color: "#054753",
  },
  totalActiveJobs: {
    label: "Active",
    color: "#6667FF",
  },
  totalOverdueJobs: {
    label: "Overdue",
    color: "#FF5D7A",
  },
  totalPausedJobs: {
    label: "Paused",
    color: "#FF9933",
  },
  totalCompletedJobs: {
    label: "Completed",
    color: "#25C269",
  },
} satisfies ChartConfig;

export function MultipleLineChart({ chartData }: MultipleLineChartProps) {
  return (
    <>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="sm:text-2xl text-lg">Jobs Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="w-full h-[50vh]">
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
                tickFormatter={(value) => value.slice(0, 6)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="totalJobs"
                type="monotone"
                stroke="#054753"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="totalActiveJobs"
                type="monotone"
                stroke="#6667FF"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="totalOverdueJobs"
                type="monotone"
                stroke="#FF5D7A"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="totalPausedJobs"
                type="monotone"
                stroke="#FF9933"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="totalCompletedJobs"
                type="monotone"
                stroke="#25C269"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
