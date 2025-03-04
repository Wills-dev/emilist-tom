"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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

interface BarChartsProps {
  chartData: any;
  title: string;
  chartConfig: any;
  dataKey: string;
}

export const description = "A multiple bar chart";

export function BarCharts({
  chartData,
  title,
  chartConfig,
  dataKey,
}: BarChartsProps) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="sm:text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer
          config={chartConfig}
          className="w-[340px] max-w-[340px] min-w-[340px] p-4"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="period"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey={dataKey} fill="#25C269" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
