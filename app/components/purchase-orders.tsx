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
import { purchaseOrderService } from "@/app/services/purchaseOrderService"
import { useToast } from "@/hooks/use-toast"
import { Table } from 'antd'
import type { TableProps } from 'antd'
import { PurchaseOrder } from "@/app/types/purchaseOrder";

interface PurchaseOrdersTableProps {
  onFilterChange?: (filters: any) => void
  onSortChange?: (column: string, direction: "asc" | "desc") => void
}

export default function Component({ 
  onFilterChange,
  onSortChange 
}: Omit<PurchaseOrdersTableProps, 'purchaseOrders'>) {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRows, setSelectedRows] = React.useState<string[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false)
  const [formData, setFormData] = useState<Partial<PurchaseOrder>>({
    title: '',
    poNumber: '',
    itemsCount: 0,
    totalQuantity: 0,
    totalCost: 0,
    createdBy: '',
    vendor: '',
    tags: [],
    status: 'Pending',
  })
  const { toast } = useToast()

  // Define columns for Ant Design Table
  const columns = [
    {
      title: 'PO #',
      dataIndex: 'poNumber',
      key: 'poNumber',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Items Count',
      dataIndex: 'itemsCount',
      key: 'itemsCount',
    },
    {
      title: 'Total Quantity',
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
    },
    {
      title: 'Total Cost',
      dataIndex: 'totalCost',
      key: 'totalCost',
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => (
        <>
          {tags.map(tag => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge
          variant="secondary"
          className={
            status === "Pending"
              ? "bg-yellow-100 text-yellow-600"
              : status === "Approved"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }
        >
          {status}
        </Badge>
      ),
    },
  ]

  // Fetch purchase orders
  const fetchPurchaseOrders = async () => {
    try {
      setLoading(true)
      const data = await purchaseOrderService.getAll()
      setPurchaseOrders(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch purchase orders",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPurchaseOrders()
  }, [])

  // Handle form input changes
  const handleInputChange = (field: keyof PurchaseOrder, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle create purchase order
  const handleCreatePurchaseOrder = async () => {
    try {
      const newPurchaseOrder: PurchaseOrder = {
        id: '', // Assign a default or generated ID
        title: formData.title || '', // Provide default value
        poNumber: formData.poNumber || '', // Provide default value
        itemsCount: formData.itemsCount || 0, // Provide default value
        totalQuantity: formData.totalQuantity || 0, // Provide default value
        totalCost: formData.totalCost || 0, // Ensure totalCost is a number
        createdBy: formData.createdBy || '', // Provide default value
        vendor: formData.vendor || '', // Provide default value
        tags: formData.tags || [], // Provide default value
        status: formData.status || 'Pending', // Provide default value
      }
      await purchaseOrderService.create(newPurchaseOrder)
      setIsCreateModalOpen(false)
      setFormData({}) // Reset form
      fetchPurchaseOrders() // Refresh the list
      toast({
        title: "Success",
        description: "Purchase order created successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create purchase order",
        variant: "destructive",
      })
    }
  }

  // Handle delete purchase order(s)
  const handleDeletePurchaseOrders = async () => {
    try {
      await Promise.all(selectedRows.map(id => purchaseOrderService.delete(id)))
      setSelectedRows([]) // Clear selected rows after deletion
      fetchPurchaseOrders() // Refresh the list
      toast({
        title: "Success",
        description: "Purchase orders deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete purchase orders",
        variant: "destructive",
      })
    }
  }

  // Update the create modal content
  const createModalContent = (
    <DialogContent className="sm:max-w-[650px]">
      <DialogHeader>
        <DialogTitle>Create Purchase Order</DialogTitle>
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
          <Label htmlFor="poNumber">PO Number</Label>
          <Input 
            id="poNumber" 
            value={formData.poNumber || ''} 
            onChange={(e) => handleInputChange('poNumber', e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="itemsCount">Items Count</Label>
          <Input 
            id="itemsCount" 
            type="number"
            value={formData.itemsCount || 0} 
            onChange={(e) => handleInputChange('itemsCount', parseInt(e.target.value))}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="totalQuantity">Total Quantity</Label>
          <Input 
            id="totalQuantity" 
            type="number"
            value={formData.totalQuantity || 0} 
            onChange={(e) => handleInputChange('totalQuantity', parseInt(e.target.value))}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="totalCost">Total Cost</Label>
          <Input 
            id="totalCost" 
            type="number"
            value={formData.totalCost || 0} 
            onChange={(e) => handleInputChange('totalCost', parseFloat(e.target.value))}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="createdBy">Created By</Label>
          <Input 
            id="createdBy" 
            value={formData.createdBy || ''} 
            onChange={(e) => handleInputChange('createdBy', e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="vendor">Vendor</Label>
          <Input 
            id="vendor" 
            value={formData.vendor || ''} 
            onChange={(e) => handleInputChange('vendor', e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="tags">Tags</Label>
          <Input 
            id="tags" 
            value={formData.tags?.join(', ') || ''} 
            onChange={(e) => handleInputChange('tags', e.target.value.split(',').map(tag => tag.trim()))}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="status">Status</Label>
          <Select 
            value={formData.status ?? 'Pending'}
            onValueChange={(value) => handleInputChange('status', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
          Cancel
        </Button>
        <Button onClick={handleCreatePurchaseOrder}>
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
      dataSource={purchaseOrders}
      rowKey="_id"
      loading={loading}
    />
  )

  return (
    <div className="flex flex-col gap-4">
      {/* Header Controls */}
      <div className="flex items-center justify-between border-b bg-white px-4 py-2">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">Purchase Orders</h1>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Purchase Order
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
          Filters
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          Status
          <ChevronDown className="h-4 w-4" />
        </Button>
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
            onClick={handleDeletePurchaseOrders}
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