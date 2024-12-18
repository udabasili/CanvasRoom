import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Modal } from '@/components/elements';
import { useAnswerQuestions } from '@/features/questionnaire/api/answer-questions.ts';
import { useGetAnswer } from '@/features/questionnaire/api/get-answer.ts';

type AnswerQuestionProps = {
  show: boolean;
  onClose: () => void;
  selectedQuestion: string;
  userId: string;
};
export const AnswerQuestion = ({
  show,
  onClose,
  selectedQuestion,
  userId,
}: AnswerQuestionProps) => {
  const { isLoading, error, question } = useGetAnswer(userId, selectedQuestion);
  const mutation = useAnswerQuestions(userId);
  const [answer, setAnswer] = useState<string>('');

  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch answers');
    }
  }, [error]);

  function handleSetAnswer(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setAnswer(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!answer) {
      toast.error('Please provide an answer');
      return;
    }
    if (!selectedQuestion) {
      toast.error('Please select a question');
      return;
    }
    mutation.mutate(
      { question: selectedQuestion, answer },
      {
        onSuccess: () => {
          onClose();
          toast.success('Answer submitted successfully');
        },
        onError: () => {
          toast.error('Failed to submit answer');
        },
      },
    );
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    question && (
      <Modal
        show={show}
        onClose={onClose}
        title="Answer Question"
        onConfirm={() => {
          console.log('clicked');
        }}
      >
        <h3 className="text-lg font-semibold">Question</h3>
        <h5
          className="
        mt-1
        text-sm
        font-semibold
        text-gray-500
        "
        >
          {question.title}
        </h5>
        <p className="text-gray-600">{question.body}</p>
        <h3 className="my-3 text-lg font-semibold">Your Answer</h3>
        <form onSubmit={handleSubmit}>
          <div className="my-2">
            <textarea
              id="answer"
              name="answer"
              required={true}
              value={answer}
              onChange={handleSetAnswer}
              className="mt-1 block w-full rounded-lg border px-3 py-2 text-gray-700 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              rows={3}
            />
          </div>
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </Modal>
    )
  );
};
