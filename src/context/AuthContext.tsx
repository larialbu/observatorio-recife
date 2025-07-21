"use client";

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getToken, saveToken } from '@/services/tokenService';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      let token = getToken();

      if (!token) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_LOGIN}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: process.env.NEXT_PUBLIC_API_USERNAME,
              password: process.env.NEXT_PUBLIC_API_PASSWORD,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.token) {
              saveToken(data.token);
              token = data.token;
            }
          }
        } catch (error) {
          console.error("Falha no login automático", error);
        }
      }

      if (token) {
        setIsAuthenticated(true);
      }
      
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);