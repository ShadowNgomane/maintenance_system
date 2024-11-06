"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts"
import { ArrowUp, Clock, DollarSign, Wrench } from "lucide-react"

export default function Dashboard() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    // Sample data for charts
    const workOrderData = [
      { month: "Jan", preventive: 20, corrective: 15 },
      { month: "Feb", preventive: 25, corrective: 18 },
      { month: "Mar", preventive: 22, corrective: 20 },
      { month: "Apr", preventive: 30, corrective: 12 },
      { month: "May", preventive: 28, corrective: 22 },
      { month: "Jun", preventive: 35, corrective: 25 },
    ]
  
    const costBreakdownData = [
      { name: "Labor", value: 45 },
      { name: "Parts/Materials", value: 30 },
      { name: "External Services", value: 15 },
      { name: "Other Expenses", value: 10 },
    ]
  
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]
  
  return (
    <div className="p-6">
    {/* KPI Summary Cards */}
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Active Work Orders</CardTitle>
          <Wrench className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">25</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Overdue Maintenance Tasks</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">7</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Equipment Uptime Percentage</CardTitle>
          <ArrowUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">98.5%</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Maintenance Cost This Month</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R12,500</div>
        </CardContent>
      </Card>
    </div>

    {/* Equipment Status and Maintenance Schedule */}
    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Equipment Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Equipment Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Equipment ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Maintenance</TableHead>
                <TableHead>Next Scheduled</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>EQ001</TableCell>
                <TableCell>Pump A</TableCell>
                <TableCell>Building 1</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Operational
                  </span>
                </TableCell>
                <TableCell>2023-05-15</TableCell>
                <TableCell>2023-08-15</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>EQ002</TableCell>
                <TableCell>Conveyor B</TableCell>
                <TableCell>Building 2</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                    Caution
                  </span>
                </TableCell>
                <TableCell>2023-06-01</TableCell>
                <TableCell>2023-07-01</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>EQ003</TableCell>
                <TableCell>Generator C</TableCell>
                <TableCell>Building 3</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                    Out of Service
                  </span>
                </TableCell>
                <TableCell>2023-05-20</TableCell>
                <TableCell>2023-06-20</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Maintenance Schedule Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Schedule Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </CardContent>
      </Card>
    </div>

    {/* Work Order Summary and Maintenance Costs */}
    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Work Order Summary Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Work Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              preventive: {
                label: "Preventive",
                color: "hsl(var(--chart-1))",
              },
              corrective: {
                label: "Corrective",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workOrderData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="preventive" fill="var(--color-preventive)" />
                <Bar dataKey="corrective" fill="var(--color-corrective)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Maintenance Costs Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Costs Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={costBreakdownData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {costBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  </div>
  )
} 