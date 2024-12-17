import { useQuery } from '@tanstack/react-query';
import { MessageType } from 'react-chat-elements';

import { getChannel } from '@/features/channel';
import { Chat, ChatMessages } from '@/features/chat/types';
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
}: getChatType): Promise<ChatMessages> => {
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
  } = useQuery<ChatMessages>({
    queryKey: ['channel-chat'],
    queryFn: () => getChannelChat({ userId, channelId, groupId }),
  });
  const chat = response?.chat;
  let chatMessages: Array<MessageType> = [];
  if (chat?.length && chat.length > 0) {
    chatMessages = chat.map((chat) => ({
      position: chat.sender?._id === userId ? 'right' : 'left',
      type: 'text',
      notch: false,
      forwarded: false,
      replyButton: false,
      removeButton: false,
      titleColor: 'black',
      status: chat.status,
      retracted: false,
      text: chat.message,
      date: chat.createdAt,
      id: chat._id,
      dateString: new Date(chat.createdAt).toDateString(),
      title:
        chat.sender?._id === userId ? 'Me' : (chat.sender?.username as string),
      focus: true,
    }));
  }

  return { isLoading, error, chatMessages };
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
