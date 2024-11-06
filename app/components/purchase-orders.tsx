import { Button } from "@/components/ui/button"
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
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Copy, MoreHorizontal, Search } from "lucide-react"

export default function PurchaseOrders() {
  return (
    <div className="w-full">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <div className="h-4 w-4 border" />
            </Button>
            <h1 className="text-xl font-semibold">Purchase Orders</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button>Create Purchase Order</Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">1 of 1 item</div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              Sort: Date Created
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              Columns
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input className="pl-8" placeholder="Search" />
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Show all</DropdownMenuItem>
              <DropdownMenuItem>Active</DropdownMenuItem>
              <DropdownMenuItem>Completed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Tags
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All tags</DropdownMenuItem>
              <DropdownMenuItem>Restock</DropdownMenuItem>
              <DropdownMenuItem>Maintenance</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Status
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All statuses</DropdownMenuItem>
              <DropdownMenuItem>Pending</DropdownMenuItem>
              <DropdownMenuItem>Completed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="link" size="sm" className="ml-auto">
            Save View
          </Button>
        </div>
        <div className="mt-4 rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <div className="h-4 w-4 border" />
                  </Button>
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>PO Number</TableHead>
                <TableHead># of Items</TableHead>
                <TableHead>Total Quantity</TableHead>
                <TableHead>Total Cost</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Tags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <div className="h-4 w-4 border" />
                  </Button>
                </TableCell>
                <TableCell>Restock: HVAC Filters</TableCell>
                <TableCell className="font-mono">
                  1
                  <Button variant="ghost" size="icon" className="ml-2 h-6 w-6">
                    <Copy className="h-3 w-3" />
                  </Button>
                </TableCell>
                <TableCell>1</TableCell>
                <TableCell>12</TableCell>
                <TableCell>$74.43</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                      <span className="text-sm">S</span>
                    </div>
                    <span>Shadow Ngomane</span>
                  </div>
                </TableCell>
                <TableCell>McMaster-Carr</TableCell>
                <TableCell>
                  <Badge variant="secondary">Restock</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}