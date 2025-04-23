import { create } from 'zustand';
import axios from 'axios';

interface User {
  _id: string;
  name: string;

  email: string;
  username: string;
  telephone: string;
  [key: string]: unknown; 
}

interface LoginResponse {
  token: string;
  user: User;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  initializeAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  login: async (username: string, password: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post<LoginResponse>('http://localhost:5000/auth/login', {
        username,
        password,
      });

      const { token, user } = response.data;
      set({ user, token, isLoading: false });
      localStorage.setItem('token', token);
    } catch (error: unknown) {
      let errorMessage = 'Login failed';

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message ?? errorMessage;
      }

      set({ error: errorMessage, isLoading: false });
    }
  },

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem('token');
  },

  initializeAuth: () => {
    const token = localStorage.getItem('token');
    if (token) {
      set({ token });
      
    }
  },
}));

export default useAuthStore;
