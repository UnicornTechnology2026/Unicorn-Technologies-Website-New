import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../types';
import { api, authStorage } from '../services/api';

interface AuthContextType {
  admin: AdminUser | null;
  isLoading: boolean;
  login: (identifier: string, pass: string) => Promise<void>;
  logout: () => void;
  refreshAdmin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = authStorage.getToken();
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const user = await api.getMe();
        setAdmin(user);
      } catch (err) {
        console.error('Session expired or invalid token:', err);
        authStorage.removeToken();
        setAdmin(null);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (identifier: string, pass: string) => {
    const res = await api.login(identifier, pass);
    authStorage.setToken(res.token);
    setAdmin(res.admin);
  };

  const logout = () => {
    authStorage.removeToken();
    setAdmin(null);
  };

  const refreshAdmin = async () => {
    try {
      const user = await api.getMe();
      setAdmin(user);
    } catch (err) {
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ admin, isLoading, login, logout, refreshAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
