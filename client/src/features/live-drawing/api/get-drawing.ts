import { useQuery } from '@tanstack/react-query';

import { ApiLiveDrawingResponse, LiveDrawing } from '@/features/live-drawing';
import apiCall from '@/lib/api-call.ts';

const getDrawing = async (
  userId: string,
  channelId: string,
): Promise<ApiLiveDrawingResponse> => {
  const response = await apiCall.get(`/${userId}/live-drawing/${channelId}`);
  return response.data;
};

export const useGetDrawing = (userId: string, channelId: string) => {
  const {
    isLoading,
    error,
    data: response,
  } = useQuery<ApiLiveDrawingResponse>({
    queryKey: ['drawing'],
    queryFn: () => getDrawing(userId, channelId),
  });
  let drawing: LiveDrawing | null = null;
  if (response && response.liveDrawing) {
    drawing = response.liveDrawing as LiveDrawing;
  }

  return { isLoading, error, drawing };
};
