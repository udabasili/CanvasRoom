import { useMutation } from '@tanstack/react-query';
import { AxiosPromise } from 'axios';

import { ApiGroupsResponse } from '@/features/group/types';
import apiCall from '@/lib/api-call.ts';

export const joinGroup = (
  groupId: string,
  userId: string,
): AxiosPromise<ApiGroupsResponse> => {
  return apiCall.patch(`${userId}/groups/${groupId}/join/`);
};

export const useJoinGroup = () => {
  // Queries
  const { mutate } = useMutation({
    mutationFn: ({ groupId, userId }: { groupId: string; userId: string }) =>
      joinGroup(groupId, userId),
  });
  return {
    mutate,
  };
};
