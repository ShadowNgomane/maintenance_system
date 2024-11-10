import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Copy, MoreHorizontal, Search, FilterIcon } from "lucide-react"
import { Table } from 'antd'
import type { TableProps } from 'antd'
import { useEffect, useState } from "react"
import { purchaseOrderService } from "@/app/services/purchaseOrderService"
import { useToast } from "@/hooks/use-toast"
import { PurchaseOrder } from "@/app/types/purchaseOrder"



export default function Component() {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const { toast } = useToast()

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'PO Number',
      dataIndex: 'poNumber',
      key: 'poNumber',
    },
    {
      title: '# of Items',
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
  ]

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

  const handleDeletePurchaseOrders = async () => {
    try {
      await Promise.all(selectedRows.map(id => purchaseOrderService.delete(id)))
      setSelectedRows([])
      fetchPurchaseOrders()
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
      rowKey="id"
      loading={loading}
    />
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between border-b bg-white px-4 py-2">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">Purchase Orders</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Create Purchase Order
          </Button>
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

      {tableSection}
    </div>
  )
}