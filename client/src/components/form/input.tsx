import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import {
  FieldWrapper,
  FieldWrapperPassThroughProps,
} from './field-wrapper.tsx';

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'email' | 'password';
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
};

export const Input = (props: InputFieldProps) => {
  const { type = 'text', label, className, registration, error } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <input
        type={type}
        className={clsx(
          'block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-black shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm',
          className,
        )}
        {...registration}
      />
    </FieldWrapper>
  );
};
