import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as z from 'zod';

import { Form, Input } from '@/components/form';
import { AuthContext, AuthContextType } from '@/lib/auth-context.tsx';

const schema = z.object({
  email: z.string().min(1, 'Email is Required'),
  password: z.string().min(1, 'Password is Required'),
});

type LoginValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  onSuccess: () => void;
};

const initialValues = {
  email: 'johndo@example.com',
  password: 'password123',
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const authContext = useContext(AuthContext) as AuthContextType;
  const { login } = authContext;
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <Form<LoginValues, typeof schema>
        options={{ mode: 'onBlur', defaultValues: initialValues }}
        onSubmit={async (values) => {
          setIsLoading(true);
          try {
            await login(values);
            onSuccess();
          } catch (error) {
            const errorMessage = (error as Error).message;
            console.error(error);
            toast(errorMessage, { type: 'error' });
          } finally {
            setIsLoading(false);
          }
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <Input
              type="email"
              label="Email Address"
              error={formState.errors['email']}
              registration={register('email')}
              className={'text-black'}
            />
            <Input
              type="password"
              label="Password"
              error={formState.errors['password']}
              registration={register('password')}
            />
            <div>
              <button
                type="submit"
                className="btn w-full bg-primaryColor text-white"
              >
                {isLoading ? (
                  <svg
                    className="mr-3 size-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0120.709 5.709M20 12H16"
                    ></path>
                  </svg>
                ) : null}
                Log in
              </button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link
            to="../register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
