import { useQuery } from '@tanstack/react-query';

import { ApiQuestionsResponse, Question } from '@/features/questionnaire';
import apiCall from '@/lib/api-call.ts';

const getQuestions = async (userId: string): Promise<ApiQuestionsResponse> => {
  const response = await apiCall.get(`/${userId}/question`);
  return response.data;
};

export const useGetQuestions = (userId: string) => {
  // Queries
  let questions: Question[] = [];
  const {
    isLoading,
    error,
    data: response,
  } = useQuery<ApiQuestionsResponse>({
    queryKey: ['questions', userId],
    queryFn: () => getQuestions(userId),
    enabled: !!userId,
  });
  if (response) {
    questions = response.questions;
  }

  return { isLoading, error, questions };
};
