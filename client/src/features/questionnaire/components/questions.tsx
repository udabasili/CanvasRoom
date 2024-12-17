import {
  QuestionDetails,
  QuestionItem,
  QuestionList,
  QuestionTitle,
} from '@/features/questionnaire';

export const Questions = () => {
  return (
    <QuestionList>
      <QuestionItem>
        <QuestionTitle>How do I center a div in CSS?</QuestionTitle>
        <QuestionDetails>
          Im having trouble with centering a div using CSS. Any help would be
          appreciated!
        </QuestionDetails>
      </QuestionItem>
    </QuestionList>
  );
};
