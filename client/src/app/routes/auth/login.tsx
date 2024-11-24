import { useNavigate } from 'react-router-dom';

import { AuthLayout } from '@/components/layout';
import { LoginForm } from '@/features/auth';

export const Login = () => {
  const navigate = useNavigate();

  function onSuccess() {
    // TODO: Redirect to dashboard
    navigate('/');
  }

  return (
    <AuthLayout title="Auth - Login">
      <div className="space-y-4">
        <div className="mb-8">
          <h3 className="text-3xl font-extrabold text-white">Sign in</h3>
          <p className="mt-4 text-sm leading-relaxed text-white">
            Sign in to your account and explore a world of possibilities. Your
            journey begins here.
          </p>
        </div>
        <LoginForm onSuccess={onSuccess} />
      </div>
    </AuthLayout>
  );
};
