import { useContext } from 'react';

import {
  Header,
  SearchBar,
  QuestionnaireContainer,
  QuestionnaireForm,
  Questions,
} from '@/features/questionnaire';
import { useDisclosure } from '@/hook/use-disclosure.ts';
import { AuthContext, AuthContextType } from '@/lib/auth-context.tsx';

type QuestionnaireProps = {
  channelId: string;
};
export const Questionnaire = ({ channelId }: QuestionnaireProps) => {
  const { close, open, isOpen } = useDisclosure();
  const { user } = useContext(AuthContext) as AuthContextType;

  function closeModal() {
    close();
  }

  return (
    <QuestionnaireContainer>
      <QuestionnaireForm
        show={isOpen}
        onClose={closeModal}
        userId={user?._id as string}
        channelId={channelId}
      />
      <Header>
        <SearchBar />
        <button className="btn" onClick={open}>
          Add Question
        </button>
      </Header>

      <Questions userId={user?._id as string} channelId={channelId} />
    </QuestionnaireContainer>
  );
};
