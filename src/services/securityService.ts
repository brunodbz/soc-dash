import { apiClient } from './apiClient';
import type { SecurityEvent, IntegrationConfig, DashboardStats, User } from '@/types/security';

export const securityService = {
  getEvents: async (severityFilter?: string[]): Promise<SecurityEvent[]> => {
    const { data } = await apiClient.get<SecurityEvent[]>('/events');
    if (severityFilter && severityFilter.length > 0) {
      return data.filter(event => severityFilter.includes(event.severity));
    }
    return data;
  },

  getEventById: async (id: string): Promise<SecurityEvent | undefined> => {
    const { data } = await apiClient.get<SecurityEvent[]>('/events');
    return data.find(event => event.id === id);
  },

  getIntegrations: async (): Promise<IntegrationConfig[]> => {
    const { data } = await apiClient.get<IntegrationConfig[]>('/integrations');
    return data;
  },

  updateIntegration: async (id: string, updates: Partial<IntegrationConfig>): Promise<IntegrationConfig> => {
    const { data } = await apiClient.put<IntegrationConfig>(`/integrations/${id}`, updates);
    return data;
  },

  getDashboardStats: async (): Promise<DashboardStats> => {
    const { data } = await apiClient.get<DashboardStats>('/dashboard');
    return data;
  },

  getUsers: async (): Promise<User[]> => {
    const { data } = await apiClient.get<User[]>('/users');
    return data;
  },

  updateUser: async (id: string, updates: Partial<User>): Promise<User> => {
    const { data } = await apiClient.put<User>(`/users/${id}`, updates);
    return data;
  },

  updateEventStatus: async (id: string, status: SecurityEvent['status']): Promise<SecurityEvent> => {
    const { data } = await apiClient.patch<SecurityEvent>(`/events/${id}`, { status });
    return data;
  }
};
