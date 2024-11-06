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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Filter, MoreHorizontal, ChevronDown, MapPin, Search, Image as ImageIcon, CheckSquare, Calendar } from "lucide-react"

interface MaintenanceItem {
  id: string
  name: string
  workOrderTitle: string
  workOrderDescription: string
  image: string
  schedules: number
  category: string
  asset: string
  assignedTo: {
    name: string
    avatar: string
  }
  additionalWorkers: string[]
  team: string
  location: string
  priority: 'Low' | 'Medium' | 'High'
  checklist: string[]
  dateCreated: string
}

export default function Component() {
  const [items] = React.useState<MaintenanceItem[]>([
    {
      id: '671fb1979',
      name: 'HVAC Preventive Maintenance',
      workOrderTitle: 'HVAC Monthly Preventive Maintenance',
      workOrderDescription: 'Monthly HVAC preventative maintenance check including filter replacement, coil cleaning, and general system inspection.',
      image: '/placeholder.svg',
      schedules: 1,
      category: 'Preventative',
      asset: 'TRANE HVAC Suite B',
      assignedTo: {
        name: 'Shadow Ngomane',
        avatar: 'SN'
      },
      additionalWorkers: ['John Doe', 'Jane Smith'],
      team: 'Maintenance Team A',
      location: 'Suite B',
      priority: 'Medium',
      checklist: ['Check filters', 'Clean coils', 'Inspect belts'],
      dateCreated: '10/28/24 - 05:30 AM'
    },
    {
      id: '892cd3456',
      name: 'Elevator Maintenance',
      workOrderTitle: 'Quarterly Elevator Inspection',
      workOrderDescription: 'Perform quarterly inspection and maintenance on all elevators in the building.',
      image: '/elevator-placeholder.svg',
      schedules: 2,
      category: 'Safety',
      asset: 'OTIS Elevator 3',
      assignedTo: {
        name: 'Emily Johnson',
        avatar: 'EJ'
      },
      additionalWorkers: ['Mike Brown'],
      team: 'Safety Team',
      location: 'Main Building',
      priority: 'High',
      checklist: ['Check cables', 'Test emergency phone', 'Lubricate moving parts'],
      dateCreated: '10/29/24 - 09:15 AM'
    }
  ])

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
          <span className="text-sm text-muted-foreground">2 of 2 items</span>
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
            <DropdownMenuItem>Emily Johnson</DropdownMenuItem>
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
            <DropdownMenuItem>Main Building</DropdownMenuItem>
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
        <div className="overflow-x-auto relative max-w-[calc(100vw-2rem)]">
          <div className="overflow-x-scroll">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 sticky left-0 z-20 bg-background">
                    <Checkbox />
                  </TableHead>
                  <TableHead className="sticky left-12 z-20 bg-background">Name</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Work Order Title</TableHead>
                  <TableHead>Work Order Description</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Schedules</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Asset</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Additional Workers</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Checklist</TableHead>
                  <TableHead>Date Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="sticky left-0 z-20 bg-background">
                      <Checkbox />
                    </TableCell>
                    <TableCell className="sticky left-12 z-20 bg-background">{item.name}</TableCell>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.workOrderTitle}</TableCell>
                    <TableCell>{item.workOrderDescription}</TableCell>
                    <TableCell>
                      <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {item.schedules}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.asset}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>{item.assignedTo.avatar}</AvatarFallback>
                        </Avatar>
                        {item.assignedTo.name}
                      </div>
                    </TableCell>
                    <TableCell>{item.additionalWorkers.join(', ') || '-'}</TableCell>
                    <TableCell>{item.team}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        item.priority === 'High' ? 'bg-red-50 text-red-600 hover:bg-red-50' :
                        item.priority === 'Medium' ? 'bg-orange-50 text-orange-600 hover:bg-orange-50' :
                        'bg-green-50 text-green-600 hover:bg-green-50'
                      }>
                        {item.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <CheckSquare className="h-3 w-3" />
                        {item.checklist.length}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.dateCreated}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}