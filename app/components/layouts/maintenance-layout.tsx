"use client"

import Link from "next/link"
import { 
  FileTextIcon, 
  ClipboardCheckIcon,
  InboxIcon,
  Users2Icon,
  MapPinIcon,
  BoxIcon,
  PackageIcon,
  ShoppingCartIcon,
  GaugeIcon,
  Users2Icon as TeamsIcon,
  Building2Icon,
  CheckSquareIcon,
  SendIcon,
  ImportIcon,
  HelpCircleIcon,
  PhoneIcon,
  Settings2Icon,
  BellIcon,
  User,
  LogOut,
  Cog,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function MaintenanceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Navigation Sidebar */}
      <nav className="w-64 bg-zinc-900 text-zinc-100">
        <div className="flex items-center gap-2 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500">
            <span className="font-bold text-white">T</span>
          </div>
          <span className="text-lg font-semibold">Techadome</span>
          <BellIcon className="ml-auto h-5 w-5 text-zinc-400" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full bg-teal-500 p-0">
                <User className="h-5 w-5 text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Shadow Ngomane</p>
                  <p className="text-xs leading-none text-muted-foreground">shadow@tecturaglobal.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Cog className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="px-2">
          <ul className="space-y-1">
            <li>
              <Link href="/work-orders" className="flex items-center space-x-3 rounded-lg px-3 py-2 text-zinc-100 hover:bg-zinc-800">
                <FileTextIcon className="h-5 w-5" />
                <span>Work Orders</span>
              </Link>
            </li>
            <li>
              <Link href="/preventive-maintenance" className="flex items-center space-x-3 rounded-lg px-3 py-2 text-zinc-100 hover:bg-zinc-800">
                <ClipboardCheckIcon className="h-5 w-5" />
                <span>Preventive Maintenance</span>
              </Link>
            </li>
            <li>
              <Link href="/requests" className="flex items-center space-x-3 rounded-lg px-3 py-2 text-zinc-100 hover:bg-zinc-800">
                <InboxIcon className="h-5 w-5" />
                <span>Requests</span>
              </Link>
            </li>
            <li>
              <Link href="/shared" className="flex items-center space-x-3 rounded-lg px-3 py-2 text-zinc-100 hover:bg-zinc-800">
                <Users2Icon className="h-5 w-5" />
                <span>Shared Work Orders</span>
              </Link>
            </li>
            <li>
              <Link href="/locations" className="flex items-center space-x-3 rounded-lg px-3 py-2 text-zinc-100 hover:bg-zinc-800">
                <MapPinIcon className="h-5 w-5" />
                <span>Locations</span>
              </Link>
            </li>
            <li>
              <Link href="/assets" className="flex items-center space-x-3 rounded-lg px-3 py-2 text-zinc-100 hover:bg-zinc-800">
                <BoxIcon className="h-5 w-5" />
                <span>Assets</span>
              </Link>
            </li>
            <li>
              <Link href="/inventory" className="flex items-center space-x-3 rounded-lg px-3 py-2 text-zinc-100 hover:bg-zinc-800">
                <PackageIcon className="h-5 w-5" />
                <span>Parts & Inventory</span>
              </Link>
            </li>
            <li>
              <Link href="/purchase-orders" className="flex items-center space-x-3 rounded-lg px-3 py-2 text-zinc-100 hover:bg-zinc-800">
                <ShoppingCartIcon className="h-5 w-5" />
                <span>Purchase Orders</span>
              </Link>
            </li>
            <li>
              <Link href="/people-teams" className="flex items-center space-x-3 rounded-lg px-3 py-2 text-zinc-100 hover:bg-zinc-800">
                <TeamsIcon className="h-5 w-5" />
                <span>People & Teams</span>
              </Link>
            </li>
            <li>
              <Link href="/vendors-customers" className="flex items-center space-x-3 rounded-lg px-3 py-2 text-zinc-100 hover:bg-zinc-800">
                <Building2Icon className="h-5 w-5" />
                <span>Vendors & Customers</span>
              </Link>
            </li>
            <li>
              <Link href="/checklists" className="flex items-center space-x-3 rounded-lg px-3 py-2 text-zinc-100 hover:bg-zinc-800">
                <CheckSquareIcon className="h-5 w-5" />
                <span>Checklists</span>
              </Link>
            </li>
            <li>
              <Link href="/import-export" className="flex items-center space-x-3 rounded-lg px-3 py-2 text-zinc-100 hover:bg-zinc-800">
                <ImportIcon className="h-5 w-5" />
                <span>Import & Export</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="absolute bottom-0 w-64 space-y-1 border-t border-zinc-800 p-2">
          <Link href="/help" className="flex items-center space-x-3 rounded-lg px-3 py-2 text-zinc-100 hover:bg-zinc-800">
            <HelpCircleIcon className="h-5 w-5" />
            <span>Help</span>
          </Link>
          <Link href="/contact" className="flex items-center space-x-3 rounded-lg px-3 py-2 text-zinc-100 hover:bg-zinc-800">
            <PhoneIcon className="h-5 w-5" />
            <span>Contact Us</span>
          </Link>
        </div>
      </nav>

      <main className="flex-1 overflow-hidden bg-zinc-50">
        <div className="h-[calc(100vh-12rem)] overflow-y-auto p-4">
          {children}
        </div>
      </main>
    </div>
  )
}