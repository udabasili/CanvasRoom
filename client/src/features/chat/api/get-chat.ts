import { useQuery } from '@tanstack/react-query';

import { getChannel } from '@/features/channel';
import { Chat } from '@/features/chat/types';
import apiCall from '@/lib/api-call.ts';

type getChatType = {
  userId: string;
  channelId: string;
  groupId: string;
};

export interface IChatInputDTO {
  channel?: string;
  sender?: string;
  recipient?: string;
  message?: string;
  url?: string;
}

export const getChannelChat = async ({
  userId,
  channelId,
}: getChatType): Promise<Chat> => {
  return getChannel({
    userId,
    channelId,
    type: 'chat',
  });
};

export const getPrivateChat = async (userId: string): Promise<Chat> => {
  return apiCall.get(`/${userId}/chat/private`);
};

export const useGetChannelChat = ({
  userId,
  channelId,
  groupId,
}: getChatType) => {
  // Queries
  const {
    isLoading,
    error,
    data: response,
  } = useQuery<Chat>({
    queryKey: ['channel-chat'],
    queryFn: () => getChannelChat({ userId, channelId, groupId }),
  });
  const chat = response;

  return { isLoading, error, chat };
};

export const useGetPrivateChat = ({ userId }: { userId: string }) => {
  // Queries
  const {
    isLoading,
    error,
    data: response,
  } = useQuery<Chat>({
    queryKey: ['private-chat'],
    queryFn: () => getPrivateChat(userId),
  });
  const chat = response;

  return { isLoading, error, chat };
};
