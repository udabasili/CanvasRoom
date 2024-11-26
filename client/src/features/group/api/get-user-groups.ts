import { useQuery } from '@tanstack/react-query';

import { GroupsResponse } from '@/features/group/types';
import apiCall from '@/lib/api-call.ts';

const getUserGroups = async (userId: string): Promise<GroupsResponse> => {
  const response = await apiCall.get(`${userId}/groups`);
  return response.data;
};

export const useGetUserGroups = (userId?: string) => {
  // Queries
  const {
    isLoading,
    error,
    data: response,
  } = useQuery<GroupsResponse>({
    queryKey: ['groups', userId],
    queryFn: () => getUserGroups(userId as string),
    enabled: !!userId,
  });

  return { isLoading, error, groups: response?.groups };
};
