import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus } from "lucide-react"

interface Role {
  name: string
  users?: number
  externalId: string
  type: 'Paid' | 'Free'
  isDefault: boolean
}

const roles: Role[] = [
  {
    name: "Administrator",
    users: 1,
    externalId: "admin",
    type: "Paid",
    isDefault: true
  },
  {
    name: "Limited Administrator",
    externalId: "limited_admin",
    type: "Paid",
    isDefault: true
  },
  {
    name: "Technician",
    externalId: "tech",
    type: "Paid",
    isDefault: true
  },
  {
    name: "Limited Technician",
    externalId: "limited_tech",
    type: "Paid",
    isDefault: true
  },
  {
    name: "View Only",
    externalId: "view_only",
    type: "Free",
    isDefault: true
  },
  {
    name: "Requester",
    externalId: "requester",
    type: "Free",
    isDefault: true
  }
]

export default function UserRoles() {
  return (
    <div className="w-full">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <h1 className="text-xl font-semibold">Roles</h1>
          <div className="ml-auto">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Create Role
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>External ID</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.externalId}>
                <TableCell className="font-medium">
                  {role.name} {role.isDefault && "(default)"}
                </TableCell>
                <TableCell>{role.users || "-"}</TableCell>
                <TableCell>{role.externalId}</TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary" 
                    className={
                      role.type === "Paid" 
                        ? "bg-yellow-50 text-yellow-800 hover:bg-yellow-50 hover:text-yellow-800"
                        : "bg-gray-50 text-gray-800 hover:bg-gray-50 hover:text-gray-800"
                    }
                  >
                    {role.type}
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