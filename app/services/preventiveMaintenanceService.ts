import axios from 'axios';
import { MaintenanceItem } from '@/app/types/PreventiveMaintenance';

const API_URL = '/api/preventive-maintenance';

export const preventiveMaintenanceService = {
  getAll: async (): Promise<MaintenanceItem[]> => {
    const response = await axios.get<MaintenanceItem[]>(API_URL);
    return response.data;
  },

  create: async (maintenanceItem: Partial<MaintenanceItem>): Promise<MaintenanceItem> => {
    const response = await axios.post<MaintenanceItem>(API_URL, maintenanceItem);
    return response.data;
  },

  update: async (id: string, maintenanceItem: Partial<MaintenanceItem>): Promise<MaintenanceItem> => {
    const response = await axios.put<MaintenanceItem>(`${API_URL}/${id}`, maintenanceItem);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  }
}; 