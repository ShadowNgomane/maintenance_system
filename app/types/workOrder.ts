export interface WorkOrder {
  id: string
  title: string
  description: string
  dueDate?: string
  startDate?: string
  status: "Open" | "In Progress" | "Completed"
  priority: "Low" | "Medium" | "High"
  category: string
  hasInfo?: boolean
  hasRecurring?: boolean
  createdAt?: string
  updatedAt?: string
} 