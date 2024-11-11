export interface PurchaseOrder {
    id: string
    title: string
    poNumber: string
    itemsCount: number
    totalQuantity: number
    totalCost: number
    createdBy: string
    vendor: string
    tags: string[]
    status: string
  }