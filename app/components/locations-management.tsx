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
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  List,
  Map,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
} from "lucide-react"

export default function LocationManagement() {
  return (
    <div className="w-full">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <div className="h-4 w-4 border" />
            </Button>
            <h1 className="text-xl font-semibold">Locations</h1>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-9">
              <List className="mr-2 h-4 w-4" />
              List View
            </Button>
            <Button variant="ghost" size="sm" className="h-9">
              <Map className="mr-2 h-4 w-4" />
              Map View
            </Button>
          </div>
          <div className="flex flex-1 items-center gap-4 md:max-w-sm">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input className="pl-8" placeholder="Search Locations" />
            </div>
            <Button size="sm" className="h-9">
              <Plus className="mr-2 h-4 w-4" />
              Location
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Actions
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Delete selected</DropdownMenuItem>
              <DropdownMenuItem>Move to folder</DropdownMenuItem>
              <DropdownMenuItem>Export data</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="sm" className="ml-auto">
            <Settings2 className="mr-2 h-4 w-4" />
            Table Customization
            <ChevronDown className="ml-2 h-4 w-4" />
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
                <TableHead>Location Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <div className="h-4 w-4 border" />
                  </Button>
                </TableCell>
                <TableCell>UpKeep HQ</TableCell>
                <TableCell>10880 Wilshire Blvd, Los Angeles, CA 90024, USA</TableCell>
                <TableCell>Oct 31, 2024 @ 08:34 AM</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing 1 to 1 of 1 entries
            <span className="ml-1 text-xs text-muted-foreground">Click a row to select it</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button variant="outline" size="sm" className="min-w-9">
              1
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}