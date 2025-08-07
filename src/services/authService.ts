import axios from "axios";
import { type User } from '../types/user'

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

const API_URL = 'http://localhost:8080/auth';

export const register = async (data: RegisterData): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(`${API_URL}/register`, data);
    return response.data;
}


export const login = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(`${API_URL}/login`, {
        email,
        password
    },
    { withCredentials: true} // Ensure cookies are sent with the request
);
    return response.data;
}

export const verifyToken = async (token: string): Promise<User> => {
  const response = await axios.get<User>(`${API_URL}/auth/verify`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};