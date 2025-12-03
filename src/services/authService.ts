import { apiClient } from './apiClient';
import type { AuthResponse } from '@/types/security';

const authService = {
  async login(username: string, password: string): Promise<AuthResponse> {
    const { data } = await apiClient.post('/auth/login', { username, password });
    return data;
  },
  async changePassword(currentPassword: string, newPassword: string): Promise<AuthResponse> {
    const { data } = await apiClient.post('/auth/change-password', { currentPassword, newPassword });
    return data;
  }
};

export { authService };
