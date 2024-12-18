import { useMutation } from '@tanstack/react-query';

import { AnswerDto } from '@/features/questionnaire';
import apiCall from '@/lib/api-call.ts';

export const answerQuestions = async (userId: string, answer: AnswerDto) => {
  const response = await apiCall.post(`/${userId}/question/answer`, answer);
  return response.data;
};

export const useAnswerQuestions = (userId: string) => {
  const { mutate } = useMutation({
    mutationFn: (answer: AnswerDto) => answerQuestions(userId, answer),
  });

  return { mutate };
};
