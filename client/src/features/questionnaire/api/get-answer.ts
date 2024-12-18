import { useQuery } from '@tanstack/react-query';

import { ApiQuestionResponse } from '@/features/questionnaire';
import apiCall from '@/lib/api-call.ts';

export const getAnswer = async (
  userId: string,
  questionId: string,
): Promise<ApiQuestionResponse> => {
  const response = await apiCall.get(
    `/${userId}/question/${questionId}/answers`,
  );
  return response.data;
};

export const useGetAnswer = (userId: string, questionId: string) => {
  // Queries
  const {
    isLoading,
    error,
    data: response,
  } = useQuery<ApiQuestionResponse>({
    queryKey: ['question'],
    queryFn: () => getAnswer(userId, questionId),
  });
  const answers = response?.answers;
  const answerCount = response?.answerCount;
  const question = response?.question;
  return { isLoading, error, answers, answerCount, question };
};
