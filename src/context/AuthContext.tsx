import { createContext, useEffect, useState, useCallback, useContext } from "react";
import { type User } from "../types/user";
import { verifyToken } from "../services/authService";

interface AuthContextType {
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((userData: User, token: string) => {
    localStorage.setItem("authToken", token);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    setUser(null);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      verifyToken(token)
        .then((userData: User) => {
          setUser(userData);
        })
        .catch(() => {
          logout();
        });
    }
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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