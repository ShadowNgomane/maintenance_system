export interface MaintenanceItem {
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