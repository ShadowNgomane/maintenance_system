export interface PurchaseOrder {
    id: string
    title: string
    poNumber: string
    itemsCount: number
    totalQuantity: number
    totalCost: string
    createdBy: string
    vendor: string
    tags: string[]
  }