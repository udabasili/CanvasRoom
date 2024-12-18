import { Modal } from '@/components/elements';
import { Question } from '@/features/questionnaire';

type AnswerQuestionProps = {
  show: boolean;
  onClose: () => void;
  selectedQuestion: Question;
};
export const AnswerQuestion = ({
  show,
  onClose,
  selectedQuestion,
}: AnswerQuestionProps) => {
  return (
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
        {selectedQuestion.title}
      </h5>
      <p className="text-gray-600">{selectedQuestion.body}</p>
      <h3 className="my-3 text-lg font-semibold">Your Answer</h3>
      <form>
        <div className="my-2">
          <textarea
            id="answer"
            name="answer"
            required={true}
            className="mt-1 block w-full rounded-lg border px-3 py-2 text-gray-700 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            rows={3}
          />
        </div>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </Modal>
  );
};
