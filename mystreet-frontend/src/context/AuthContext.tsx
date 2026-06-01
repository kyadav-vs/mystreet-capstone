import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthResponse {
  token: string;
  email: string;
  admin: boolean; // The backend Jackson serializer converts boolean 'isAdmin' to 'admin'
}

interface AuthContextType {
  user: { email: string; isAdmin: boolean } | null;
  token: string | null;
  login: (data: AuthResponse) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string; isAdmin: boolean } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (data: AuthResponse) => {
    setToken(data.token);
    setUser({ email: data.email, isAdmin: data.admin }); // Map 'admin' from response to 'isAdmin'
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify({ email: data.email, isAdmin: data.admin }));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
