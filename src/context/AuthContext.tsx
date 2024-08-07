import {
  ReactNode,
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const value: AuthContextType = {
    isAuthenticated,

    setIsAuthenticated,
  };

  useLayoutEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    setIsAuthenticated(Boolean(accessToken));
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
