import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
  ActionButton,
  AnswerQuestion,
  ButtonContainer,
  QuestionBody,
  QuestionDetails,
  QuestionItem,
  QuestionList,
  QuestionTitle,
} from '@/features/questionnaire';
import { useGetQuestions } from '@/features/questionnaire/api/get-questions.ts';
import { useDisclosure } from '@/hook/use-disclosure.ts';

type QuestionsProps = {
  userId: string;
  channelId: string;
};

type Props = {
  show: boolean;
  onClose: () => void;
  selectedQuestion: string;
  userId: string;
};
type ComponentType = {
  [key: string]: React.FC<Props>;
};

const components: ComponentType = {
  question_details: QuestionDetails,
  answer_question: AnswerQuestion,
};

export const Questions = ({ userId, channelId }: QuestionsProps) => {
  const { isLoading, error, questions } = useGetQuestions(userId, channelId);
  const { close, isOpen, open } = useDisclosure();
  const [selectedQuestion, setSelectedQuestion] = useState<string>();
  const [currentComponent, setCurrentComponent] = useState<
    'question_details' | 'answer_question' | null
  >(null);

  function closeModal() {
    close();
  }

  function handleComponentChange(
    component: 'question_details' | 'answer_question',
    question: string,
  ) {
    setSelectedQuestion(question);
    setCurrentComponent(component);
    open();
  }

  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch questions');
    }
    if (!isLoading) {
      console.log('Questions:', questions);
    }
  }, [error, isLoading]);

  const Component = currentComponent ? components[currentComponent] : null;
  return (
    <QuestionList>
      {Component && selectedQuestion ? (
        <Component
          show={isOpen}
          onClose={closeModal}
          selectedQuestion={selectedQuestion}
          userId={userId}
        />
      ) : (
        ''
      )}
      <h2 className="text-center text-4xl font-extrabold dark:text-white">
        Questionnaire
      </h2>
      <p className="mb-6 text-lg font-normal text-gray-500 sm:px-16 lg:text-xl xl:px-48">
        Find answers to your technical questions and help others answer theirs.
      </p>
      {isLoading ? (
        <QuestionItem>
          <QuestionTitle>Loading...</QuestionTitle>
        </QuestionItem>
      ) : (
        questions?.map((question) => (
          <QuestionItem key={question._id}>
            <QuestionTitle>{question.title}</QuestionTitle>
            <QuestionBody>
              {question.body
                ? question.body.length > 100
                  ? question.body.substring(0, 100) + '...'
                  : question.body
                : ''}
            </QuestionBody>
            <div className={`col-start-1 row-start-3`}>
              {question.askedBy ? (
                <span className="mr-2 text-xs text-gray-500 dark:text-gray-400">
                  By {question.askedBy.username}
                </span>
              ) : (
                ''
              )}
              <span className="mr-2 text-xs text-gray-500 dark:text-gray-400">
                {new Date(question.createdAt).toDateString()}
              </span>
            </div>
            <ButtonContainer>
              <button
                className="btn btn-outline btn-success"
                onClick={() =>
                  handleComponentChange('question_details', question._id)
                }
              >
                View Details
              </button>
              <ActionButton
                onClick={() =>
                  handleComponentChange('answer_question', question._id)
                }
              >
                Answer Question
              </ActionButton>
            </ButtonContainer>
          </QuestionItem>
        ))
      )}
    </QuestionList>
  );
};
