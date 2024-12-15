import { useQuery } from '@tanstack/react-query';

import { getChannel } from '@/features/channel';
import { Code } from '@/features/coding-project';

type getCodeType = {
  userId: string;
  channelId: string;
  groupId: string;
};
export const getCode = async ({
  userId,
  channelId,
}: getCodeType): Promise<Code> => {
  return getChannel({
    userId,
    channelId,
    type: 'code',
  });
};

export const useGetCode = ({ userId, channelId, groupId }: getCodeType) => {
  // Queries
  const {
    isLoading,
    error,
    data: response,
  } = useQuery<Code>({
    queryKey: ['code'],
    queryFn: () => getCode({ userId, channelId, groupId }),
  });
  const code = response?.code;

  return { isLoading, error, code };
};
