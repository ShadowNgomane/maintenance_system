import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal, Plus, Search } from "lucide-react"

interface ChecklistItem {
  id: string
  name: string
  description: string
  tasks: number
}

export default function CheckList() {
  const checklists: ChecklistItem[] = [
    {
      id: "1",
      name: "Daily Rounds",
      description: "These tasks and checks should be performed every day at the en...",
      tasks: 5,
    },
  ]

  return (
    <div className="w-full">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <div className="h-4 w-4 border" />
            </Button>
            <h1 className="text-xl font-semibold">Checklists</h1>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="your-checklists" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger
              value="your-checklists"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Your Checklists
            </TabsTrigger>
            <TabsTrigger
              value="template-library"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Template Library
            </TabsTrigger>
          </TabsList>

          <TabsContent value="your-checklists" className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">1 Checklist</span>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search by Name" className="pl-8 w-[250px]" />
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Checklist
                </Button>
              </div>
            </div>

            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Tasks</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {checklists.map((checklist) => (
                    <TableRow key={checklist.id}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell className="font-medium">{checklist.name}</TableCell>
                      <TableCell className="max-w-md">{checklist.description}</TableCell>
                      <TableCell>{checklist.tasks}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="template-library" className="mt-4">
            <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto py-12">
              <p className="text-muted-foreground mb-4">
                Browse our template library to find pre-made checklists for common tasks and workflows.
              </p>
              <Button className="gap-2">
                Browse Templates
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}