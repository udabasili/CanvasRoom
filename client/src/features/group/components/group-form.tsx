import clsx from 'clsx';
import * as z from 'zod';

import { Form, Input, SelectField, TextAreaInput } from '@/components/form';
import { ModalFooter } from '@/features/group';

import { iconOptions, programmingLanguages } from '../data/languages';

const schema = z.object({
  title: z.string().min(1, 'Required'),
  description: z.string().optional(),
  language: z.string().min(1, 'Required'),
  icon: z.string().min(1, 'Required'),
});

type GroupFormValues = {
  title: string;
  description: string;
  language: string;
  icon: string;
};

type GroupFormProps = {
  onSuccess: () => void;
  goBack: (e: 'add' | 'group' | null) => void;
};

export const GroupForm = ({ onSuccess, goBack }: GroupFormProps) => {
  const isLoggingIn = false;

  return (
    <div>
      <Form<GroupFormValues, typeof schema>
        onSubmit={async (values) => {
          console.log(values);
          onSuccess();
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <Input
              type="text"
              label="Group Tile"
              error={formState.errors['title']}
              registration={register('title')}
            />
            <TextAreaInput
              label="Description"
              error={formState.errors['description']}
              registration={register('description')}
            />
            <SelectField
              label="Programming Language"
              options={programmingLanguages}
              registration={register('language')}
            />
            <SelectField
              label="Group Icon"
              options={iconOptions}
              registration={register('icon')}
            />
            <ModalFooter className="justify-between">
              <button className="btn" onClick={() => goBack(null)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="back-button-icon"
                >
                  <path
                    d="M10 6L4 12L10 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 12H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back
              </button>
              <button className={clsx('btn', 'bg-green-500', 'text-white')}>
                {isLoggingIn ? (
                  <span className="loading loading-spinner"></span>
                ) : null}
                Confirm
              </button>
            </ModalFooter>
          </>
        )}
      </Form>
    </div>
  );
};
