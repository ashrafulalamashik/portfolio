import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authApi } from '../services/api';

interface AuthContextType {
  token: string | null;
  username: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('admin_token'));
  const [username, setUsername] = useState<string | null>(localStorage.getItem('admin_user'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) { setIsLoading(false); return; }
    authApi.me()
      .then((d) => { setUsername(d.username); setIsLoading(false); })
      .catch(() => { logout(); setIsLoading(false); });
  }, []);

  const login = async (user: string, pass: string) => {
    const data = await authApi.login(user, pass);
    localStorage.setItem('admin_token', data.token);
    localStorage.setItem('admin_user', data.username);
    setToken(data.token);
    setUsername(data.username);
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setToken(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ token, username, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
