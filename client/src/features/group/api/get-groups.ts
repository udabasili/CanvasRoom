import { useQuery } from '@tanstack/react-query';

import { ApiGroupsResponse } from '@/features/group/types';
import apiCall from '@/lib/api-call.ts';

const getGroups = async (): Promise<ApiGroupsResponse> => {
  const response = await apiCall.get('/groups');
  return response.data;
};

export const useGetGroups = () => {
  // Queries
  const {
    isLoading,
    error,
    data: response,
  } = useQuery<ApiGroupsResponse>({
    queryKey: ['groups'],
    queryFn: getGroups,
  });
  const groups = response?.groups; // Safeguard in case response is undefined

  return { isLoading, error, groups };
};
