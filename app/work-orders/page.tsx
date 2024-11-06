import WorkOrdersTable from "../components/work-orders-table"

export default function Home() {
    const workOrders = [
        {
          id: "001",
          title: "Welcome! Start ...",
          description: "Work Orders are the ...",
          dueDate: "10/28/24 - 06:15 PM",
          status: "Open" as const,
          priority: "Medium" as const,
          category: "General",
          hasInfo: true
        },
        {
          id: "002",
          title: "Suite B Temp High",
          description: "Perform inspection on ...",
          status: "Open" as const,
          priority: "Low" as const,
          category: "Meter ..."
        },
        {
          id: "004",
          title: "HVAC Monthly ...",
          description: "Monthly HVAC preven...",
          dueDate: "11/29/24 - 06:45 PM",
          status: "Open" as const,
          priority: "Medium" as const,
          category: "Preven...",
          hasRecurring: true
        }
      ]  
  return (
      <WorkOrdersTable workOrders={workOrders} />
  )
}
