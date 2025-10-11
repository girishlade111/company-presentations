"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"

interface FinancialChartsProps {
  data: {
    revenue: number
    profit: number
    target: number
    revenueTrend: Array<{
      month: string
      actual: number
      planned: number
      target: number
    }>
    profitTrend: Array<{
      month: string
      actual: number
      planned: number
      target: number
    }>
  }
  title?: string
}

export function FinancialCharts({ data, title = "" }: FinancialChartsProps) {
  // Calculate percentages for target achievement
  const revenuePercentage = Math.round((data.revenue / data.target) * 100)
  const profitPercentage = Math.round((data.profit / (data.target * 0.3)) * 100) // Assuming 30% profit margin target

  // Prepare data for the comparison chart
  const comparisonData = [
    {
      name: "Revenue",
      actual: data.revenue,
      target: data.target,
    },
    {
      name: "Profit",
      actual: data.profit,
      target: data.target * 0.3, // Assuming 30% profit margin target
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Turnover vs Target</CardTitle>
            <CardDescription>
              €{data.revenue.toLocaleString()} of €{data.target.toLocaleString()} ({revenuePercentage}%)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                actual: {
                  label: "Actual",
                  color: "hsl(var(--chart-1))",
                },
                target: {
                  label: "Target",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{ name: "Revenue", actual: data.revenue, target: data.target }]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="actual" fill="var(--color-actual)" name="Actual" />
                  <Bar dataKey="target" fill="var(--color-target)" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Profit vs Target</CardTitle>
            <CardDescription>
              €{data.profit.toLocaleString()} of €{Math.round(data.target * 0.3).toLocaleString()} ({profitPercentage}%)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                actual: {
                  label: "Actual",
                  color: "hsl(var(--chart-1))",
                },
                target: {
                  label: "Target",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{ name: "Profit", actual: data.profit, target: data.target * 0.3 }]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="actual" fill="var(--color-actual)" name="Actual" />
                  <Bar dataKey="target" fill="var(--color-target)" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Financial Overview</CardTitle>
            <CardDescription>Comparison of key metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                actual: {
                  label: "Actual",
                  color: "hsl(var(--chart-1))",
                },
                target: {
                  label: "Target",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <ChartTooltip content={<ChartTooltipContent />} formatter={(value) => `€${value.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="actual" fill="var(--color-actual)" name="Actual" />
                  <Bar dataKey="target" fill="var(--color-target)" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Turnover Trend</CardTitle>
            <CardDescription>Monthly revenue performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                actual: {
                  label: "Actual Revenue",
                  color: "hsl(var(--chart-1))",
                },
                planned: {
                  label: "Planned Revenue",
                  color: "hsl(var(--chart-2))",
                },
                target: {
                  label: "Target Revenue",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.revenueTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} formatter={(value) => `€${value.toLocaleString()}`} />
                  <Legend />
                  <Line type="monotone" dataKey="actual" stroke="var(--color-actual)" name="Actual" />
                  <Line type="monotone" dataKey="planned" stroke="var(--color-planned)" name="Planned" />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="var(--color-target)"
                    name="Target"
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profit Trend</CardTitle>
            <CardDescription>Monthly profit performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                actual: {
                  label: "Actual Profit",
                  color: "hsl(var(--chart-1))",
                },
                planned: {
                  label: "Planned Profit",
                  color: "hsl(var(--chart-2))",
                },
                target: {
                  label: "Target Profit",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.profitTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} formatter={(value) => `€${value.toLocaleString()}`} />
                  <Legend />
                  <Line type="monotone" dataKey="actual" stroke="var(--color-actual)" name="Actual" />
                  <Line type="monotone" dataKey="planned" stroke="var(--color-planned)" name="Planned" />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="var(--color-target)"
                    name="Target"
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
