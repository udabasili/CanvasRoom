import { Modal } from '@/components/elements';

type QuestionDetailsProps = {
  show: boolean;
  onClose: () => void;
};
export const QuestionDetails = ({ show, onClose }: QuestionDetailsProps) => {
  return (
    <Modal
      show={show}
      onClose={onClose}
      title={'Create Question'}
      onConfirm={() => {
        console.log('clicked');
      }}
    >
      Question Details
    </Modal>
  );
};
