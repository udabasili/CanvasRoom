import { useQuery } from '@tanstack/react-query';

import { ApiQuestionsResponse, Question } from '@/features/questionnaire';
import apiCall from '@/lib/api-call.ts';

const getQuestions = async (
  userId: string,
  channelId: string,
): Promise<ApiQuestionsResponse> => {
  const response = await apiCall.get(`/${userId}/question/${channelId}`);
  return response.data;
};

export const useGetQuestions = (userId: string, channelId: string) => {
  // Queries
  let questions: Question[] = [];
  const {
    isLoading,
    error,
    data: response,
  } = useQuery<ApiQuestionsResponse>({
    queryKey: ['questions', userId],
    queryFn: () => getQuestions(userId, channelId),
    enabled: !!userId && !!channelId,
  });
  if (response) {
    questions = response.questions;
  }

  return { isLoading, error, questions };
};
