'use client'

import * as React from "react"
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Filter, MoreHorizontal, ChevronDown, MapPin, Search } from "lucide-react"

interface MaintenanceItem {
  id: string
  name: string
  workOrderTitle: string
  workOrderDescription: string
  image: string
  schedules: number
  category: string
  assignedTo: {
    name: string
    avatar: string
  }
  additionalWorkers: string
  team: string
  location: string
  priority: 'Low' | 'Medium' | 'High'
  checklist: string
  dateCreated: string
  asset: string
}

export default function Component() {
  const [items] = React.useState<MaintenanceItem[]>([{
    id: '671fb1979',
    name: 'HVAC Preventive Mai...',
    workOrderTitle: 'HVAC Monthly Preventive ...',
    workOrderDescription: 'Monthly HVAC preventativ...',
    image: '/placeholder.svg',
    schedules: 1,
    category: 'Preventative',
    assignedTo: {
      name: 'Shadow Ngomane',
      avatar: 'SN'
    },
    additionalWorkers: '-',
    team: '-',
    location: 'Suite B',
    priority: 'Medium',
    checklist: '-',
    dateCreated: '10/28/24 - 05:...',
    asset: 'TRANE HVAC Suite B'
  }])

  return (
    <div className="w-full">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <div className="h-6 w-6 border rounded" />
            </Button>
            <h1 className="text-xl font-semibold">Preventive Maintenance</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button className="bg-blue-600 hover:bg-blue-700">Create PM</Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">1 of 1 item</span>
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

      <div className="flex gap-2 px-4 mb-4">
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              Assigned To
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>All</DropdownMenuItem>
            <DropdownMenuItem>Shadow Ngomane</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <MapPin className="h-4 w-4" />
              Location
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>All Locations</DropdownMenuItem>
            <DropdownMenuItem>Suite B</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              Priority
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>All</DropdownMenuItem>
            <DropdownMenuItem>High</DropdownMenuItem>
            <DropdownMenuItem>Medium</DropdownMenuItem>
            <DropdownMenuItem>Low</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="link" className="ml-auto text-blue-600">
          Save View
        </Button>
      </div>

      <div className="px-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Additional Workers</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.asset}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 bg-emerald-100 text-emerald-600">
                      <AvatarFallback>{item.assignedTo.avatar}</AvatarFallback>
                    </Avatar>
                    {item.assignedTo.name}
                  </div>
                </TableCell>
                <TableCell>{item.additionalWorkers}</TableCell>
                <TableCell>{item.team}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-orange-50 text-orange-600 hover:bg-orange-50">
                    {item.priority}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}