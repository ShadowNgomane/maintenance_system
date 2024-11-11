'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronDown, Filter, MapPin, Search, Image as ImageIcon, CheckSquare, Calendar, MoreHorizontal } from "lucide-react"
import { Table } from 'antd'
import { useEffect, useState } from "react"
import { preventiveMaintenanceService } from "@/app/services/preventiveMaintenanceService"
import { useToast } from "@/hooks/use-toast"
import { MaintenanceItem } from "@/app/types/PreventiveMaintenance"
import { ColumnType } from 'antd/es/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export default function Component() {
  const [items, setItems] = useState<MaintenanceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const { toast } = useToast()
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false)
  const [formData, setFormData] = useState<Partial<MaintenanceItem>>({
    name: '',
    workOrderTitle: '',
    workOrderDescription: '',
    category: '',
    priority: 'Medium',
  })

  // Define columns for Ant Design Table with explicit type
  const columns: ColumnType<MaintenanceItem>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left' as 'left',
      width: 150,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Work Order Title',
      dataIndex: 'workOrderTitle',
      key: 'workOrderTitle',
    },
    {
      title: 'Work Order Description',
      dataIndex: 'workOrderDescription',
      key: 'workOrderDescription',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => (
        <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
          <ImageIcon className="h-6 w-6 text-muted-foreground" />
        </div>
      ),
    },
    {
      title: 'Schedules',
      dataIndex: 'schedules',
      key: 'schedules',
      render: (schedules: number) => (
        <Badge variant="secondary" className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {schedules}
        </Badge>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Asset',
      dataIndex: 'asset',
      key: 'asset',
    },
    {
      title: 'Assigned To',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
      render: (assignedTo: { name: string, avatar: string }) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback>{assignedTo.avatar}</AvatarFallback>
          </Avatar>
          {assignedTo.name}
        </div>
      ),
    },
    {
      title: 'Additional Workers',
      dataIndex: 'additionalWorkers',
      key: 'additionalWorkers',
      render: (workers: string[]) => workers.join(', ') || '-',
    },
    {
      title: 'Team',
      dataIndex: 'team',
      key: 'team',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => (
        <Badge variant="outline" className={
          priority === 'High' ? 'bg-red-50 text-red-600 hover:bg-red-50' :
          priority === 'Medium' ? 'bg-orange-50 text-orange-600 hover:bg-orange-50' :
          'bg-green-50 text-green-600 hover:bg-green-50'
        }>
          {priority}
        </Badge>
      ),
    },
    {
      title: 'Checklist',
      dataIndex: 'checklist',
      key: 'checklist',
      render: (checklist: string[]) => (
        <Badge variant="secondary" className="flex items-center gap-1">
          <CheckSquare className="h-3 w-3" />
          {checklist.length}
        </Badge>
      ),
    },
    {
      title: 'Date Created',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
    },
  ]

  // Fetch preventive maintenance items
  const fetchItems = async () => {
    try {
      setLoading(true)
      const data = await preventiveMaintenanceService.getAll()
      setItems(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch preventive maintenance items",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  // Handle form input changes
  const handleInputChange = (field: keyof MaintenanceItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle create preventive maintenance
  const handleCreateMaintenance = async () => {
    try {
      await preventiveMaintenanceService.create(formData)
      setIsCreateModalOpen(false)
      setFormData({}) // Reset form
      fetchItems() // Refresh the list
      toast({
        title: "Success",
        description: "Preventive maintenance item created successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create preventive maintenance item",
        variant: "destructive",
      })
    }
  }

  // Create modal content
  const createModalContent = (
    <DialogContent className="sm:max-w-[650px]">
      <DialogHeader>
        <DialogTitle>Create Preventive Maintenance</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input 
            id="name" 
            value={formData.name || ''} 
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="workOrderTitle">Work Order Title</Label>
          <Input 
            id="workOrderTitle" 
            value={formData.workOrderTitle || ''} 
            onChange={(e) => handleInputChange('workOrderTitle', e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="workOrderDescription">Work Order Description</Label>
          <Input 
            id="workOrderDescription" 
            value={formData.workOrderDescription || ''} 
            onChange={(e) => handleInputChange('workOrderDescription', e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Input 
            id="category" 
            value={formData.category || ''} 
            onChange={(e) => handleInputChange('category', e.target.value)}
          />
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
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
          Cancel
        </Button>
        <Button onClick={handleCreateMaintenance}>
          Create
        </Button>
      </div>
    </DialogContent>
  )

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Header and Controls */}
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <div className="h-6 w-6 border rounded" />
            </Button>
            <h1 className="text-xl font-semibold">Preventive Maintenance</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">Create PM</Button>
              </DialogTrigger>
              {createModalContent}
            </Dialog>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{items.length} of {items.length} items</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">Sort: Date Created</span>
            <Button variant="ghost" size="icon">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="ghost" size="icon">
            <div className="grid h-4 w-4 place-items-center">
              <div className="h-4 w-4 border rounded" />
            </div>
          </Button>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 px-4 overflow-hidden">
        <Table
          rowSelection={{
            selectedRowKeys: selectedRows,
            onChange: (selectedRowKeys) => {
              setSelectedRows(selectedRowKeys as string[])
            },
          }}
          columns={columns}
          dataSource={items}
          rowKey="id"
          loading={loading}
          scroll={{ x: 1500 }}
        />
      </div>
    </div>
  )
}