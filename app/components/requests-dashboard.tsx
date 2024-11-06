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
import { ChevronDown, Image as ImageIcon, MoreHorizontal, Search } from "lucide-react"

export default function RequestDashboard() {
  return (
    <div className="w-full">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <div className="h-4 w-4 border" />
            </Button>
            <h1 className="text-xl font-semibold">Requests</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button>Create Request</Button>
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
              Sort: Submitted Date
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
              <DropdownMenuItem>Inactive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Asset
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All assets</DropdownMenuItem>
              <DropdownMenuItem>Equipment</DropdownMenuItem>
              <DropdownMenuItem>Facilities</DropdownMenuItem>
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
              <DropdownMenuItem>Active</DropdownMenuItem>
              <DropdownMenuItem>Inactive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Assigned To
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All users</DropdownMenuItem>
              <DropdownMenuItem>Active users</DropdownMenuItem>
              <DropdownMenuItem>Inactive users</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Location
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All locations</DropdownMenuItem>
              <DropdownMenuItem>Main office</DropdownMenuItem>
              <DropdownMenuItem>Branch office</DropdownMenuItem>
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
                <TableHead>Image</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Work Order</TableHead>
                <TableHead>Submitted Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Submitted By</TableHead>
                <TableHead>Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <div className="h-4 w-4 border" />
                  </Button>
                </TableCell>
                <TableCell>Air conditioning issue</TableCell>
                <TableCell>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-muted">
                    <ImageIcon className="h-4 w-4" />
                  </div>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                    Pending
                  </span>
                </TableCell>
                <TableCell>Open</TableCell>
                <TableCell>10/31/24 - 8:35</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>None</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}