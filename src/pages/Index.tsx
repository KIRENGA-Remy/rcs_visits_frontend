import { useContext } from "react";
import { VisitorDashboard } from "../components/VisitorDashboard";
import { AdminDashboard } from "../components/AdminDashboard";
import { StaffDashboard } from "../components/StaffDashboard";
import { AuthContext } from "../context/AuthContext";

const Index = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return null; // ProtectedRoute will handle redirection
  }

  const dashboardProps = {
    user,
    onLogout: logout
  };

  switch (user.role.toLowerCase()) {
    case 'visitor':
    case 'legal':
      return <VisitorDashboard {...dashboardProps} />;
    case 'admin':
      return <AdminDashboard {...dashboardProps} />;
    case 'staff':
      return <StaffDashboard {...dashboardProps} />;
    default:
      return null;
  }
};

export default Index;