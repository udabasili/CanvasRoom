import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { Modal } from '@/components/elements';
import { useGetAnswer } from '@/features/questionnaire/api/get-answer.ts';

type QuestionDetailsProps = {
  show: boolean;
  onClose: () => void;
  selectedQuestion: string;
  userId: string;
};
export const QuestionDetails = ({
  show,
  onClose,
  selectedQuestion,
  userId,
}: QuestionDetailsProps) => {
  const { isLoading, error, answers, question } = useGetAnswer(
    userId,
    selectedQuestion,
  );

  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch answers');
    }
  }, [error]);
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    question && (
      <Modal
        show={show}
        onClose={onClose}
        title={question.title}
        onConfirm={() => {
          console.log('clicked');
        }}
      >
        {question.body && <p className="text-gray-600">{question.body}</p>}
        {question.askedBy && (
          <div className="mt-2 flex items-center">
            <span className="text-gray-500">
              Asked by: {question.askedBy.firstName} {question.askedBy.lastName}
            </span>
          </div>
        )}
        {question.createdAt && (
          <div className="mt-2 flex items-center">
            <span className="text-grey-500">
              Created on: {new Date(question.createdAt).toDateString()}
            </span>
          </div>
        )}
        {answers && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Answers</h2>
            {answers.map((answer) => (
              <div key={answer._id} className="mt-2">
                <p className="text-gray-600">{answer.answer}</p>
                <div className="mt-2 flex flex-col items-end  justify-end">
                  <span className="text-xs text-gray-500">
                    By: {answer.answeredBy.username}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(answer.createdAt).toDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal>
    )
  );
};
