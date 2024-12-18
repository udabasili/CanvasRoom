import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as z from 'zod';

import { Modal } from '@/components/elements';
import { Input, TextAreaInput } from '@/components/form';
import { useCreateQuestion } from '@/features/questionnaire';

type QuestionnaireFormProps = {
  show: boolean;
  onClose: () => void;
  channelId: string;
  userId: string;
};

const schema = z.object({
  title: z.string().min(1, 'Title is Required'),
  body: z.string(),
});

type QuestionnaireValues = {
  title: string;
  body: string;
};

export const QuestionnaireForm = ({
  show,
  onClose,
  channelId,
  userId,
}: QuestionnaireFormProps) => {
  const mutation = useCreateQuestion(userId);
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState } = useForm<QuestionnaireValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      body: '',
    },
  });

  function onSubmit(values: QuestionnaireValues) {
    console.log('values');
    mutation.mutate(
      {
        ...values,
        channel: channelId,
      },
      {
        onSuccess: () => {
          toast.success('Question created successfully');
          queryClient.invalidateQueries({ queryKey: ['questions'] });
          onClose();
        },
        onError: (error) => {
          if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error('Failed to create question');
          }
        },
      },
    );
  }

  return (
    <Modal
      show={show}
      onClose={onClose}
      title={'Create Question'}
      onConfirm={() => {
        console.log('clicked');
      }}
    >
      <form className={clsx('space-y-6')} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          label="Title"
          error={formState.errors['title']}
          registration={register('title')}
          className={'text-black'}
        />
        <TextAreaInput
          label="Description"
          error={formState.errors['body']}
          registration={register('body')}
        />
        <button type="submit" className="btn">
          Create
        </button>
      </form>
    </Modal>
  );
};
