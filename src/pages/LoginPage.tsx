import { LoginForm } from "../components/LoginForm";
import { type User } from "../types/user";

interface LoginPageProps {
  onLogin: (user: User, token: string) => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm onLogin={onLogin} />
    </div>
  );
};