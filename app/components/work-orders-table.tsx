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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { workOrderService } from "@/app/services/workOrderService"
import { useToast } from "@/hooks/use-toast"
import { Table } from 'antd'
import type { TableProps } from 'antd'

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
  onFilterChange?: (filters: any) => void
  onSortChange?: (column: string, direction: "asc" | "desc") => void
}

export default function Component({ 
  onFilterChange,
  onSortChange 
}: Omit<WorkOrdersTableProps, 'workOrders'>) {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRows, setSelectedRows] = React.useState<string[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false)
  const [formData, setFormData] = useState<Partial<WorkOrder>>({
    title: '',
    description: '',
    status: 'Open',
    priority: 'Medium',
    category: '',
  })
  const { toast } = useToast()

  // Define columns for Ant Design Table
  const columns = [
    {
      title: 'WO #',
      dataIndex: 'id',
      key: 'id',
      render: (id: string, record: WorkOrder) => (
        <div className="flex items-center gap-1">
          {id}
          {record.hasInfo && (
            <Badge variant="secondary" className="bg-pink-100">
              <Info className="h-3 w-3 text-pink-500" />
            </Badge>
          )}
          {record.hasRecurring && (
            <Badge variant="secondary" className="bg-emerald-100">
              <RefreshCcw className="h-3 w-3 text-emerald-500" />
            </Badge>
          )}
        </div>
      ),
    },
    {
      title: 'Work Order Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <div className="flex items-center gap-1">
          <CheckCircle2 className="h-4 w-4 text-zinc-300" />
          {status}
        </div>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => (
        <Badge
          variant="secondary"
          className={
            priority === "Low"
              ? "bg-blue-100 text-blue-600"
              : priority === "Medium"
              ? "bg-orange-100 text-orange-600"
              : "bg-red-100 text-red-600"
          }
        >
          {priority}
        </Badge>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      align: 'right' as const,
    },
  ]

  // Fetch work orders
  const fetchWorkOrders = async () => {
    try {
      setLoading(true)
      const data = await workOrderService.getAll()
      setWorkOrders(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch work orders",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWorkOrders()
  }, [])

  // Handle form input changes
  const handleInputChange = (field: keyof WorkOrder, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle create work order
  const handleCreateWorkOrder = async () => {
    try {
      await workOrderService.create(formData)
      setIsCreateModalOpen(false)
      setFormData({}) // Reset form
      fetchWorkOrders() // Refresh the list
      toast({
        title: "Success",
        description: "Work order created successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create work order",
        variant: "destructive",
      })
    }
  }

  // Handle delete work order(s)
  const handleDeleteWorkOrders = async () => {
    try {
      await Promise.all(selectedRows.map(id => workOrderService.delete(id)))
      setSelectedRows([])
      fetchWorkOrders()
      toast({
        title: "Success",
        description: "Work orders deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete work orders",
        variant: "destructive",
      })
    }
  }

  // Update the create modal content
  const createModalContent = (
    <DialogContent className="sm:max-w-[650px]">
      <DialogHeader>
        <DialogTitle>Create Work Order</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input 
            id="title" 
            value={formData.title || ''} 
            onChange={(e) => handleInputChange('title', e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Input 
            id="description" 
            value={formData.description || ''} 
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Input 
            id="dueDate" 
            type="date" 
            value={formData.dueDate || ''} 
            onChange={(e) => handleInputChange('dueDate', e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input 
            id="startDate" 
            type="date" 
            value={formData.startDate || ''} 
            onChange={(e) => handleInputChange('startDate', e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="status">Status</Label>
          <Select 
            value={formData.status} 
            onValueChange={(value) => handleInputChange('status', value)}
          >
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
          <Select 
            value={formData.priority} 
            onValueChange={(value) => handleInputChange('priority', value)}
          >
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
          <Input 
            id="category" 
            value={formData.category || ''} 
            onChange={(e) => handleInputChange('category', e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
          Cancel
        </Button>
        <Button onClick={handleCreateWorkOrder}>
          Create
        </Button>
      </div>
    </DialogContent>
  )

  // Replace the existing table with the new tableSection
  const tableSection = (
    <Table
      rowSelection={{
        selectedRowKeys: selectedRows,
        onChange: (selectedRowKeys) => {
          setSelectedRows(selectedRowKeys as string[])
        },
      }}
      columns={columns}
      dataSource={workOrders}
      rowKey="id"
      loading={loading}
    />
  )

  return (
    <div className="flex flex-col gap-4">
      {/* Header Controls */}
      <div className="flex items-center justify-between border-b bg-white px-4 py-2">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">Work Orders</h1>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Work Order
              </Button>
            </DialogTrigger>
            {createModalContent}
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

      {/* Add delete button when rows are selected */}
      {selectedRows.length > 0 && (
        <div className="px-4">
          <Button 
            variant="destructive" 
            size="sm"
            onClick={handleDeleteWorkOrders}
          >
            Delete Selected ({selectedRows.length})
          </Button>
        </div>
      )}

      {/* Table */}
      {tableSection}
    </div>
  )
}