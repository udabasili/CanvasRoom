import { useQuery } from '@tanstack/react-query';

import { GroupsResponse } from '@/features/group/types';
import apiCall from '@/lib/api-call.ts';

const getGroups = async (): Promise<GroupsResponse> => {
  const response = await apiCall.get('/groups');
  return response.data;
};

export const useGetGroups = () => {
  // Queries
  const {
    isLoading,
    error,
    data: response,
  } = useQuery<GroupsResponse>({
    queryKey: ['groups'],
    queryFn: getGroups,
  });
  console.log(response);
  const groups = response?.groups; // Safeguard in case response is undefined

  return { isLoading, error, groups };
};
