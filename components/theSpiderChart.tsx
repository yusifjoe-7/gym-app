"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import type { targetMuscle } from "@/type/types"

const chartConfig = {
  count: {
    label: "Count",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export type chartType = {
  muscle: targetMuscle
  count: number
}


export function ChartRadarDots({ chart }: { chart: chartType[] }) {
console.log(chart)

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square sm:w-170 w-80 md:shadow-sm rounded-4xl ">
      <RadarChart data={chart}
      outerRadius={"62%"}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey="muscle" />
        <PolarGrid />
        <Radar
          dataKey="count"
          fill="var(--color-count)"
          fillOpacity={0.6}
          dot={{ r: 4, fillOpacity: 1 }}
        />
      </RadarChart>
    </ChartContainer>
  )
}
