import { RegisterForm } from "../components/RegisterForm";
import { type User } from "../types/user";

interface RegisterPageProps {
  onRegister: (user: User, token: string) => void;
}

export const RegisterPage = ({ onRegister }: RegisterPageProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <RegisterForm onRegister={onRegister} />
    </div>
  );
};