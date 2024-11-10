"use client"

import * as React from "react"
import {
  ArrowUpDown,
  CheckCircle2,
  ChevronDown,
  FilterIcon,
  Info,
  LayoutGrid,
  MoreHorizontal,
  PlusCircle,
  RefreshCcw,
  Search,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface WorkOrder {
  id: string
  title: string
  description: string
  dueDate?: string
  startDate?: string
  status: "Open" | "In Progress" | "Completed"
  priority: "Low" | "Medium" | "High"
  category: string
  hasInfo?: boolean
  hasRecurring?: boolean
}

interface WorkOrdersTableProps {
  workOrders: WorkOrder[]
  onCreateWorkOrder?: () => void
  onFilterChange?: (filters: any) => void
  onSortChange?: (column: string, direction: "asc" | "desc") => void
}

export default function Component({ 
  workOrders,
  onCreateWorkOrder,
  onFilterChange,
  onSortChange 
}: WorkOrdersTableProps) {
  const [selectedRows, setSelectedRows] = React.useState<string[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false)

  return (
    <div className="flex flex-col gap-4">
      {/* Header Controls */}
      <div className="flex items-center justify-between border-b bg-white px-4 py-2">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">Work Orders</h1>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <LayoutGrid className="mr-2 h-4 w-4" />
                Table
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Table View</DropdownMenuItem>
              <DropdownMenuItem>Calendar View</DropdownMenuItem>
              <DropdownMenuItem>Kanban View</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Work Order
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px]">
              <DialogHeader>
                <DialogTitle>Create Work Order</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  // Handle form submission here
                  onCreateWorkOrder?.()
                  setIsCreateModalOpen(false)
                }}>
                  Create
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                Import/Export
              </DropdownMenuItem>
              <DropdownMenuItem>
                Export Filtered View
              </DropdownMenuItem>
              <DropdownMenuItem>
                Export to PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 px-4">
        <Button variant="outline" size="sm" className="gap-2">
          <FilterIcon className="h-4 w-4" />
          Filters (2)
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          Status: Open +2
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          Priority
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          Location
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          Asset
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          Assigned To
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Button variant="link" size="sm" className="ml-auto">
          Reset
        </Button>
        <Button variant="link" size="sm" className="text-blue-600">
          Save View
        </Button>
      </div>

      {/* Table Controls */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-500">
            {workOrders.length} of {workOrders.length} items
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-500">Sort: Category</span>
            <Button variant="ghost" size="sm">
              Columns
            </Button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input className="w-64 pl-8" placeholder="Search" />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedRows.length === workOrders.length}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedRows(workOrders.map(wo => wo.id))
                    } else {
                      setSelectedRows([])
                    }
                  }}
                />
              </TableHead>
              <TableHead>WO #</TableHead>
              <TableHead>Work Order Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="text-right">
                Category
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workOrders.map((workOrder) => (
              <TableRow key={workOrder.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(workOrder.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedRows([...selectedRows, workOrder.id])
                      } else {
                        setSelectedRows(selectedRows.filter(id => id !== workOrder.id))
                      }
                    }}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-1">
                    {workOrder.id}
                    {workOrder.hasInfo && (
                      <Badge variant="secondary" className="bg-pink-100">
                        <Info className="h-3 w-3 text-pink-500" />
                      </Badge>
                    )}
                    {workOrder.hasRecurring && (
                      <Badge variant="secondary" className="bg-emerald-100">
                        <RefreshCcw className="h-3 w-3 text-emerald-500" />
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{workOrder.title}</TableCell>
                <TableCell>{workOrder.description}</TableCell>
                <TableCell>{workOrder.dueDate}</TableCell>
                <TableCell>{workOrder.startDate}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-zinc-300" />
                    {workOrder.status}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      workOrder.priority === "Low"
                        ? "bg-blue-100 text-blue-600"
                        : workOrder.priority === "Medium"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-red-100 text-red-600"
                    }
                  >
                    {workOrder.priority}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{workOrder.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}