import { Modal } from '@/components/elements';
import { Question } from '@/features/questionnaire';

type QuestionDetailsProps = {
  show: boolean;
  onClose: () => void;
  selectedQuestion: Question;
};
export const QuestionDetails = ({
  show,
  onClose,
  selectedQuestion,
}: QuestionDetailsProps) => {
  return (
    <Modal
      show={show}
      onClose={onClose}
      title={selectedQuestion.title}
      onConfirm={() => {
        console.log('clicked');
      }}
    >
      {selectedQuestion.body && (
        <p className="text-gray-600">{selectedQuestion.body}</p>
      )}
      {selectedQuestion.askedBy && (
        <div className="mt-2 flex items-center">
          <span className="text-gray-500">
            Asked by: {selectedQuestion.askedBy.firstName}{' '}
            {selectedQuestion.askedBy.lastName}
          </span>
        </div>
      )}
      {selectedQuestion.createdAt && (
        <div className="mt-2 flex items-center">
          <span className="text-grey-500">
            Created on: {new Date(selectedQuestion.createdAt).toDateString()}
          </span>
        </div>
      )}
    </Modal>
  );
};
