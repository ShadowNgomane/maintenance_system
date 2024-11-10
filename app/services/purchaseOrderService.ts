import axios from 'axios'
import { PurchaseOrder } from '@/app/types/purchaseOrder'

const API_URL = '/api/purchase-orders'

export const purchaseOrderService = {
  getAll: async () => {
    const response = await axios.get(API_URL)
    return response.data
  },
  create: async (purchaseOrder: PurchaseOrder) => {
    const response = await axios.post(API_URL, purchaseOrder)
    return response.data
  },
  update: async (id: string, purchaseOrder: PurchaseOrder) => {
    const response = await axios.put(`${API_URL}/${id}`, purchaseOrder)
    return response.data
  },
  delete: async (id: string) => {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response.data
  },
} 