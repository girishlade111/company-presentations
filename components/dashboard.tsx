"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

import type React from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  LineChart,
  PieChart,
  Bar,
  Line,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Building2, BarChart3, Users, Wrench, Paintbrush, Home, RefreshCw, Clock } from "lucide-react"
import { DataTable } from "@/components/data-table"
import { columns as futureClientsColumns } from "@/components/columns/future-clients-columns"
import { columns as consideringClientsColumns } from "@/components/columns/considering-clients-columns"
import { columns as projectsColumns } from "@/components/columns/projects-columns"
import {
  fetchKpiData,
  fetchProjectsData,
  fetchFinancialData,
  fetchClientsData,
  fetchTimeManagementData,
} from "@/lib/data"

// Import the FinancialCharts component
import { FinancialCharts } from "@/components/financial-charts"
// Import the FinancialSummaryCard component
import { FinancialSummaryCard } from "@/components/financial-summary-card"
// Import date components
import { DateRangePicker } from "@/components/date-range-picker"
import { DatePicker } from "@/components/date-picker"
import { EditableDate } from "@/components/editable-date"
import { EditableProjectDate } from "@/components/editable-project-date"
import { useDateContext } from "@/context/date-context"

// Import editable components
import { EditableKpiCard } from "@/components/editable-kpi-card"
import { EditableText } from "@/components/editable-text"
import { EditableProgress } from "@/components/editable-progress"
import { EditableList } from "@/components/editable-list"
import { EditableChartData } from "@/components/editable-chart-data"

import { Edit2, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Dashboard() {
  const { dateRange, isLoading: dateLoading } = useDateContext()
  const [activeTab, setActiveTab] = useState("overview")
  const [kpiData, setKpiData] = useState<any>(null)
  const [projectsData, setProjectsData] = useState<any>(null)
  const [financialData, setFinancialData] = useState<any>(null)
  const [clientsData, setClientsData] = useState<any>(null)
  const [timeData, setTimeData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  // Simulate real-time data fetching
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const kpi = await fetchKpiData(dateRange)
        const projects = await fetchProjectsData(dateRange)
        const financial = await fetchFinancialData(dateRange)
        const clients = await fetchClientsData(dateRange)
        const time = await fetchTimeManagementData(dateRange)

        setKpiData(kpi)
        setProjectsData(projects)
        setFinancialData(financial)
        setClientsData(clients)
        setTimeData(time)
        setLastUpdated(new Date())
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Set up interval for real-time updates
    const intervalId = setInterval(fetchData, 60000) // Update every minute

    return () => clearInterval(intervalId)
  }, [dateRange])

  const handleRefresh = async () => {
    try {
      const kpi = await fetchKpiData(dateRange)
      const projects = await fetchProjectsData(dateRange)
      const financial = await fetchFinancialData(dateRange)
      const clients = await fetchClientsData(dateRange)
      const time = await fetchTimeManagementData(dateRange)

      setKpiData(kpi)
      setProjectsData(projects)
      setFinancialData(financial)
      setClientsData(clients)
      setTimeData(time)
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Error refreshing data:", error)
    }
  }

  // Add these state update functions after the handleRefresh function

  // KPI data updates
  const updateKpiData = (division: string, field: string, value: any) => {
    setKpiData((prev) => ({
      ...prev,
      [division]: {
        ...prev[division],
        [field]: value,
      },
    }))
  }

  // Financial data updates
  const updateFinancialData = (division: string, field: string, value: any) => {
    setFinancialData((prev) => ({
      ...prev,
      [division]: {
        ...prev[division],
        [field]: value,
      },
    }))
  }

  // Update financial chart data
  const updateChartData = (division: string, chartType: string, data: any[]) => {
    setFinancialData((prev) => ({
      ...prev,
      [division]: {
        ...prev[division],
        [chartType]: data,
      },
    }))
  }

  // Update time management data
  const updateTimeData = (division: string, field: string, value: any) => {
    setTimeData((prev) => ({
      ...prev,
      [division]: {
        ...prev[division],
        [field]: value,
      },
    }))
  }

  // Update client data
  const updateClientData = (field: string, value: any) => {
    setClientsData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle project date changes
  const handleProjectDateChange = (projectId: string, field: "startDate" | "endDate", newDate: string) => {
    setProjectsData((prevData) => {
      const updatedProjects = prevData.projects.map((project: any) => {
        if (project.id === projectId) {
          return { ...project, [field]: newDate }
        }
        return project
      })

      const updatedVibrixProjects = prevData.vibrixProjects.map((project: any) => {
        if (project.id === projectId) {
          return { ...project, [field]: newDate }
        }
        return project
      })

      return {
        ...prevData,
        projects: updatedProjects,
        vibrixProjects: updatedVibrixProjects,
      }
    })
  }

  // Handle VIPRO project target date changes
  const handleViproTargetDateChange = (projectId: string, newDate: string) => {
    setProjectsData((prevData) => {
      const updatedViproProjects = prevData.viproProjects.map((project: any) => {
        if (project.id === projectId) {
          return { ...project, targetEndDate: newDate }
        }
        return project
      })

      return {
        ...prevData,
        viproProjects: updatedViproProjects,
      }
    })
  }

  if (loading || dateLoading || !kpiData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin">
            <RefreshCw className="h-8 w-8 text-primary" />
          </div>
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Company Dashboard</h1>
          <p className="text-muted-foreground">
            <Clock className="inline mr-1 h-4 w-4" />
            Last updated: {lastUpdated.toLocaleTimeString()} - {lastUpdated.toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 items-end md:items-center">
          <DateRangePicker />
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-6 mb-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="vibrix" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">VIBRIX</span>
          </TabsTrigger>
          <TabsTrigger value="vipro" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">VIPRO</span>
          </TabsTrigger>
          <TabsTrigger value="vifix" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            <span className="hidden sm:inline">VIFIX</span>
          </TabsTrigger>
          <TabsTrigger value="videsign" className="flex items-center gap-2">
            <Paintbrush className="h-4 w-4" />
            <span className="hidden sm:inline">VIDESIGN</span>
          </TabsTrigger>
          <TabsTrigger value="crm" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">CRM</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <EditableKpiCard
              title="Total Projects"
              value={projectsData.totalProjects}
              description="Active projects across all divisions"
              icon={<Home className="h-4 w-4" />}
              change={projectsData.projectsChange}
              onTitleChange={(newTitle) => console.log(`Updated title: ${newTitle}`)}
              onValueChange={(newValue) => {
                setProjectsData((prev) => ({
                  ...prev,
                  totalProjects: typeof newValue === "number" ? newValue : Number.parseInt(newValue as string),
                }))
              }}
              onDescriptionChange={(newDesc) => console.log(`Updated description: ${newDesc}`)}
              onChangeValueChange={(newChange) => {
                setProjectsData((prev) => ({
                  ...prev,
                  projectsChange: newChange,
                }))
              }}
              numeric={true}
            />
            <EditableKpiCard
              title="Total Revenue"
              value={financialData.totalRevenue}
              description="Current revenue across all divisions"
              icon={<BarChart3 className="h-4 w-4" />}
              change={financialData.revenueChange}
              onTitleChange={(newTitle) => console.log(`Updated title: ${newTitle}`)}
              onValueChange={(newValue) => {
                setFinancialData((prev) => ({
                  ...prev,
                  totalRevenue: typeof newValue === "number" ? newValue : Number.parseInt(newValue as string),
                }))
              }}
              onDescriptionChange={(newDesc) => console.log(`Updated description: ${newDesc}`)}
              onChangeValueChange={(newChange) => {
                setFinancialData((prev) => ({
                  ...prev,
                  revenueChange: newChange,
                }))
              }}
              numeric={true}
              prefix="€"
              formatter={(val) => val.toLocaleString()}
            />
            <EditableKpiCard
              title="Total Clients"
              value={clientsData.totalClients}
              description="Active and considering clients"
              icon={<Users className="h-4 w-4" />}
              change={clientsData.clientsChange}
              onTitleChange={(newTitle) => console.log(`Updated title: ${newTitle}`)}
              onValueChange={(newValue) => {
                setClientsData((prev) => ({
                  ...prev,
                  totalClients: typeof newValue === "number" ? newValue : Number.parseInt(newValue as string),
                }))
              }}
              onDescriptionChange={(newDesc) => console.log(`Updated description: ${newDesc}`)}
              onChangeValueChange={(newChange) => {
                setClientsData((prev) => ({
                  ...prev,
                  clientsChange: newChange,
                }))
              }}
              numeric={true}
            />
            <EditableKpiCard
              title="Total Area"
              value={financialData.totalArea}
              description="Total project area in square meters"
              icon={<Building2 className="h-4 w-4" />}
              change={financialData.areaChange}
              onTitleChange={(newTitle) => console.log(`Updated title: ${newTitle}`)}
              onValueChange={(newValue) => {
                setFinancialData((prev) => ({
                  ...prev,
                  totalArea: typeof newValue === "number" ? newValue : Number.parseInt(newValue as string),
                }))
              }}
              onDescriptionChange={(newDesc) => console.log(`Updated description: ${newDesc}`)}
              onChangeValueChange={(newChange) => {
                setFinancialData((prev) => ({
                  ...prev,
                  areaChange: newChange,
                }))
              }}
              numeric={true}
              suffix=" m²"
              formatter={(val) => val.toLocaleString()}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-gold-500">Revenue Trend</CardTitle>
                  <CardDescription>Revenue across all divisions</CardDescription>
                </div>
                <EditableChartData
                  data={financialData.revenueTrend}
                  onDataChange={(newData) => {
                    setFinancialData((prev) => ({
                      ...prev,
                      revenueTrend: newData,
                    }))
                  }}
                  mainKey="month"
                  valueKeys={[
                    { key: "actual", label: "Actual Revenue" },
                    { key: "planned", label: "Planned Revenue" },
                    { key: "target", label: "Target Revenue" },
                  ]}
                  title="Edit Revenue Trend Data"
                />
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
                    <LineChart data={financialData.revenueTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
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
                <CardTitle>Time Management</CardTitle>
                <CardDescription>Time allocation across departments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <ChartContainer
                    config={{
                      admin: {
                        label: "Admin",
                        color: "hsl(var(--chart-1))",
                      },
                      core: {
                        label: "Core",
                        color: "hsl(var(--chart-2))",
                      },
                      dev: {
                        label: "Development",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                    className="h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={timeData.timeAllocation}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {timeData.timeAllocation.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Project Status Overview</CardTitle>
              <CardDescription>Current status of all active projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectsData.projects.slice(0, 5).map((project: any) => (
                  <div key={project.id} className="space-y-2">
                    <div className="flex justify-between">
                      <EditableText
                        text={project.name}
                        onTextChange={(newName) => {
                          setProjectsData((prev) => ({
                            ...prev,
                            projects: prev.projects.map((p: any) =>
                              p.id === project.id ? { ...p, name: newName } : p,
                            ),
                          }))
                        }}
                        className="font-medium"
                      />
                      <span className="text-sm text-muted-foreground">
                        {project.actual}% / {project.planned}%
                      </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <EditableProgress
                        value={project.actual}
                        plannedValue={project.planned}
                        onValueChange={(newValue) => {
                          setProjectsData((prev) => ({
                            ...prev,
                            projects: prev.projects.map((p: any) =>
                              p.id === project.id ? { ...p, actual: newValue } : p,
                            ),
                          }))
                        }}
                        onPlannedValueChange={(newValue) => {
                          setProjectsData((prev) => ({
                            ...prev,
                            projects: prev.projects.map((p: any) =>
                              p.id === project.id ? { ...p, planned: newValue } : p,
                            ),
                          }))
                        }}
                        showPercentage={false}
                      />
                      <span className="text-xs text-muted-foreground flex items-center">
                        <EditableDate
                          date={project.endDate}
                          onDateChange={(newDate) => handleProjectDateChange(project.id, "endDate", newDate)}
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
              <CardDescription>Performance across all divisions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">VIBRIX</span>
                      <span className="text-sm">
                        €{financialData.vibrix.revenue.toLocaleString()} / €
                        {financialData.vibrix.target.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${(financialData.vibrix.revenue / financialData.vibrix.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">VIPRO</span>
                      <span className="text-sm">
                        €{financialData.vipro.revenue.toLocaleString()} / €{financialData.vipro.target.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${(financialData.vipro.revenue / financialData.vipro.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">VIFIX</span>
                      <span className="text-sm">
                        €{financialData.vifix.revenue.toLocaleString()} / €{financialData.vifix.target.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${(financialData.vifix.revenue / financialData.vifix.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">VIDESIGN</span>
                      <span className="text-sm">
                        €{financialData.videsign.revenue.toLocaleString()} / €
                        {financialData.videsign.target.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${(financialData.videsign.revenue / financialData.videsign.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <ChartContainer
                  config={{
                    revenue: {
                      label: "Revenue",
                      color: "hsl(var(--chart-1))",
                    },
                    profit: {
                      label: "Profit",
                      color: "hsl(var(--chart-2))",
                    },
                    target: {
                      label: "Target",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        {
                          name: "VIBRIX",
                          revenue: financialData.vibrix.revenue,
                          profit: financialData.vibrix.profit,
                          target: financialData.vibrix.target,
                        },
                        {
                          name: "VIPRO",
                          revenue: financialData.vipro.revenue,
                          profit: financialData.vipro.profit,
                          target: financialData.vipro.target,
                        },
                        {
                          name: "VIFIX",
                          revenue: financialData.vifix.revenue,
                          profit: financialData.vifix.profit,
                          target: financialData.vifix.target,
                        },
                        {
                          name: "VIDESIGN",
                          revenue: financialData.videsign.revenue,
                          profit: financialData.videsign.profit,
                          target: financialData.videsign.target,
                        },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        formatter={(value) => `€${value.toLocaleString()}`}
                      />
                      <Legend />
                      <Bar dataKey="revenue" fill="var(--color-revenue)" name="Revenue" />
                      <Bar dataKey="profit" fill="var(--color-profit)" name="Profit" />
                      <ReferenceLine y={550000} stroke="var(--color-target)" strokeDasharray="3 3" label="Avg Target" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vibrix" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Occupancy"
              value={`${kpiData.vibrix.occupancy}%`}
              description="Current occupancy percentage"
              icon={<Building2 className="h-4 w-4" />}
              change={5}
            />
            <KpiCard
              title="B2C Projects"
              value={kpiData.vibrix.b2cProjects}
              description="Current B2C projects"
              icon={<Users className="h-4 w-4" />}
              change={2}
            />
            <KpiCard
              title="B2B Projects"
              value={kpiData.vibrix.b2bProjects}
              description="Current B2B projects"
              icon={<Building2 className="h-4 w-4" />}
              change={-1}
            />
            <KpiCard
              title="Project Area"
              value={`${kpiData.vibrix.projectArea.toLocaleString()} m²`}
              description="Total project area"
              icon={<Home className="h-4 w-4" />}
              change={15}
            />
          </div>

          <FinancialSummaryCard
            title="VIBRIX"
            revenue={financialData.vibrix.revenue}
            profit={financialData.vibrix.profit}
            target={financialData.vibrix.target}
            revenueChange={8}
            profitChange={12}
          />

          <FinancialCharts data={financialData.vibrix} title="VIBRIX Financial Performance" />

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Current Projects</CardTitle>
                <CardDescription>Status of all active VIBRIX projects</CardDescription>
              </div>
              <DatePicker
                date={new Date()}
                onDateChange={(newDate) => {
                  console.log("Selected date:", newDate)
                  // Here you would update your state or trigger data fetching with the new date
                }}
                className="w-[180px]"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-4">
                {projectsData.vibrixProjects.slice(0, 3).map((project: any) => (
                  <div key={project.id} className="space-y-2">
                    <div className="flex justify-between">
                      <EditableText
                        text={project.name}
                        onTextChange={(newName) => {
                          setProjectsData((prev) => ({
                            ...prev,
                            vibrixProjects: prev.vibrixProjects.map((p: any) =>
                              p.id === project.id ? { ...p, name: newName } : p,
                            ),
                          }))
                        }}
                        className="font-medium"
                      />
                      <span className="text-sm text-muted-foreground">
                        {project.actual}% / {project.planned}%
                      </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <EditableProgress
                        value={project.actual}
                        plannedValue={project.planned}
                        onValueChange={(newValue) => {
                          setProjectsData((prev) => ({
                            ...prev,
                            vibrixProjects: prev.vibrixProjects.map((p: any) =>
                              p.id === project.id ? { ...p, actual: newValue } : p,
                            ),
                          }))
                        }}
                        onPlannedValueChange={(newValue) => {
                          setProjectsData((prev) => ({
                            ...prev,
                            vibrixProjects: prev.vibrixProjects.map((p: any) =>
                              p.id === project.id ? { ...p, planned: newValue } : p,
                            ),
                          }))
                        }}
                        showPercentage={false}
                      />
                      <div className="flex items-center gap-2 text-xs">
                        <div className="flex items-center bg-muted/30 px-2 py-1 rounded-md">
                          <span className="font-medium text-navy-600 mr-1">Start:</span>
                          <EditableDate
                            date={project.startDate}
                            onDateChange={(newDate) => handleProjectDateChange(project.id, "startDate", newDate)}
                            className="text-navy-600 font-medium"
                          />
                        </div>
                        <div className="flex items-center bg-muted/30 px-2 py-1 rounded-md">
                          <span className="font-medium text-navy-600 mr-1">End:</span>
                          <EditableDate
                            date={project.endDate}
                            onDateChange={(newDate) => handleProjectDateChange(project.id, "endDate", newDate)}
                            className="text-navy-600 font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <DataTable columns={projectsColumns} data={projectsData.vibrixProjects} />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Time Management</CardTitle>
                <CardDescription>VIBRIX time allocation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Admin</span>
                      <span>{timeData.vibrix.admin}%</span>
                    </div>
                    <EditableProgress
                      value={timeData.vibrix.admin}
                      onValueChange={(newValue) => {
                        setTimeData((prev) => ({
                          ...prev,
                          vibrix: {
                            ...prev.vibrix,
                            admin: newValue,
                          },
                        }))
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Core</span>
                      <span>{timeData.vibrix.core}%</span>
                    </div>
                    <EditableProgress
                      value={timeData.vibrix.core}
                      onValueChange={(newValue) => {
                        setTimeData((prev) => ({
                          ...prev,
                          vibrix: {
                            ...prev.vibrix,
                            core: newValue,
                          },
                        }))
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Development</span>
                      <span>{timeData.vibrix.dev}%</span>
                    </div>
                    <EditableProgress
                      value={timeData.vibrix.dev}
                      onValueChange={(newValue) => {
                        setTimeData((prev) => ({
                          ...prev,
                          vibrix: {
                            ...prev.vibrix,
                            dev: newValue,
                          },
                        }))
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-gold-500">Main Focus</CardTitle>
                <CardDescription>Current week priorities</CardDescription>
              </CardHeader>
              <CardContent>
                <EditableList
                  items={kpiData.vibrix.mainFocus}
                  onItemsChange={(newItems) => {
                    setKpiData((prev) => ({
                      ...prev,
                      vibrix: {
                        ...prev.vibrix,
                        mainFocus: newItems,
                      },
                    }))
                  }}
                  bulletType="number"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vipro" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Current Projects"
              value={kpiData.vipro.currentProjects}
              description="Active VIPRO projects"
              icon={<Home className="h-4 w-4" />}
              change={1}
            />
            <KpiCard
              title="Project Area"
              value={`${kpiData.vipro.projectArea.toLocaleString()} m²`}
              description="Total project area"
              icon={<Building2 className="h-4 w-4" />}
              change={8}
            />
            <KpiCard
              title="Completion Rate"
              value={`${kpiData.vipro.completionRate}%`}
              description="Average project completion"
              icon={<BarChart3 className="h-4 w-4" />}
              change={5}
            />
            <KpiCard
              title="Time Management"
              value={`${kpiData.vipro.timeEfficiency}%`}
              description="Time efficiency rate"
              icon={<Clock className="h-4 w-4" />}
              change={-2}
            />
          </div>

          <FinancialSummaryCard
            title="VIPRO"
            revenue={financialData.vipro.revenue}
            profit={financialData.vipro.profit}
            target={financialData.vipro.target}
            revenueChange={5}
            profitChange={7}
          />

          <FinancialCharts data={financialData.vipro} title="VIPRO Financial Performance" />

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Project Timelines</CardTitle>
                <CardDescription>Current VIPRO project timelines</CardDescription>
              </div>
              <DatePicker date={new Date()} onDateChange={() => {}} className="w-[180px]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {projectsData.viproProjects.map((project: any) => (
                  <div key={project.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{project.name}</span>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <span>Target:</span>
                        <EditableProjectDate
                          date={project.targetEndDate}
                          onDateChange={(newDate) => handleViproTargetDateChange(project.id, newDate)}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="grid grid-cols-4 gap-1">
                        <div className="text-xs">P1 - Planning ({project.phases.p1.planned}%)</div>
                        <div className="text-xs">P2 - Design ({project.phases.p2.planned}%)</div>
                        <div className="text-xs">P3 - Admin ({project.phases.p3.planned}%)</div>
                        <div className="text-xs">P4 - Construction ({project.phases.p4.planned}%)</div>
                      </div>
                      <div className="flex h-4 w-full overflow-hidden rounded-full bg-muted">
                        <div className="bg-blue-500 h-full" style={{ width: `${project.phases.p1.planned}%` }}>
                          <div
                            className="bg-blue-700 h-full"
                            style={{ width: `${(project.phases.p1.actual / project.phases.p1.planned) * 100}%` }}
                          ></div>
                        </div>
                        <div className="bg-green-500 h-full" style={{ width: `${project.phases.p2.planned}%` }}>
                          <div
                            className="bg-green-700 h-full"
                            style={{ width: `${(project.phases.p2.actual / project.phases.p2.planned) * 100}%` }}
                          ></div>
                        </div>
                        <div className="bg-yellow-500 h-full" style={{ width: `${project.phases.p3.planned}%` }}>
                          <div
                            className="bg-yellow-700 h-full"
                            style={{ width: `${(project.phases.p3.actual / project.phases.p3.planned) * 100}%` }}
                          ></div>
                        </div>
                        <div className="bg-red-500 h-full" style={{ width: `${project.phases.p4.planned}%` }}>
                          <div
                            className="bg-red-700 h-full"
                            style={{ width: `${(project.phases.p4.actual / project.phases.p4.planned) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Focus</CardTitle>
                <CardDescription>Current week priorities</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {kpiData.vipro.weeklyFocus.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                        {index + 1}
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Time Management</CardTitle>
                <CardDescription>VIPRO time allocation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Admin</span>
                      <span>{timeData.vipro.admin}%</span>
                    </div>
                    <Progress value={timeData.vipro.admin} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Core</span>
                      <span>{timeData.vipro.core}%</span>
                    </div>
                    <Progress value={timeData.vipro.core} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Development</span>
                      <span>{timeData.vipro.dev}%</span>
                    </div>
                    <Progress value={timeData.vipro.dev} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vifix" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Managed Units"
              value={kpiData.vifix.managedUnits.internal + kpiData.vifix.managedUnits.external}
              description="Total managed units"
              icon={<Building2 className="h-4 w-4" />}
              change={3}
            />
            <KpiCard
              title="Active Clients"
              value={kpiData.vifix.clients.internal + kpiData.vifix.clients.external}
              description="Total active clients"
              icon={<Users className="h-4 w-4" />}
              change={2}
            />
            <KpiCard
              title="Open Tickets"
              value={kpiData.vifix.tickets.internal + kpiData.vifix.tickets.external}
              description="Total open tickets"
              icon={<Wrench className="h-4 w-4" />}
              change={-1}
            />
            <KpiCard
              title="Time Efficiency"
              value={`${kpiData.vifix.timeEfficiency}%`}
              description="Overall time efficiency"
              icon={<Clock className="h-4 w-4" />}
              change={5}
            />
          </div>

          <FinancialSummaryCard
            title="VIFIX"
            revenue={financialData.vifix.revenue}
            profit={financialData.vifix.profit}
            target={financialData.vifix.target}
            revenueChange={10}
            profitChange={8}
          />

          <FinancialCharts data={financialData.vifix} title="VIFIX Financial Performance" />

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Managed Units</CardTitle>
                  <CardDescription>Internal vs External</CardDescription>
                </div>
                <DatePicker date={new Date()} onDateChange={() => {}} className="w-[180px]" />
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    internal: {
                      label: "Internal",
                      color: "hsl(var(--chart-1))",
                    },
                    external: {
                      label: "External",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        {
                          name: "Managed Units",
                          internal: kpiData.vifix.managedUnits.internal,
                          external: kpiData.vifix.managedUnits.external,
                        },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="internal" fill="var(--color-internal)" name="Internal" />
                      <Bar dataKey="external" fill="var(--color-external)" name="External" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Time Management</CardTitle>
                <CardDescription>VIFIX time allocation</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    operational: {
                      label: "Operational",
                      color: "hsl(var(--chart-1))",
                    },
                    admin: {
                      label: "Admin",
                      color: "hsl(var(--chart-2))",
                    },
                    dev: {
                      label: "Development",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Operational", value: timeData.vifix.operational },
                          { name: "Admin", value: timeData.vifix.admin },
                          { name: "Development", value: timeData.vifix.dev },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill="var(--color-operational)" />
                        <Cell fill="var(--color-admin)" />
                        <Cell fill="var(--color-dev)" />
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Focus</CardTitle>
              <CardDescription>Current week priorities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Done (Last Week)</h3>
                  <ul className="space-y-2">
                    {kpiData.vifix.done.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs">
                          ✓
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">To Do (This Week)</h3>
                  <ul className="space-y-2">
                    {kpiData.vifix.todo.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                          {index + 1}
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videsign" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Architecture"
              value={`${kpiData.videsign.architecture.toLocaleString()} m²`}
              description="Total architecture area"
              icon={<Building2 className="h-4 w-4" />}
              change={12}
            />
            <KpiCard
              title="Interior"
              value={`${kpiData.videsign.interior.toLocaleString()} m²`}
              description="Total interior design area"
              icon={<Paintbrush className="h-4 w-4" />}
              change={8}
            />
            <KpiCard
              title="Revenue"
              value={`€${financialData.videsign.revenue.toLocaleString()}`}
              description="Current revenue"
              icon={<BarChart3 className="h-4 w-4" />}
              change={15}
            />
            <KpiCard
              title="Profit"
              value={`€${financialData.videsign.profit.toLocaleString()}`}
              description="Current profit"
              icon={<BarChart3 className="h-4 w-4" />}
              change={10}
            />
          </div>

          <FinancialSummaryCard
            title="VIDESIGN"
            revenue={financialData.videsign.revenue}
            profit={financialData.videsign.profit}
            target={financialData.videsign.target}
            revenueChange={15}
            profitChange={18}
          />

          <FinancialCharts data={financialData.videsign} title="VIDESIGN Financial Performance" />

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Weekly Focus</CardTitle>
                <CardDescription>Current week priorities</CardDescription>
              </div>
              <DatePicker date={new Date()} onDateChange={() => {}} className="w-[180px]" />
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Done (Last Week)</h3>
                  <ul className="space-y-2">
                    {kpiData.videsign.done.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs">
                          ✓
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">To Do (This Week)</h3>
                  <ul className="space-y-2">
                    {kpiData.videsign.todo.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                          {index + 1}
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crm" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Future Clients"
              value={clientsData.futureClients.length}
              description="Total future clients"
              icon={<Users className="h-4 w-4" />}
              change={2}
            />
            <KpiCard
              title="Considering Clients"
              value={clientsData.consideringClients.length}
              description="Total considering clients"
              icon={<Users className="h-4 w-4" />}
              change={3}
            />
            <KpiCard
              title="Future Revenue"
              value={`€${clientsData.futureRevenue.toLocaleString()}`}
              description="Projected future revenue"
              icon={<BarChart3 className="h-4 w-4" />}
              change={15}
            />
            <KpiCard
              title="Considering Revenue"
              value={`€${clientsData.consideringRevenue.toLocaleString()}`}
              description="Potential considering revenue"
              icon={<BarChart3 className="h-4 w-4" />}
              change={8}
            />
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Future Clients</CardTitle>
                <CardDescription>Clients with confirmed projects</CardDescription>
              </div>
              <DatePicker date={new Date()} onDateChange={() => {}} className="w-[180px]" />
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium">Client data</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-1 text-navy-600">
                      <Edit2 className="h-3 w-3" />
                      Edit all data
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
                    <DialogHeader>
                      <DialogTitle className="text-gold-500">Edit Future Clients Data</DialogTitle>
                      <DialogDescription>
                        Make changes to the future clients data. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Area (m²)</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Budget (€)</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>Type</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {clientsData.futureClients.map((client, index) => (
                            <TableRow key={client.id}>
                              <TableCell>
                                <Input
                                  value={client.name}
                                  onChange={(e) => {
                                    const updatedClients = [...clientsData.futureClients]
                                    updatedClients[index] = { ...client, name: e.target.value }
                                    updateClientData("futureClients", updatedClients)
                                  }}
                                  className="h-8"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={client.sqm}
                                  onChange={(e) => {
                                    const updatedClients = [...clientsData.futureClients]
                                    updatedClients[index] = { ...client, sqm: Number(e.target.value) }
                                    updateClientData("futureClients", updatedClients)
                                  }}
                                  className="h-8"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={client.company}
                                  onChange={(e) => {
                                    const updatedClients = [...clientsData.futureClients]
                                    updatedClients[index] = { ...client, company: e.target.value }
                                    updateClientData("futureClients", updatedClients)
                                  }}
                                  className="h-8"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={client.budget}
                                  onChange={(e) => {
                                    const updatedClients = [...clientsData.futureClients]
                                    updatedClients[index] = { ...client, budget: Number(e.target.value) }
                                    updateClientData("futureClients", updatedClients)
                                  }}
                                  className="h-8"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={client.startDate}
                                  onChange={(e) => {
                                    const updatedClients = [...clientsData.futureClients]
                                    updatedClients[index] = { ...client, startDate: e.target.value }
                                    updateClientData("futureClients", updatedClients)
                                  }}
                                  className="h-8"
                                />
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={client.type}
                                  onValueChange={(value) => {
                                    const updatedClients = [...clientsData.futureClients]
                                    updatedClients[index] = { ...client, type: value as "B2B" | "B2C" }
                                    updateClientData("futureClients", updatedClients)
                                  }}
                                >
                                  <SelectTrigger className="h-8 w-24">
                                    <SelectValue placeholder="Type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="B2B">B2B</SelectItem>
                                    <SelectItem value="B2C">B2C</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <Button
                        className="mt-4 bg-navy-600 text-white hover:bg-navy-700"
                        onClick={() => {
                          const newClient = {
                            id: `new-${Date.now()}`,
                            name: "New Client",
                            sqm: 0,
                            company: "VIBRIX",
                            budget: 0,
                            startDate: new Date().toLocaleDateString("en-GB"),
                            type: "B2C" as const,
                          }
                          updateClientData("futureClients", [...clientsData.futureClients, newClient])
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Client
                      </Button>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => console.log("Cancelled")}>
                        Cancel
                      </Button>
                      <Button className="bg-navy-600 text-white hover:bg-navy-700">Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <DataTable columns={futureClientsColumns} data={clientsData.futureClients} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Considering Clients</CardTitle>
                <CardDescription>Clients in negotiation phase</CardDescription>
              </div>
              <DatePicker date={new Date()} onDateChange={() => {}} className="w-[180px]" />
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium">Client data</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-1 text-navy-600">
                      <Edit2 className="h-3 w-3" />
                      Edit all data
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
                    <DialogHeader>
                      <DialogTitle className="text-gold-500">Edit Considering Clients Data</DialogTitle>
                      <DialogDescription>
                        Make changes to the considering clients data. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Area (m²)</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Budget (€)</TableHead>
                            <TableHead>Meeting Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Type</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {clientsData.consideringClients.map((client, index) => (
                            <TableRow key={client.id}>
                              <TableCell>
                                <Input
                                  value={client.name}
                                  onChange={(e) => {
                                    const updatedClients = [...clientsData.consideringClients]
                                    updatedClients[index] = { ...client, name: e.target.value }
                                    updateClientData("consideringClients", updatedClients)
                                  }}
                                  className="h-8"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={client.sqm}
                                  onChange={(e) => {
                                    const updatedClients = [...clientsData.consideringClients]
                                    updatedClients[index] = { ...client, sqm: Number(e.target.value) }
                                    updateClientData("consideringClients", updatedClients)
                                  }}
                                  className="h-8"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={client.company}
                                  onChange={(e) => {
                                    const updatedClients = [...clientsData.consideringClients]
                                    updatedClients[index] = { ...client, company: e.target.value }
                                    updateClientData("consideringClients", updatedClients)
                                  }}
                                  className="h-8"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={client.budget}
                                  onChange={(e) => {
                                    const updatedClients = [...clientsData.consideringClients]
                                    updatedClients[index] = { ...client, budget: Number(e.target.value) }
                                    updateClientData("consideringClients", updatedClients)
                                  }}
                                  className="h-8"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={client.meetingDate}
                                  onChange={(e) => {
                                    const updatedClients = [...clientsData.consideringClients]
                                    updatedClients[index] = { ...client, meetingDate: e.target.value }
                                    updateClientData("consideringClients", updatedClients)
                                  }}
                                  className="h-8"
                                />
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={client.status}
                                  onValueChange={(value) => {
                                    const updatedClients = [...clientsData.consideringClients]
                                    updatedClients[index] = { ...client, status: value }
                                    updateClientData("consideringClients", updatedClients)
                                  }}
                                >
                                  <SelectTrigger className="h-8 w-24">
                                    <SelectValue placeholder="Status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Offer">Offer</SelectItem>
                                    <SelectItem value="Visitation">Visitation</SelectItem>
                                    <SelectItem value="Meeting">Meeting</SelectItem>
                                    <SelectItem value="BOQ">BOQ</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={client.type}
                                  onValueChange={(value) => {
                                    const updatedClients = [...clientsData.consideringClients]
                                    updatedClients[index] = { ...client, type: value as "B2B" | "B2C" }
                                    updateClientData("consideringClients", updatedClients)
                                  }}
                                >
                                  <SelectTrigger className="h-8 w-24">
                                    <SelectValue placeholder="Type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="B2B">B2B</SelectItem>
                                    <SelectItem value="B2C">B2C</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <Button
                        className="mt-4 bg-navy-600 text-white hover:bg-navy-700"
                        onClick={() => {
                          const newClient = {
                            id: `new-${Date.now()}`,
                            name: "New Client",
                            sqm: 0,
                            company: "VIBRIX",
                            budget: 0,
                            meetingDate: new Date().toLocaleDateString("en-GB"),
                            status: "Meeting",
                            type: "B2C" as const,
                          }
                          updateClientData("consideringClients", [...clientsData.consideringClients, newClient])
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Client
                      </Button>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => console.log("Cancelled")}>
                        Cancel
                      </Button>
                      <Button className="bg-navy-600 text-white hover:bg-navy-700">Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <DataTable columns={consideringClientsColumns} data={clientsData.consideringClients} />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Client Distribution</CardTitle>
                <CardDescription>B2B vs B2C clients</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    b2b: {
                      label: "B2B",
                      color: "hsl(var(--chart-1))",
                    },
                    b2c: {
                      label: "B2C",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "B2B", value: clientsData.b2bCount },
                          { name: "B2C", value: clientsData.b2cCount },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill="var(--color-b2b)" />
                        <Cell fill="var(--color-b2c)" />
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Distribution</CardTitle>
                <CardDescription>B2B vs B2C revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    b2b: {
                      label: "B2B",
                      color: "hsl(var(--chart-1))",
                    },
                    b2c: {
                      label: "B2C",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        {
                          name: "Future",
                          b2b: clientsData.b2bFutureRevenue,
                          b2c: clientsData.b2cFutureRevenue,
                        },
                        {
                          name: "Considering",
                          b2b: clientsData.b2bConsideringRevenue,
                          b2c: clientsData.b2cConsideringRevenue,
                        },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="b2b" fill="var(--color-b2b)" name="B2B" />
                      <Bar dataKey="b2c" fill="var(--color-b2c)" name="B2C" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function KpiCard({
  title,
  value,
  description,
  icon,
  change,
}: {
  title: string
  value: string | number
  description: string
  icon: React.ReactNode
  change: number
}) {
  const isNumeric = typeof value === "number" || !isNaN(Number.parseFloat(value.toString()))
  const prefix = isNumeric && value.toString().includes("€") ? "€" : ""
  const suffix = isNumeric && value.toString().includes("%") ? "%" : value.toString().includes("m²") ? " m²" : ""

  let displayValue = value
  if (isNumeric) {
    // Strip any non-numeric characters for processing
    const numericValue = typeof value === "string" ? Number.parseFloat(value.replace(/[^0-9.]/g, "")) : value
    displayValue = numericValue
  }

  return (
    <EditableKpiCard
      title={title}
      value={displayValue}
      description={description}
      icon={icon}
      change={change}
      onTitleChange={(newTitle) => console.log(`Updated title: ${newTitle}`)}
      onValueChange={(newValue) => console.log(`Updated value: ${newValue}`)}
      onDescriptionChange={(newDesc) => console.log(`Updated description: ${newDesc}`)}
      onChangeValueChange={(newChange) => console.log(`Updated change: ${newChange}`)}
      numeric={isNumeric}
      prefix={prefix}
      suffix={suffix}
      formatter={(val) => (isNumeric ? val.toLocaleString() : val.toString())}
    />
  )
}
