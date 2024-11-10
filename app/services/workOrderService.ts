import axios from 'axios';
import { WorkOrder } from '@/app/types/workOrder';

const API_URL = '/api/work-orders';

export const workOrderService = {
  getAll: async () => {
    const response = await axios.get<WorkOrder[]>(API_URL);
    return response.data;
  },

  create: async (workOrder: Partial<WorkOrder>) => {
    const response = await axios.post<WorkOrder>(API_URL, workOrder);
    return response.data;
  },

  update: async (id: string, workOrder: Partial<WorkOrder>) => {
    const response = await axios.put<WorkOrder>(`${API_URL}/${id}`, workOrder);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
}; 