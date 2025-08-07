import { Shield, LogOut, Home } from "lucide-react";
import { Button } from "../components/ui/button";

interface LayoutProps {
  userRole: "visitor" | "admin" | "staff";
  userName: string;
  children: React.ReactNode;
  onLogout: () => void;  
}

export const Layout = ({ children, userRole, userName, onLogout }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">RCS Prison Visiting System</h1>
              <p className="text-sm text-muted-foreground">Secure Visitor Management</p>
            </div>
          </div>
          
          {userName && (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
              </div>
              <Button variant="ghost" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <Button variant="ghost" onClick={onLogout} size="sm">
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
            </div>
          )}
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};