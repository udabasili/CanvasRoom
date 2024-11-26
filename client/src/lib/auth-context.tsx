import { createContext, useEffect, useState } from 'react';

import {
  getUser,
  login,
  LoginCredentialsDTO,
  register,
  RegisterCredentialsDTO,
  signOut,
} from '@/features/auth';
import { User } from '@/features/user';
import storage from '@/utils/storage.ts';

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (data: LoginCredentialsDTO) => Promise<void>;
  signup: (data: RegisterCredentialsDTO) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthMainContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function authCheck() {
    setLoading(true);

    try {
      const response = await getUser();
      const { user } = response.data;
      return user;
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error(errorMessage);
    } finally {
      setLoading(false);
    }
    return null;
  }

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
      const authenticatedUser = await authCheck();
      if (authenticatedUser) {
        setUser(authenticatedUser);
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  async function loginFn(data: LoginCredentialsDTO) {
    try {
      const response = await login(data);
      const { accessToken, user } = response.data;
      storage.setToken(accessToken);
      setUser(user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  const registerFn = async (data: RegisterCredentialsDTO) => {
    try {
      const response = await register(data);
      const { accessToken, user } = response.data;
      storage.setToken(accessToken);
      setUser(user);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const logoutFn = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
      storage.clearToken();
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login: loginFn,
        signup: registerFn,
        logout: logoutFn,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
