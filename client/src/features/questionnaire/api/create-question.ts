import { useMutation } from '@tanstack/react-query';

import { QuestionDto } from '@/features/questionnaire';
import apiCall from '@/lib/api-call.ts';

const createQuestion = async (userId: string, question: QuestionDto) => {
  const response = await apiCall.post(`/${userId}/question`, question);
  return response.data;
};

export const useCreateQuestion = (userId: string) => {
  // Mutations
  const { mutate } = useMutation({
    mutationFn: (question: QuestionDto) => createQuestion(userId, question),
  });

  return { mutate };
};
