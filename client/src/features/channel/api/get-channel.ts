import apiCall from '@/lib/api-call.ts';

type getCodeType = {
  userId: string;
  channelId: string;
  type: string;
};

//generic function to get channel for either coding project , discussion or any other channel
export const getChannel = async <T>({
  userId,
  channelId,
  type,
}: getCodeType): Promise<T> => {
  return (await apiCall.get(`${userId}/${type}/${channelId}`)).data;
};
