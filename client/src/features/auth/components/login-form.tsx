import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as z from 'zod';

import { Input } from '@/components/form';
import { firstUser, secondUser } from '@/features/auth/data.ts';
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

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const authContext = useContext(AuthContext) as AuthContextType;
  const { login } = authContext;
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: firstUser.email,
      password: firstUser.password,
    },
  });

  useEffect(() => {
    const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }, []);

  function handleSetInitialValues(user: { email: string; password: string }) {
    reset(user); // Resets the form with new values
  }

  const onSubmit = async (values: LoginValues) => {
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
  };

  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello there!</h3>
          <p className="py-4">
            Open the website on different web browsers or devices and click on
            the first and second user buttons to set the initial values to
            simulate different users logging in.
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <div className="join">
        <button
          className="btn join-item"
          onClick={() => handleSetInitialValues(firstUser)}
        >
          Set First User
        </button>
        <button
          className="btn btn-success join-item"
          onClick={() => handleSetInitialValues(secondUser)}
        >
          {' '}
          Set Second User
        </button>
      </div>
      <form className={clsx('space-y-6')} onSubmit={handleSubmit(onSubmit)}>
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
      </form>
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
