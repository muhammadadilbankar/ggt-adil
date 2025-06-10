import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string, isAdminLogin?: boolean) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<any | null>(null);
  const { toast } = useToast();
  
  const isAuthenticated = Boolean(token);
  const isAdmin = user?.isAdmin || false;

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          // Decode the token to check if it's an admin token
          const decoded: any = jwtDecode(token);
          
          if (decoded.isAdmin) {
            // For admin, use the token data directly
            setUser({
              id: decoded.id,
              username: decoded.username,
              name: 'Admin',
              isAdmin: true
            });
          } else {
            // For regular users, fetch from API
            const response = await axios.get(`${API_URL}/api/users/me`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
          logout();
        }
      }
    };

    fetchUser();
  }, [token]);

  const login = async (username: string, password: string, isAdminLogin = false): Promise<boolean> => {
    try {
      const endpoint = isAdminLogin ? '/api/admin/login' : '/api/users/login';
      const response = await axios.post(`${API_URL}${endpoint}`, {
        username: isAdminLogin ? username : undefined,
        email: !isAdminLogin ? username : undefined,
        password,
      });
      
      const { token: newToken } = response.data;
      
      // Validate token before storing
      try {
        const decoded: any = jwtDecode(newToken);
        if (isAdminLogin && !decoded.isAdmin) {
          throw new Error('Invalid admin token');
        }
        
        localStorage.setItem('token', newToken);
        setToken(newToken);
        
        // For admin login, set the user data immediately
        if (isAdminLogin) {
          setUser({
            id: decoded.id,
            username: decoded.username,
            name: 'Admin',
            isAdmin: true
          });
        }
        
        toast({
          title: "Logged in successfully",
          description: `Welcome back${isAdminLogin ? ' Admin' : ''}!`,
        });
        
        return true;
      } catch (error) {
        throw new Error('Invalid token received');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Invalid credentials';
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    await axios.post(`${API_URL}/api/users/register`, {
      name,
      email,
      password,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const value = {
    token,
    user,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
