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
  totalProjects: {
    label: "New",
    color: "#054753",
  },
  totalActiveProjects: {
    label: "Active",
    color: "#6667FF",
  },
  totalOverdueProjects: {
    label: "Overdue",
    color: "#FF5D7A",
  },
  totalPausedProjects: {
    label: "Paused",
    color: "#FF9933",
  },
  totalCompletedProjects: {
    label: "Completed",
    color: "#25C269",
  },
} satisfies ChartConfig;

export const ProjectMultipleLineChart = ({
  chartData,
}: MultipleLineChartProps) => {
  return (
    <>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="sm:text-2xl text-lg">
            Project Statistics
          </CardTitle>
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
                dataKey="totalProjects"
                type="monotone"
                stroke="#054753"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="totalActiveProjects"
                type="monotone"
                stroke="#6667FF"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="totalOverdueProjects"
                type="monotone"
                stroke="#FF5D7A"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="totalPausedProjects"
                type="monotone"
                stroke="#FF9933"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="totalCompletedProjects"
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
};
