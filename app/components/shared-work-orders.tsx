import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, HelpCircle } from "lucide-react"

export default function SharedWorkOrder() {
  return (
    <div className="w-full">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <div className="h-4 w-4 border" />
            </Button>
            <h1 className="text-xl font-semibold">Shared Work Orders</h1>
          </div>
          <Button variant="ghost" size="icon" className="ml-2">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <Tabs defaultValue="shared-with-me" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger 
              value="shared-with-me" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Shared with me
            </TabsTrigger>
            <TabsTrigger 
              value="shared-with-others"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Shared with others
            </TabsTrigger>
          </TabsList>
          <TabsContent value="shared-with-me" className="mt-8">
            <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto py-12">
              <p className="text-muted-foreground mb-16">
                No one seems to have shared any Work Orders with you just yet. Go ahead and give them your email address so they can start collaborating with you.
              </p>
              <div className="relative">
                <div className="absolute -right-16 -top-20">
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M90 10C90 10 60 15 40 35C20 55 10 90 10 90" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                      className="text-muted-foreground/50"
                    />
                  </svg>
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">Start here</h2>
                  <p className="text-muted-foreground">Begin by selecting a Work Order</p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="shared-with-others" className="mt-8">
            <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto py-12">
              <p className="text-muted-foreground mb-16">
                You haven't shared any Work Orders yet. Share a Work Order to start collaborating with others.
              </p>
              <Button className="gap-2">
                Share a Work Order
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}