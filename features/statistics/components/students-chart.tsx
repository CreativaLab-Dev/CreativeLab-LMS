"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import qs from "query-string"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ChartRevenueData } from "../actions/get-statistics-payments"
import { ChartStudentData } from "../actions/get-statistics-students"

const years = [
  "2024",
  "2025",
  "2026",
]

const chartConfig = {
  totalNewStudents: {
    label: "Nuevos",
    color: "#2ecc71",
  },
  totalActiveStudents: {
    label: "Con membresía activa",
    color: "#3498db",
  },
} satisfies ChartConfig

interface StudentChartProps {
  chartStudentData: ChartStudentData[];
  currentYear: number
}

const StudentChart = ({
  chartStudentData,
  currentYear
}: StudentChartProps) => {
  const [year, setYear] = useState(currentYear.toString())
  const router = useRouter()
  const urlPath = '/teacher/statistics'

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: urlPath,
      query: {
        year,
      }
    }, { skipEmptyString: true, skipNull: true })
    router.push(url)
  }, [year, router])

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>
            Pagos
          </CardTitle>
          <CardDescription>
            Se muestra los pagos por mes
          </CardDescription>
        </div>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Selecciona el año"
          >
            <SelectValue placeholder="2020" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {years.map((year) => (
              <SelectItem
                key={year}
                value={year}
                className="rounded-lg"
              >
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart accessibilityLayer data={chartStudentData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="totalNewStudents" fill="var(--color-totalNewStudents)" radius={2} />
            <Bar dataKey="totalActiveStudents" fill="var(--color-totalActiveStudents)" radius={2} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
export default StudentChart;