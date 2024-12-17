import {
  Header,
  SearchBar,
  QuestionnaireContainer,
} from '@/features/questionnaire';
import { QuestionnaireForm } from '@/features/questionnaire/components/questionnaire-form.tsx';
import { useDisclosure } from '@/hook/use-disclosure.ts';

type QuestionnaireProps = {
  channelId: string;
};
export const Questionnaire = ({ channelId }: QuestionnaireProps) => {
  const { close, open, isOpen } = useDisclosure();

  function closeModal() {
    close();
  }

  return (
    <QuestionnaireContainer>
      <button className="btn" onClick={open}>
        Add Question
      </button>
      <QuestionnaireForm
        show={isOpen}
        onClose={closeModal}
        channelId={channelId}
      />
      <Header>
        <button>Create Question</button>
        <SearchBar />
      </Header>
      <h1>Questionnaire</h1>
      <p>Answer the following questions to get matched with the right group.</p>
    </QuestionnaireContainer>
  );
};
