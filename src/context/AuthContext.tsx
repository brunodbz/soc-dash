import { createContext, useContext, useEffect, useState } from 'react';
import type { AuthResponse, User } from '@/types/security';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  mustChangePassword: boolean;
  login: (username?: string, password?: string) => Promise<AuthResponse>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  logout: () => void;
  setAuth: (payload: AuthResponse) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const defaultAuth: AuthResponse = {
  token: 'public-access-token',
  user: {
    id: 'public-user',
    username: 'Acesso livre',
    email: 'public@socdash.local',
    role: 'admin',
    lastLogin: new Date().toISOString()
  },
  mustChangePassword: false
};

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [mustChangePassword, setMustChangePassword] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('socdash_token');
    const storedUser = localStorage.getItem('socdash_user');
    const storedMustChange = localStorage.getItem('socdash_must_change');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setMustChangePassword(storedMustChange === 'true');
      return;
    }

    persistAuth(defaultAuth);
  }, []);

  const persistAuth = (payload: AuthResponse) => {
    setUser(payload.user);
    setToken(payload.token);
    setMustChangePassword(payload.mustChangePassword);
    localStorage.setItem('socdash_token', payload.token);
    localStorage.setItem('socdash_user', JSON.stringify(payload.user));
    localStorage.setItem('socdash_must_change', String(payload.mustChangePassword));
  };

  const login = async () => {
    persistAuth(defaultAuth);
    return defaultAuth;
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    console.info('Change password called, but authentication is disabled', { currentPassword, newPassword });
  };

  const logout = () => {
    persistAuth(defaultAuth);
  };

  const setAuth = (payload: AuthResponse) => persistAuth(payload);

  return (
    <AuthContext.Provider value={{ user, token, mustChangePassword, login, changePassword, logout, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export { AuthProvider, useAuth };
