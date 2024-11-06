import { ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ImportExportData() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-semibold">Import Data into UpKeep</h1>
        </div>
      </div>

      <div className="p-8 space-y-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">Import Data</h2>
          
          <div className="space-y-4 max-w-md mx-auto">
            <div className="space-y-2">
              <label htmlFor="dataset" className="text-sm font-medium">
                Data Set
              </label>
              <Select defaultValue="work-orders">
                <SelectTrigger id="dataset" className="w-full">
                  <SelectValue placeholder="Select a data set" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="work-orders">Work Orders</SelectItem>
                  <SelectItem value="assets">Assets</SelectItem>
                  <SelectItem value="parts">Parts</SelectItem>
                  <SelectItem value="locations">Locations</SelectItem>
                  <SelectItem value="teams">Teams</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Start Work Order Import Process
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <Button variant="link" className="text-blue-600">
            Download Template
          </Button>
          <div className="h-4 w-px bg-border" />
          <Button variant="link" className="text-blue-600">
            Export Current Work Orders
          </Button>
          <div className="h-4 w-px bg-border" />
          <Button variant="link" className="text-blue-600">
            See Examples & Tutorials
            <ExternalLink className="ml-1 h-3 w-3" />
          </Button>
        </div>

        <Alert className="bg-muted border-none">
          <AlertDescription className="text-sm text-muted-foreground">
            <span className="font-medium">Tip:</span> If you are assigning any people, teams, assets, locations, parts and/or purchase orders, ensure they are already created in your UpKeep account.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}