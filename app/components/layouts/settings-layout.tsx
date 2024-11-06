import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Home,
  Settings,
  Users,
  Box,
  Package,
  FileText,
  ClipboardList,
  ShoppingCart,
  Timer,
  Tag,
  Code,
  Key,
  X,
} from "lucide-react"

interface SettingsLayoutProps {
  children: ReactNode
}

interface NavItem {
  title: string
  icon: ReactNode
  href: string
}

interface NavSection {
  title: string
  items: NavItem[]
}

const navigation: NavSection[] = [
  {
    title: "Organization",
    items: [
      { title: "General", icon: <Home className="h-4 w-4" />, href: "/settings/general" },
      { title: "User Roles", icon: <Users className="h-4 w-4" />, href: "/settings/user-roles" },
    ],
  },
  {
    title: "Modules",
    items: [
      { title: "Assets", icon: <Box className="h-4 w-4" />, href: "/settings/assets" },
      { title: "Parts & Inventory", icon: <Package className="h-4 w-4" />, href: "/settings/inventory" },
      { title: "Requests", icon: <FileText className="h-4 w-4" />, href: "/settings/requests" },
      { title: "Work Orders", icon: <ClipboardList className="h-4 w-4" />, href: "/settings/work-orders" },
      { title: "Purchase Orders", icon: <ShoppingCart className="h-4 w-4" />, href: "/settings/purchase-orders" },
      { title: "Meters", icon: <Timer className="h-4 w-4" />, href: "/settings/meters" },
      { title: "Tags", icon: <Tag className="h-4 w-4" />, href: "/settings/tags" },
    ],
  },
  {
    title: "Advanced",
    items: [
      { title: "API", icon: <Code className="h-4 w-4" />, href: "/settings/api" },
      { title: "Authentication", icon: <Key className="h-4 w-4" />, href: "/settings/authentication" },
    ],
  },
]

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r bg-background">
        <div className="flex h-16 items-center border-b px-6">
          <h1 className="text-lg font-semibold">UpKeep Settings</h1>
          <Button variant="ghost" size="icon" className="ml-auto">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="p-4 space-y-8">
            {navigation.map((section) => (
              <div key={section.title} className="space-y-4">
                <h2 className="text-sm font-semibold">{section.title}</h2>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Button
                      key={item.href}
                      variant="ghost"
                      className="w-full justify-start gap-2"
                      asChild
                    >
                      <a href={item.href}>
                        {item.icon}
                        {item.title}
                      </a>
                    </Button>
                  ))}
                </div>
                {section !== navigation[navigation.length - 1] && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <main className="h-[calc(100vh-4rem)] overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}