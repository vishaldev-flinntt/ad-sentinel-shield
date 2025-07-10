
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('brand_protection_user');
    const lastActivity = localStorage.getItem('last_activity');
    
    if (storedUser && lastActivity) {
      const timeDiff = Date.now() - parseInt(lastActivity);
      const oneHour = 60 * 60 * 1000;
      
      if (timeDiff < oneHour) {
        setUser(JSON.parse(storedUser));
        // Update last activity
        localStorage.setItem('last_activity', Date.now().toString());
      } else {
        // Session expired
        localStorage.removeItem('brand_protection_user');
        localStorage.removeItem('last_activity');
      }
    }
    
    setLoading(false);
    
    // Auto-logout timer
    const interval = setInterval(() => {
      const lastActivity = localStorage.getItem('last_activity');
      if (lastActivity) {
        const timeDiff = Date.now() - parseInt(lastActivity);
        const oneHour = 60 * 60 * 1000;
        
        if (timeDiff >= oneHour) {
          logout();
        }
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call your API
    if (email === "admin@brandprotect.com" && password === "admin123") {
      const adminUser: User = {
        id: "1",
        email: "admin@brandprotect.com",
        role: "admin",
        name: "Admin User"
      };
      setUser(adminUser);
      localStorage.setItem('brand_protection_user', JSON.stringify(adminUser));
      localStorage.setItem('last_activity', Date.now().toString());
      return true;
    } else if (email === "user@brandprotect.com" && password === "user123") {
      const regularUser: User = {
        id: "2",
        email: "user@brandprotect.com", 
        role: "user",
        name: "Regular User"
      };
      setUser(regularUser);
      localStorage.setItem('brand_protection_user', JSON.stringify(regularUser));
      localStorage.setItem('last_activity', Date.now().toString());
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('brand_protection_user');
    localStorage.removeItem('last_activity');
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Mock registration
    const newUser: User = {
      id: Math.random().toString(),
      email,
      role: "user",
      name
    };
    setUser(newUser);
    localStorage.setItem('brand_protection_user', JSON.stringify(newUser));
    localStorage.setItem('last_activity', Date.now().toString());
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
