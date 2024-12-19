import 'react-chat-elements/dist/main.css';
import { ReactNode, useContext } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import { Login, Register } from '@/app/routes/auth';
import { Dashboard } from '@/app/routes/dashboard.tsx';
import { LoadingPage } from '@/components/layout';
import { AuthContext, AuthContextType } from '@/lib/auth-context.tsx';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const authContext = useContext(AuthContext) as AuthContextType;

  if (!authContext) {
    return <LoadingPage />;
  }

  if (authContext?.loading) {
    return <LoadingPage />;
  }

  return authContext?.isAuthenticated ? (
    children
  ) : (
    <Navigate to="/auth/login" />
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/auth/login',
    element: <Login />,
  },
  {
    path: '/auth/register',
    element: <Register />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
